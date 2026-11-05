# NYC Film Slate

纽约艺术影院排期，收录 Film at Lincoln Center、Japan Society、Metrograph 和 Film Forum。

网站提供影院官网购票入口、豆瓣电影详情与评分，以及 IMDb 详情与评分。

## 数据校验

```bash
npm run ratings:audit
```

GitHub Pages 部署前会强制执行评分审计。排期变化后如果评分资料没有重新同步，部署会失败。
