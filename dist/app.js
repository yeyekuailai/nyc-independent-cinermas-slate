const venues = {
  flc: { short: "Film at Lincoln Center", code: "FLC" },
  js: { short: "Japan Society Film", code: "JS" },
  metro: { short: "Metrograph", code: "MET" },
  ff: { short: "Film Forum", code: "FF" }
};

let ratings = {};

const films = [
  { title: "Fatherland", director: "Paweł Pawlikowski", year: 2026, runtime: 82, format: "DCP · 多语种 / 英文字幕", venue: "flc", shows: { "2026-11-04": ["12:15", "14:00", "16:30", "18:30", "20:45"], "2026-11-05": ["12:15", "14:00", "16:30", "18:30", "20:45"], "2026-11-06": ["12:30", "14:30", "16:30", "18:30"] } },
  { title: "Once Upon a Time in Harlem", director: "William Greaves & David Greaves", year: 2026, runtime: 100, format: "DCP · 英语", venue: "flc", shows: { "2026-11-04": ["12:00", "14:15", "18:30"], "2026-11-05": ["12:00", "14:15", "18:30 · OC"], "2026-11-06": ["13:00", "15:15", "18:00", "20:30"], "2026-11-07": ["13:00 · OC", "15:15", "18:00", "20:30"] } },
  { title: "Possible Love", director: "Lee Chang-dong", year: 2026, runtime: 164, format: "DCP · 韩语 / 英文字幕", venue: "flc", shows: { "2026-11-04": ["13:00", "16:15", "19:45"], "2026-11-05": ["13:00", "16:15", "19:45"], "2026-11-06": ["12:15"], "2026-11-07": ["12:15"] } },
  { title: "The Devils", director: "Ken Russell", year: 1971, runtime: 114, format: "全长导演剪辑 · 新修复 35mm", venue: "flc", shows: { "2026-11-04": ["16:00", "20:30"], "2026-11-05": ["16:00", "20:30"], "2026-11-06": ["20:30"] } },
  { title: "Everytime", director: "Sandra Wollner", year: 2026, runtime: 124, format: "DCP · 德语 / 英文字幕", venue: "flc", shows: { "2026-11-06": ["15:30", "18:15", "20:45"], "2026-11-07": ["15:30", "18:15", "20:45"], "2026-11-08": ["15:30", "18:15", "20:45"], "2026-11-09": ["15:30", "18:15", "20:45"] } },
  { title: "Bitter Christmas", director: "Pedro Almodóvar", year: 2026, runtime: 111, format: "DCP · 西班牙语 / 英文字幕", venue: "flc", shows: { "2026-11-13": ["13:15", "15:45", "18:15", "20:45"], "2026-11-14": ["13:15", "15:45", "18:15", "20:45"], "2026-11-15": ["13:15", "15:45", "18:15", "20:45"], "2026-11-16": ["13:15", "15:45", "18:15", "20:45"] } },
  { title: "All of a Sudden", director: "Ryûsuke Hamaguchi", year: 2026, runtime: 196, format: "DCP · 法语、日语 / 英文字幕", venue: "flc", shows: { "2026-11-18": ["18:15 · Q&A"], "2026-11-19": ["19:00 · Q&A"], "2026-11-25": ["12:15", "16:00", "19:45"] } },

  { title: "Citizen Ruth", director: "Alexander Payne", year: 1996, runtime: 102, format: "4K 修复 · 30周年", venue: "ff", ticket: "https://my.filmforum.org/events/citizen-ruth", shows: { "2026-11-04": ["13:00", "15:20", "17:40", "20:00"], "2026-11-05": ["13:00", "15:20", "17:40", "20:00"] } },
  { title: "Fatherland", director: "Paweł Pawlikowski", year: 2026, runtime: 82, format: "DCP · 多语种 / 英文字幕", venue: "ff", ticket: "https://my.filmforum.org/events/fatherland-pawel", shows: { "2026-11-04": ["12:25", "14:25", "16:15", "16:30", "18:30", "20:30"], "2026-11-05": ["12:25", "14:25", "15:50", "16:30", "18:30", "20:30"], "2026-11-06": ["12:25", "14:25", "16:30", "18:30", "20:30"], "2026-11-07": ["12:25 · OC", "14:25", "16:30", "18:30", "20:30"], "2026-11-08": ["12:45 · OC", "14:40", "16:40", "18:40", "20:40"], "2026-11-09": ["12:25 · OC", "14:25", "16:30", "18:30", "20:30"], "2026-11-10": ["12:25", "14:25", "16:30", "18:30", "20:30 · OC"] } },
  { title: "Once Upon a Time in Harlem", director: "William Greaves & David Greaves", year: 2026, runtime: 100, format: "DCP · 英语", venue: "ff", ticket: "https://my.filmforum.org/events/once-upon-a-time-in-harlem", shows: { "2026-11-04": ["12:15", "14:30", "16:45", "19:00", "20:10", "21:15"], "2026-11-05": ["12:15", "14:30", "16:45", "19:00", "19:45", "21:15"], "2026-11-06": ["13:00", "15:45", "18:00", "20:15"], "2026-11-07": ["13:00", "15:45 · OC", "18:00", "20:15"], "2026-11-08": ["13:00", "15:45 · OC", "18:00", "20:15"], "2026-11-09": ["13:00", "15:45 · OC", "18:00", "20:15"], "2026-11-10": ["13:00", "15:45", "18:00 · OC", "20:15"] } },
  { title: "My Undesirable Friends: Part II – Exile", director: "Julia Loktev", year: 2026, runtime: 355, format: "分段放映 · Ch.1–3 192分钟 / Ch.4–5 164分钟", venue: "ff", ticket: "https://my.filmforum.org/events/my-undesirable-friends-part-2", shows: { "2026-11-04": ["12:30 · Ch.1–3"], "2026-11-05": ["12:30 · Ch.4–5"] } },
  { title: "Unzipped", director: "Douglas Keeve", year: 1995, runtime: 73, format: "4K 修复 · 纪录片", venue: "ff", ticket: "https://my.filmforum.org/events/unzipped-4k", shows: { "2026-11-04": ["18:20"], "2026-11-05": ["17:50"] } },
  { title: "Raise the Red Lantern", director: "Zhang Yimou", year: 1991, runtime: 125, format: "4K 修复 · 普通话 / 英文字幕", venue: "ff", ticket: "https://my.filmforum.org/events/raise-the-red-lantern", shows: { "2026-11-06": ["12:20", "13:30", "15:00", "16:15", "17:40", "19:00", "20:20"], "2026-11-07": ["12:20", "13:30", "15:00 · 特别场", "16:15", "17:40", "19:00", "20:20"], "2026-11-08": ["12:40", "13:30", "15:20", "16:15", "18:00", "19:00", "20:40"], "2026-11-09": ["12:20", "13:30", "15:00", "16:15", "17:40", "19:00", "20:20"], "2026-11-10": ["12:20", "13:30", "15:00", "16:15", "19:00", "20:20"] } },
  { title: "The Red Balloon", director: "Albert Lamorisse", year: 1956, runtime: 34, format: "Film Forum Jr. · 前映 Gerald McBoing-Boing 与 The Boat", venue: "ff", ticket: "https://my.filmforum.org/the-red-balloon-ffjr", shows: { "2026-11-08": ["11:00"] } },

  { title: "All We Imagine as Light", director: "Payal Kapadia", year: 2024, runtime: 110, format: "DCP", venue: "metro", shows: { "2026-11-04": ["15:15"] } },
  { title: "Midnight in Paris", director: "Woody Allen", year: 2011, runtime: 94, format: "35mm", venue: "metro", shows: { "2026-11-04": ["15:30"] } },
  { title: "All That Heaven Allows", director: "Douglas Sirk", year: 1955, runtime: 89, format: "35mm", venue: "metro", shows: { "2026-11-04": ["17:35"] } },
  { title: "Strangers on a Train", director: "Alfred Hitchcock", year: 1951, runtime: 101, format: "35mm", venue: "metro", shows: { "2026-11-04": ["19:35"] } },
  { title: "Electra, My Love", director: "Miklós Jancsó", year: 1974, runtime: 71, format: "DCP", venue: "metro", shows: { "2026-11-04": ["20:45"] } },
  { title: "Oldboy", director: "Park Chan-wook", year: 2003, runtime: 120, format: "4K DCP", venue: "metro", shows: { "2026-11-04": ["21:45"] } },
  { title: "Ghost in the Shell: 30th Anniversary Remaster", director: "Mamoru Oshii", year: 1995, runtime: 83, format: "4K DCP", venue: "metro", shows: { "2026-11-04": ["22:20"] } },
  { title: "Bram Stoker’s Dracula", director: "Francis Ford Coppola", year: 1992, runtime: 128, format: "35mm", venue: "metro", shows: { "2026-11-06": ["13:30"] } },
  { title: "News from Home", director: "Chantal Akerman", year: 1976, runtime: 85, format: "DCP", venue: "metro", shows: { "2026-11-06": ["14:15"] } },
  { title: "zi", director: "Kogonada", year: 2026, runtime: 99, format: "DCP · 映后交流", venue: "metro", shows: { "2026-11-06": ["18:30"], "2026-11-07": ["17:15"], "2026-11-08": ["19:00"], "2026-11-11": ["19:30"], "2026-11-12": ["13:15"], "2026-11-13": ["14:45"] } },
  { title: "Cría Cuervos", director: "Carlos Saura", year: 1976, runtime: 105, format: "35mm", venue: "metro", shows: { "2026-11-06": ["18:35"] } },
  { title: "Chinese Roulette", director: "Rainer Werner Fassbinder", year: 1976, runtime: 86, format: "35mm", venue: "metro", shows: { "2026-11-06": ["20:50"] } },
  { title: "Suzhou River", director: "Lou Ye", year: 2000, runtime: 83, format: "DCP", venue: "metro", shows: { "2026-11-06": ["21:10"] } },
  { title: "The Brood", director: "David Cronenberg", year: 1979, runtime: 92, format: "DCP", venue: "metro", shows: { "2026-11-06": ["22:45"] } },
  { title: "Lost Highway", director: "David Lynch", year: 1997, runtime: 134, format: "4K DCP", venue: "metro", shows: { "2026-11-06": ["23:00"], "2026-11-07": ["21:20"], "2026-11-14": ["22:35"] } },
  { title: "Brief Encounter", director: "David Lean", year: 1945, runtime: 87, format: "35mm", venue: "metro", shows: { "2026-11-11": ["15:20"] } },
  { title: "Autumn Sonata", director: "Ingmar Bergman", year: 1978, runtime: 93, format: "DCP", venue: "metro", shows: { "2026-11-11": ["15:30"] } },
  { title: "Beetlejuice", director: "Tim Burton", year: 1988, runtime: 92, format: "35mm", venue: "metro", shows: { "2026-11-11": ["17:30"] } },
  { title: "Blade Runner: The Final Cut", director: "Ridley Scott", year: 1982, runtime: 117, format: "DCP", venue: "metro", shows: { "2026-11-11": ["21:45"] } },

  { title: "A Woman Called Sada Abe", director: "Noboru Tanaka", year: 1975, runtime: 76, format: "35mm 日版 · 18+", venue: "js", shows: { "2026-11-20": ["19:00"] } },
  { title: "Shinjuku Midnight Story: Man and Woman", director: "Koyu Ohara", year: 1972, runtime: 67, format: "18+", venue: "js", shows: { "2026-11-20": ["21:15"] } },
  { title: "The Oldest Profession", director: "Noboru Tanaka", year: 1974, runtime: 83, format: "4K 修复 · 18+", venue: "js", shows: { "2026-11-21": ["16:00"] } },
  { title: "The World of Geisha", director: "Tatsumi Kumashiro", year: 1973, runtime: 72, format: "35mm 日版 · 18+", venue: "js", shows: { "2026-11-21": ["18:00"] } },
  { title: "Watcher in the Attic", director: "Noboru Tanaka", year: 1974, runtime: 85, format: "35mm 日版 · 18+", venue: "js", shows: { "2026-11-21": ["20:00"] } },
  { title: "Love Letter", director: "Yoichi Higashi", year: 1981, runtime: 81, format: "18+", venue: "js", shows: { "2026-12-04": ["19:00"] } },
  { title: "Angel Guts: Red Classroom", director: "Chusei Sone", year: 1979, runtime: 85, format: "18+", venue: "js", shows: { "2026-12-04": ["21:00"] } },
  { title: "Top Stripper", director: "Yoshimitsu Morita", year: 1982, runtime: 85, format: "18+", venue: "js", shows: { "2026-12-05": ["16:00"] } },
  { title: "Woman on the Night Train", director: "Noboru Tanaka", year: 1972, runtime: 71, format: "新英文字幕 · 18+", venue: "js", shows: { "2026-12-05": ["18:00"] } },
  { title: "Scent of a Spell", director: "Toshiharu Ikeda", year: 1985, runtime: 90, format: "2K 修复 · 18+", venue: "js", shows: { "2026-12-05": ["20:00"] } },
  { title: "Woods Are Wet", director: "Tatsumi Kumashiro", year: 1973, runtime: 65, format: "18+", venue: "js", shows: { "2026-12-06": ["17:00"] } },
  { title: "Last Cabaret", director: "Shusuke Kaneko", year: 1988, runtime: 78, format: "18+", venue: "js", shows: { "2026-12-06": ["19:00"] } }
];

const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/New_York" });
const monthName = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "America/New_York" });
const fullDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", weekday: "long", timeZone: "America/New_York" });
const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", timeZone: "America/New_York" });
const allDates = [...new Set(films.flatMap(f => Object.keys(f.shows)))].sort();
const calendarDates = buildDateRange("2026-11-04", allDates.at(-1));

let selectedDate = "all";
let selectedVenue = "all";
let searchTerm = "";

function parseDate(value) { return new Date(`${value}T12:00:00-05:00`); }
function buildDateRange(start, end) {
  const dates = [];
  const cursor = parseDate(start);
  const last = parseDate(end);
  while (cursor <= last) {
    dates.push(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`);
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}
function doubanUrl(film) {
  const subjectId = ratings[film.title]?.doubanId;
  return subjectId
    ? `https://movie.douban.com/subject/${subjectId}/`
    : `https://search.douban.com/movie/subject_search?search_text=${encodeURIComponent(`${film.title} ${film.year}`)}&cat=1002`;
}
function imdbUrl(film) {
  const titleId = ratings[film.title]?.imdbId;
  return titleId ? `https://www.imdb.com/title/${titleId}/` : `https://www.imdb.com/find/?q=${encodeURIComponent(`${film.title} ${film.year}`)}&s=tt`;
}
function slugify(value) { return value.toLowerCase().normalize("NFKD").replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function ticketUrl(film) {
  if (film.venue === "flc") return `https://www.filmlinc.org/films/${slugify(film.title)}/`;
  if (film.venue === "js") return "https://japansociety.org/nikkatsus-golden-age-of-eros/";
  if (film.venue === "ff") return film.ticket || "https://my.filmforum.org/";
  return "https://metrograph.com/nyc/";
}
function displayText(value) {
  const replacements = [
    ["全长导演剪辑", "Complete director’s cut"],
    ["分段放映", "Chapter presentation"],
    ["映后交流", "Post-screening discussion"],
    ["新英文字幕", "New English subtitles"],
    ["英文字幕", "English subtitles"],
    ["多语种", "Multilingual"],
    ["西班牙语", "Spanish"],
    ["法语、日语", "French & Japanese"],
    ["普通话", "Mandarin"],
    ["韩语", "Korean"],
    ["德语", "German"],
    ["英语", "English"],
    ["新修复", "New restoration"],
    ["4K 修复", "4K restoration"],
    ["2K 修复", "2K restoration"],
    ["30周年", "30th anniversary"],
    ["纪录片", "Documentary"],
    ["特别场", "Special screening"],
    ["前映", "Preceded by"],
    ["日版", "Japanese print"],
    ["分钟", " min"],
    [" 与 ", " and "]
  ];
  return replacements.reduce((text, [from, to]) => text.replaceAll(from, to), value);
}
function ratingMarkup(film) {
  const score = ratings[film.title] || {};
  return `<div class="ratings">
    <a class="rating douban-rating" href="${doubanUrl(film)}" target="_blank" rel="noreferrer"><span>Douban</span><strong>${score.douban || "—"}</strong></a>
    <a class="rating imdb-rating" href="${imdbUrl(film)}" target="_blank" rel="noreferrer"><span>IMDb</span><strong>${score.imdb || "—"}</strong></a>
  </div>`;
}
function dateMarkup(value) {
  const d = parseDate(value);
  return `<span>${monthName.format(d).toUpperCase()} · ${weekday.format(d)}</span><strong>${String(d.getDate()).padStart(2, "0")}</strong>`;
}

function buildDateStrip() {
  const strip = document.querySelector("#dateStrip");
  strip.innerHTML = `<button class="date-button active" data-date="all" aria-pressed="true"><span>NOV / DEC</span><strong>All</strong></button>` +
    calendarDates.map(d => `<button class="date-button" data-date="${d}" aria-pressed="false">${dateMarkup(d)}</button>`).join("");
  strip.addEventListener("click", e => {
    if (strip.dataset.justDragged === "true") {
      e.preventDefault();
      return;
    }
    const button = e.target.closest("button[data-date]");
    if (!button) return;
    selectedDate = button.dataset.date;
    strip.querySelectorAll("button").forEach(b => { b.classList.toggle("active", b === button); b.setAttribute("aria-pressed", b === button); });
    runChangeover();
    render();
  });

  let dragging = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;
  strip.addEventListener("pointerdown", e => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startScroll = strip.scrollLeft;
  });
  window.addEventListener("pointermove", e => {
    if (!dragging) return;
    const distance = e.clientX - startX;
    if (Math.abs(distance) > 10) {
      moved = true;
      strip.classList.add("dragging");
    }
    if (moved) {
      e.preventDefault();
      strip.scrollLeft = startScroll - distance;
    }
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    strip.classList.remove("dragging");
    if (moved) {
      strip.dataset.justDragged = "true";
      window.setTimeout(() => { strip.dataset.justDragged = "false"; }, 80);
    }
  };
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  strip.addEventListener("wheel", e => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    strip.scrollLeft += e.deltaY;
  }, { passive: false });
}

function rowsForFilm(film) {
  return Object.entries(film.shows)
    .filter(([date]) => selectedDate === "all" || date === selectedDate)
    .map(([date, times]) => ({ film, date, times }));
}

function render() {
  const list = document.querySelector("#filmList");
  const query = searchTerm.trim().toLowerCase();
  const rows = films
    .filter(f => selectedVenue === "all" || f.venue === selectedVenue)
    .filter(f => !query || `${f.title} ${f.director}`.toLowerCase().includes(query))
    .flatMap(rowsForFilm)
    .sort((a, b) => a.date.localeCompare(b.date) || a.times[0].localeCompare(b.times[0]));

  document.querySelector("#resultCount").textContent = new Set(rows.map(r => r.film.title)).size;
  document.querySelector("#resultDate").textContent = selectedDate === "all" ? "Upcoming screenings" : fullDate.format(parseDate(selectedDate));
  document.querySelector("#emptyState").hidden = rows.length > 0;
  list.innerHTML = rows.map(({ film, date, times }) => `
    <article class="film-row">
      <div class="film-date"><strong>${shortDate.format(parseDate(date)).toUpperCase()}</strong>${weekday.format(parseDate(date))}</div>
      <div class="film-title">
        <h3>${film.title}</h3>
        <p>${film.director} · ${film.year} · ${film.runtime} min</p>
        ${ratingMarkup(film)}
      </div>
      <div class="film-meta">
        <span class="venue-label ${film.venue}">${venues[film.venue].short}</span>
        <p>${displayText(film.format)}</p>
        <div class="times">${times.map(t => `<span class="time-pill">${displayText(t)}</span>`).join("")}</div>
      </div>
      <div class="film-actions">
        <a class="film-link ticket" href="${ticketUrl(film)}" target="_blank" rel="noreferrer"><span>Official tickets</span><span>↗</span></a>
        <a class="film-link" href="${doubanUrl(film)}" target="_blank" rel="noreferrer"><span>${ratings[film.title]?.doubanId ? "Douban details" : "Search Douban"}</span><span>↗</span></a>
        <a class="film-link" href="${imdbUrl(film)}" target="_blank" rel="noreferrer"><span>IMDb details</span><span>↗</span></a>
      </div>
    </article>`).join("");
}

function runChangeover() {
  const el = document.querySelector("#changeover");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.classList.remove("run");
  void el.offsetWidth;
  el.classList.add("run");
}

function resetAll() {
  selectedDate = "all"; selectedVenue = "all"; searchTerm = "";
  document.querySelector("#searchInput").value = "";
  document.querySelectorAll("[data-date]").forEach((b, i) => { b.classList.toggle("active", i === 0); b.setAttribute("aria-pressed", i === 0); });
  document.querySelectorAll("[data-venue]").forEach(b => { const active = b.dataset.venue === "all"; b.classList.toggle("active", active); b.setAttribute("aria-pressed", active); });
  render();
}

document.querySelector("#venueFilters").addEventListener("click", e => {
  const button = e.target.closest("button[data-venue]");
  if (!button) return;
  selectedVenue = button.dataset.venue;
  document.querySelectorAll("[data-venue]").forEach(b => { b.classList.toggle("active", b === button); b.setAttribute("aria-pressed", b === button); });
  runChangeover(); render();
});
document.querySelector("#searchInput").addEventListener("input", e => { searchTerm = e.target.value; render(); });
document.querySelector("#resetButton").addEventListener("click", resetAll);
document.addEventListener("keydown", e => { if (e.key === "/" && document.activeElement.tagName !== "INPUT") { e.preventDefault(); document.querySelector("#searchInput").focus(); } });

function updateClock() {
  document.querySelector("#clock").textContent = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/New_York" }).format(new Date());
}

function validateRatingCoverage() {
  const missing = [...new Set(films.map(f => f.title))].filter(title => !ratings[title]);
  if (missing.length) throw new Error(`Missing rating data: ${missing.join(", ")}`);
}

async function start() {
  const response = await fetch("./ratings.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Rating data failed to load (${response.status})`);
  const payload = await response.json();
  ratings = payload.films;
  validateRatingCoverage();
  const checkedAt = document.querySelector("#ratingsCheckedAt");
  if (checkedAt) checkedAt.textContent = payload.meta.checkedAt.replaceAll("-", ".");
  buildDateStrip(); render(); updateClock(); setInterval(updateClock, 30000);
}

start().catch(error => {
  console.error(error);
  document.querySelector("#filmList").innerHTML = `<p class="empty-state">Rating data failed to load. The schedule is hidden to prevent stale information from being shown.</p>`;
});
