import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";

const root = new URL("../", import.meta.url);
const ratingsUrl = new URL("dist/ratings.json", root);
const appUrl = new URL("dist/app.js", root);
const checkOnly = process.argv.includes("--check");
const dateParts = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).formatToParts(new Date());
const datePart = type => dateParts.find(part => part.type === type).value;
const nyDate = `${datePart("year")}-${datePart("month")}-${datePart("day")}`;

const originalText = await readFile(ratingsUrl, "utf8");
const current = JSON.parse(originalText);
const appSource = await readFile(appUrl, "utf8");
const scheduleStart = appSource.indexOf("const films = [");
const scheduleEnd = appSource.indexOf("\n];", scheduleStart);
if (scheduleStart < 0 || scheduleEnd < 0) throw new Error("无法定位排期数据");
const scheduleSource = appSource.slice(scheduleStart, scheduleEnd + 3);
const scheduleFingerprint = createHash("sha256").update(scheduleSource).digest("hex");
const scheduledTitles = [...new Set([...scheduleSource.matchAll(/\{ title: "([^"]+)"/g)].map(match => match[1]))];

function audit(payload = current) {
  const problems = [];
  const scheduled = new Set(scheduledTitles);
  for (const title of scheduledTitles) {
    const item = payload.films[title];
    if (!item) {
      problems.push(`${title}: 缺少评分记录`);
      continue;
    }
    if (!item.doubanId && !item.doubanStatus) problems.push(`${title}: 缺少豆瓣 ID 或明确状态`);
    if (!item.imdbId && !item.imdbStatus) problems.push(`${title}: 缺少 IMDb ID 或明确状态`);
    if (item.doubanStatus === "rated" && !item.douban) problems.push(`${title}: 豆瓣状态为 rated 但没有分数`);
    if (item.imdbStatus === "rated" && !item.imdb) problems.push(`${title}: IMDb 状态为 rated 但没有分数`);
  }
  for (const title of Object.keys(payload.films)) {
    if (!scheduled.has(title)) problems.push(`${title}: 已不在排期中，评分记录需要清理`);
  }
  if (payload.meta.checkedAt !== nyDate) problems.push(`评分尚未在纽约时间 ${nyDate} 完成同步`);
  if (payload.meta.scheduleFingerprint !== scheduleFingerprint) problems.push("排期内容已变化，但评分没有随新排期重新同步");
  if (payload.meta.syncStatus !== "complete") problems.push("最近一次评分同步未完整成功");
  if (problems.length) throw new Error(`评分审计失败：\n- ${problems.join("\n- ")}`);
}

if (checkOnly) {
  audit();
  console.log(`评分审计通过：${scheduledTitles.length} 部影片；排期与评分均核对于 ${current.meta.checkedAt}`);
  process.exit(0);
}

// 所有网络结果先写入内存副本。任一数据源异常都会抛错，原文件保持不变。
const next = structuredClone(current);

async function fetchDouban(id) {
  const response = await fetch(`https://m.douban.com/rexxar/api/v2/movie/${id}`, {
    headers: {
      Referer: `https://m.douban.com/movie/subject/${id}/`,
      "User-Agent": "Mozilla/5.0"
    }
  });
  if (!response.ok) throw new Error(`豆瓣 ${id}: HTTP ${response.status}`);
  return response.json();
}

const doubanItems = Object.entries(next.films).filter(([, item]) => item.doubanId && item.doubanStatus !== "restricted");
for (const [title, item] of doubanItems) {
  const data = await fetchDouban(item.doubanId);
  const value = Number(data.rating?.value || 0);
  item.douban = value > 0 ? value.toFixed(1) : null;
  item.doubanStatus = value > 0 ? "rated" : "unrated";
  item.doubanTitle = data.title || title;
  await new Promise(resolve => setTimeout(resolve, 350));
}

const imdbResponse = await fetch("https://datasets.imdbws.com/title.ratings.tsv.gz");
if (!imdbResponse.ok) throw new Error(`IMDb 数据集：HTTP ${imdbResponse.status}`);
const imdbText = gunzipSync(Buffer.from(await imdbResponse.arrayBuffer())).toString("utf8");
const wantedImdbIds = new Set(Object.values(next.films).map(item => item.imdbId).filter(Boolean));
const imdbRatings = new Map();
for (const line of imdbText.split("\n")) {
  const [id, rating] = line.split("\t");
  if (wantedImdbIds.has(id)) imdbRatings.set(id, rating);
}
for (const item of Object.values(next.films)) {
  if (!item.imdbId) continue;
  const value = imdbRatings.get(item.imdbId);
  item.imdb = value && value !== "\\N" ? Number(value).toFixed(1) : null;
  item.imdbStatus = item.imdb ? "rated" : "unrated";
}

next.meta = {
  checkedAt: nyDate,
  scheduleFingerprint,
  syncStatus: "complete",
  sources: {
    douban: "m.douban.com/rexxar/api/v2/movie/{id}",
    imdb: "datasets.imdbws.com/title.ratings.tsv.gz"
  }
};
audit(next);
await writeFile(ratingsUrl, `${JSON.stringify(next, null, 2)}\n`);
console.log(`评分同步完成：${scheduledTitles.length} 部影片；排期指纹 ${scheduleFingerprint.slice(0, 12)}`);
