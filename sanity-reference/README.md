# Sanity setup

The Studio is embedded in this Next.js application at `/studio`. Start the app
with `npm run dev`, then open `http://localhost:3000/studio` and sign in with
an invited Sanity user.

Required environment variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-01
NEXT_PUBLIC_SANITY_STUDIO_URL=/studio
```

The Studio route is available at `/studio`.

Only invited Sanity users should have access to create and edit reviews.
