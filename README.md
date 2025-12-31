# Corey's Agentic Course Starter Template (Vercel‑Ready)

Production‑grade, minimal viable build of an accessible, AI‑powered course player.

- **App Router + TypeScript + Tailwind**
- **AI Coach** grounded in the current lesson (`/api/coach`) — uses OpenAI if `OPENAI_API_KEY` set, falls back to extractive snippet.
- **Accessibility Bar**: font size, line height, high contrast, dyslexic font.
- **Narration**: Web Speech (no server needed).
- **Import Markdown**: POST `/api/import` to stage a raw Markdown URL into `public/courses/<slug>`.

## 0) Requirements

- Node 18+
- (Optional) OpenAI API key for full Coach functionality

## 1) Quick Start (Local)

```bash
pnpm i || npm i || yarn
cp .env.example .env   # put your OpenAI key if you have one
npm run dev            # then open http://localhost:3000
```

**On the homepage:**

- Click **Start Demo Course**.
- Open the **AI Coach** in the right panel and ask a question.
- Toggle **Accessibility** at the top and try **Narrate page**.
- Try **Import Markdown by URL** (e.g., a GitHub raw Markdown link).

## 2) Deploy to Vercel

- Push to a Git repo.
- Import the repo in Vercel.
- Add `OPENAI_API_KEY` in Project Settings → Environment Variables (optional).
- Deploy.

## 3) Project Structure

```text
app/
  api/
    coach/route.ts       # AI Coach endpoint
    import/route.ts      # Import Markdown as a 1-lesson course
    health/route.ts      # Health check
  learn/
    [slug]/page.tsx      # Course player
    import/page.tsx      # URL importer UI
  layout.tsx
  page.tsx
components/
  AccessibilityBar.tsx   # A11y toggles + Web Speech narration
  CoachDrawer.tsx        # Grounded coaching chat
  PracticePanel.tsx      # Quick recall checks
lib/
  course.ts              # Load course from public/courses/<slug>
  md.ts                  # Markdown -> HTML + plain text
public/
  courses/demo/...       # Demo content
```

## 4) Notes

- The **coach** is grounded by passing the lesson's plain text as context and instructing the model not to hallucinate outside it.
- The **importer** writes files under `public/courses/<slug>` at runtime (on Vercel, works on Node builds with filesystem writes disabled at build; for serverless edge, replace with storage).
- For xAPI/LRS, add your endpoint and auth to `.env` and extend `/api/coach` or client events accordingly.

## 5) Accessibility Defaults

- Keyboard reachable controls, large hit targets, adjustable typography.
- Narration is optional and respects user choice.
- Reduced-motion users are respected (set in OS/browser).

## 6) License

MIT (for the app scaffolding). Imported course content retains original licenses.
