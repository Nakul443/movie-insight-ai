<!--
VERCEL LINK (add after first deploy):
- https://<your-project>.vercel.app
-->

## Movie Insight AI

AI-powered movie “insight” generator: paste an IMDb title ID (like `tt0133093`), fetch movie details from OMDb, then ask Gemini for a short, engaging sentiment-style perspective.

### Repo structure

- **App code**: `my-app/` (Next.js App Router)
- **UI entry**: `my-app/src/app/page.tsx`
- **API route**: `my-app/src/app/api/analyze/route.ts` (POST `/api/analyze`)
- **Gemini helper**: `my-app/src/lib/gemini.ts`

### Tech stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** (v4) + **Framer Motion**
- **Gemini** via `@google/generative-ai`
- **OMDb** for movie metadata

### Local setup

From the repo root:

```bash
cd my-app
npm install
```

Create `my-app/.env.local`:

```bash
GEMINI_API_KEY=YOUR_GEMINI_KEY
OMDB_API_KEY=YOUR_OMDB_KEY
```

- **GEMINI_API_KEY**: create an API key in Google AI Studio for Gemini.
- **OMDB_API_KEY**: get a key from OMDb.

Run the dev server:

```bash
cd my-app
npm run dev
```

Open `http://localhost:3000`.

### How it works

1. The UI submits `{ "imdbId": "tt0133093" }` to `POST /api/analyze`.
2. The API route fetches movie metadata + full plot from OMDb.
3. The plot is sent to Gemini to generate a short “vibe + cultural impact” summary.
4. The combined result is returned and rendered in the UI.

### API

- **Endpoint**: `POST /api/analyze`
- **Body**:

```json
{ "imdbId": "tt0133093" }
```

- **Returns**: JSON containing `title`, `year`, `poster`, `rating`, `plot`, `cast`, `director`, `genre`, `aiSummary`.

Example:

```bash
curl -sS -X POST "http://localhost:3000/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"imdbId":"tt0133093"}'
```

### Scripts

Run these inside `my-app/`:

- **dev**: `npm run dev`
- **build**: `npm run build`
- **start**: `npm run start`
- **lint**: `npm run lint`

### Notes on secrets

`my-app/.env.local` should never be committed. If you ever committed real API keys, rotate them immediately and update your Vercel env vars.
