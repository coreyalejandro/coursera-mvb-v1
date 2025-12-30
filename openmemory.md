# OpenMemory Guide - coursera-mvb-v1

## Overview
A production-grade, minimal viable build (MVB) of an accessible, AI-powered course player. It uses Next.js App Router and is designed for deployment on Vercel.

## Architecture
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: OpenAI (gpt-4o-mini) with grounding in lesson context.
- **Content**: Local courses stored in `public/courses` as Markdown files and `course.json` metadata.
- **Key APIs**:
  - `/api/coach`: Generative/Extractive AI coach.
  - `/api/import`: Imports external Markdown URLs into local course structure.

## User Defined Namespaces
- frontend
- backend
- api
- content

## Components
- `AccessibilityBar`: Handles typography adjustments and Web Speech narration.
- `CoachDrawer`: Grounded AI chat interface.
- `PracticePanel`: Cloze-style practice questions based on lesson content.

## Patterns
- **Grounded AI**: System prompts strictly limit responses to the provided context to prevent hallucinations.
- **Offline Fallback**: The AI Coach falls back to text snippet extraction if `OPENAI_API_KEY` is missing or set to a placeholder.
- **Accessible UI**: Focus on WCAG compliance, dyslexic-friendly fonts, and adjustable reading settings.

