# 🚀 Agent Handoff: coursera-mvb-v1

**Date:** Tuesday, Dec 30, 2024
**Status:** In Progress - AI Coach & Import API Improvements

## 📋 What Was Just Completed

- **AI Coach UI Refinement**: Updated the input box to have a white background and black text. Simplified the grounding disclaimer text.
- **AI Coach UI Enhancement**: Added a "thinking" animation (bouncing dots) and auto-scroll functionality to the chat.
- **AI Coach Offline Mode**: Implemented a fallback in `/api/coach` that detects missing or placeholder OpenAI API keys. Instead of failing with a 500 error, it extracts a relevant snippet from the lesson context.
- **Improved Grounding**: Enhanced the AI Coach system prompt to better reference lesson content and provide more helpful responses.
- **API Error Handling**: Fixed `/api/import` and `/api/coach` to properly parse JSON error responses and surface them in the UI.
- **Hydration Warning Fix**: Suppressed a hydration mismatch warning in `app/layout.tsx` caused by the Kapture browser extension.
- **Security**: Added `.env.local` to `.gitignore` to prevent leaking API keys and verified that the environment is set up for local development.
- **Documentation**: Populated `openmemory.md` with project architecture and patterns.

## 🎯 Current Project State

### What's Working
- **Course Player**: Lessons load correctly from `public/courses`.
- **Accessibility Bar**: Font sizing, contrast, and dyslexic font toggles are functional.
- **Web Speech Narration**: Works as intended on lesson pages.
- **AI Coach (Offline)**: Correctly identifies when an API key is missing and provides grounded text snippets.
- **Import Markdown**: Can import external URLs, though requires valid raw Markdown links.

### Project Structure
- `app/api/`: Backend routes for coach and import functionality.
- `app/learn/[slug]/`: Main course player route.
- `components/`: UI components (Coach, A11yBar, Practice).
- `lib/`: Course loading and Markdown parsing logic.
- `public/courses/`: Data store for courses.

## 🎯 Recommended Next Steps

1. **Add OpenAI API Key**: Replace the placeholder in `.env.local` with a real key to test generative coaching.
2. **Narration Improvements**: Consider adding visual highlighting for the text being read by the narrator.
3. **Import URL Validation**: Add more robust validation for the Import page to guide users toward "raw" GitHub/Markdown URLs.
4. **Practice Panel Enhancement**: The cloze questions in `PracticePanel.tsx` are currently static; consider generating them via AI if a key is present.

## 📊 Remaining Enhancements to Implement
- [ ] AI-generated practice questions (Value: ⭐⭐⭐⭐, Effort: ⭐⭐)
- [ ] Text highlighting during narration (Value: ⭐⭐⭐, Effort: ⭐⭐⭐)
- [ ] Multi-lesson import support (Value: ⭐⭐⭐, Effort: ⭐⭐⭐⭐)

## 📝 Important Context

### User Profile
- User prefers "One-Screen Learning" to reduce cognitive load.
- Uses Kapture browser extension for session logging/inspection.
- High focus on accessibility (WCAG, Dyslexia, Narration).

### Design Principles
- **Grounded AI**: No hallucinations; answers must come from lesson text.
- **Accessible-First**: Everything must be keyboard-reachable and respect a11y settings.
- **Zero Confusion**: Avoid cognitive overload by keeping interactions within one screen.

## 🔧 Available Commands
- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint checks.

## 📚 Key Files to Review
- `app/api/coach/route.ts`: Core AI grounding logic.
- `components/CoachDrawer.tsx`: AI interaction UI.
- `lib/md.ts`: Markdown to HTML/Text conversion.

## ⚠️ Known Issues / Considerations
- **Vercel Filesystem**: The `/api/import` writes to `public/courses`. On Vercel, this only works during build or in certain Node environments; for a production deployment with user imports, a database or storage bucket should be used.

## 📞 Quick Reference
- **Project:** coursera-mvb-v1
- **Repository:** coreyalejandro/coursera-mvb-v1
- **Branch:** main
- **Last Commit:** 6196bab - "fix: enhance API key validation and improve error handling in CoachDrawer"

---

**Status:** AI Coach is stable in offline mode.
**Recommendation:** Proceed with adding the API key to test generative features.
**Confidence:** High - The offline fallback and error handling have been verified.

