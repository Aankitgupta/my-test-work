---
name: nextjs-website-development
description: Build, modify, and review Next.js websites using project conventions. Use when developing Next.js apps, React pages or components, routing, styling, SEO metadata, performance, accessibility, or frontend tests.
disable-model-invocation: true
---

# Next.js Website Development

## Purpose

Use this skill when building or changing a website powered by Next.js. Prefer the repository's existing router, styling system, component patterns, data fetching approach, and test tooling.

## Discovery

Before editing:

1. Identify the Next.js router:
   - App Router: `app/`, route segments, `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, route handlers.
   - Pages Router: `pages/`, `_app`, `_document`, API routes.
2. Inspect nearby components, hooks, tests, styles, and data loading code.
3. Check package scripts for linting, type checking, testing, and formatting.
4. Note whether the project uses TypeScript, server components, client components, CSS modules, Tailwind, styled components, or another styling system.

## Implementation Guidelines

- Match existing file organization, naming, component boundaries, and import aliases.
- Keep server and client component boundaries intentional. Add `"use client"` only for browser APIs, state, effects, event handlers, or client-only libraries.
- Prefer semantic HTML and accessible controls. Use labels, alt text, keyboard support, focus states, and ARIA only when native HTML is insufficient.
- Use framework primitives where appropriate: `next/link`, `next/image`, metadata APIs, route handlers, server actions, and caching controls already used by the project.
- Keep styling consistent with the existing design system. Reuse tokens, utility classes, shared components, and layout primitives before adding new styles.
- Handle loading, empty, and error states for user-facing data.
- Avoid broad rewrites unless the requested change requires them.

## Routing and Data

- For App Router pages, prefer server components for static or server-fetched content.
- Use client components for interactive islands and pass serializable props across the server/client boundary.
- Keep route params, search params, and metadata typed when the project uses TypeScript.
- Follow existing caching and revalidation patterns; do not change cache behavior casually.
- Validate external input in route handlers and server actions.

## SEO, Performance, and Accessibility Checklist

Before finalizing a user-facing page:

- [ ] Page title, description, canonical, Open Graph, or other metadata follow existing SEO patterns.
- [ ] Images use appropriate sizing, alt text, and `next/image` when the project expects it.
- [ ] Layout is responsive at common viewport sizes.
- [ ] Interactive elements are keyboard accessible and have visible focus states.
- [ ] Content uses semantic landmarks and heading order.
- [ ] Large client bundles are avoided by keeping unnecessary logic on the server.

## Verification

Run the most relevant commands available in the repository:

1. Type check, if available.
2. Lint, if available.
3. Unit or component tests for touched areas, if available.
4. Build only when the change affects routing, metadata, rendering boundaries, configuration, or production-only behavior.

If a command cannot run because dependencies or environment variables are missing, report the blocker and the closest verification completed.

## Response Summary

When finished, summarize:

- Files changed.
- Key behavior or UI changes.
- Verification commands and results.
- Any remaining risks or follow-up needed.
