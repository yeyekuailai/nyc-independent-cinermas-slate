# NYC Film Slate

Independent cinema schedules for Film at Lincoln Center, Japan Society, Metrograph, and Film Forum.

The site includes official ticket links, Douban film details and ratings, and IMDb details and ratings.

## Data audit

```bash
npm run ratings:audit
```

GitHub Pages runs the ratings audit before every deployment. If the schedule changes without a matching ratings sync, deployment fails.
