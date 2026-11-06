# NYC Film Slate

<p align="center">
  <img src="dist/assets/nyc-film-slate-logo.png" alt="NYC Film Slate logo" width="360">
</p>

**Live website:** [yeyekuailai.github.io/nyc-independent-cinermas-slate](https://yeyekuailai.github.io/nyc-independent-cinermas-slate/)

NYC Film Slate brings independent cinema schedules, official ticket links, and film ratings into one simple view. It currently covers Film at Lincoln Center, Japan Society, Metrograph, and Film Forum, with room to add more cinemas over time.

## What the site includes

- Screening schedules organized by date and cinema
- Direct links to official ticket pages
- Douban and IMDb ratings and film-detail links
- Separate showtimes when the same film plays at multiple cinemas
- A publishing audit that blocks stale or incomplete rating data

## What is Douban?

[Douban Movie](https://movie.douban.com/) is a Chinese-language film discovery and review platform. It includes community ratings, written reviews, cast and crew information, and discussion around films. It can provide especially useful context for Chinese and other Asian cinema, complementing the more internationally familiar IMDb.

NYC Film Slate displays Douban and IMDb side by side because the two communities may evaluate the same film differently. Their ratings are useful points of reference, not interchangeable measurements.

## Data validation

```bash
npm run ratings:audit
```

GitHub Pages runs the ratings audit before every deployment. If the schedule changes without a matching ratings sync, deployment fails. Rating updates are transactional: a failed source request cannot silently overwrite previously valid data.
