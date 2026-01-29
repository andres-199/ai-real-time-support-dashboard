# AGENTS Guidelines for ai-real-time-support

This document defines conventions and commands for agentic code-writing tasks in this repository. It covers how to build, lint, test, and structure code across frontend and backend, plus rules for cursor and Copilot guidance when present.

## Table of contents
- Build, Lint, Test commands
- Code style guidelines
- Project structure and boundaries
- Testing guidelines and running a single test
- Error handling and logging expectations
- Cursor and Copilot rules
- Repository-specific notes
- Commit messages and PR hygiene
- Next steps

## Build, Lint, Test commands
- Project layout: frontend/ and backend/
- Global commands (from repo root):
  - Install dependencies: `npm install` (or `pnpm install` if used)
  - Frontend:
    - Build: `npm run build --prefix frontend`
    - Lint: `npm run lint --prefix frontend`
    - Type-check (as part of build): `npm run build --prefix frontend`
    - Test: `npm test --prefix frontend` (if test script exists)
  - Backend:
    - Build: `npm run build --prefix backend`
    - Lint: `npm run lint --prefix backend` (if lint script exists)
    - Test: `npm test --prefix backend` (if test script exists)

- Running a single test (depending on test runner):
  - Jest-style: `npm test --prefix frontend -- -t "test name"`
  - Vitest-style: `npx vitest run --prefix frontend -- --testNamePattern "test name"`
  - Mocha-style: `npm test --prefix frontend -- --grep "test name"`
  > If your tests are not yet wired to accept a pattern, add a one-off test script (e.g., `test: "vitest run"` and then call with name pattern).

## Code style guidelines
- Imports
  - Put external modules first, then internal modules.
  - Group by origin: framework, utilities, then app/domain modules.
  - Avoid circular dependencies; prefer DI boundaries.
  - Prefer named exports; default exports only where it adds clarity.
- Formatting
  - Use Prettier configuration to enforce consistent style.
  - 2-space indentation; semicolons consistent throughout.
  - Wrap long lines; keep line length reasonable (80-120).
- Types and interfaces
  - Use TypeScript; avoid `any` where possible.
  - Public data shapes: interfaces for DTOs; types for unions.
  - Export types with clear naming: `IThing`, `ThingDTO`, etc.
- Naming conventions
  - Variables/functions: camelCase.
  - Types/classes: PascalCase.
  - Constants: ALL_CAPS with underscores; centralize in constants modules.
- Error handling
  - Do not swallow errors; throw with context or convert to domain errors.
  - Use custom error types when possible; propagate meaningful status/messages to callers.
- Architecture and boundaries
  - Domain layer is pure; infrastructure concerns are isolated.
  - UI components: presentational; business logic in hooks/use-cases/services.
- Frontend conventions (React + TS)
  - Functional components; hooks for stateful logic.
  - Props: explicit types; avoid reading global state directly in UI.
  - Accessibility: consider aria-labels and keyboard navigation where appropriate.
- Backend conventions (Express + TS)
  - DTOs for requests/responses; controllers call services; repositories for DB.
  - Validation middleware; centralized error handling; consistent HTTP codes.
- Testing and quality
  - Tests located under `tests/` or `__tests__/` alongside modules where appropriate.
  - Use fixtures, mocks, and factories for deterministic tests.
  - Add meaningful test names and describe intended behavior.
- Security and performance
  - Validate and sanitize inputs; avoid reflecting user input in logs.
  - Memoize heavy computations; avoid blocking I/O in hot paths.
- Documentation and reviews
  - JSDoc/TSdoc for public APIs.
  - Code reviews focus on correctness, edge cases, and maintainability.
- Commits and PRs
  - Use concise, purpose-driven messages (what+why).
- Cursor and Copilot rules
- Cursor Rules: If Cursor rules exist, they live under `.cursor/rules/` or `.cursorrules`. Include any relevant rules to guide agent behavior.
- Copilot Rules: If Copilot guidelines exist, they are in `.github/copilot-instructions.md`. Mirror these constraints where applicable.

## Repository-specific notes
- Frontend and backend use TypeScript; ESLint and TS configs are in place.
- Path aliases exist (e.g., `@/...`)—use them to keep imports stable.
- Ensure builds are reproducible in CI with `npm run build` from root or per-project as needed.

## Commit messages and PR hygiene
- Follow conventional commits where possible: feat, fix, refactor, docs, test, chore.
- PR summaries should include why the change was made, not only what changed.

## Next steps
- If you want, I can add a root-level test runner script to invoke tests across frontend and backend in one go.
- I can include a standard Prettier config and ensure ESLint is integrated with Prettier checks.
