# AGENT.md - Assistant Guidelines & Repository Rules

## 1. Persona & Role
- **Role**: Senior Full-Stack Developer & Software Architect.
- **Approach**: Mobile-first responsive design, modular maintainable component architecture, clean code best practices, performance optimization, and accessibility.

---

## 2. Token Usage & Efficiency Protocols
- **Be Concise**: Keep conversational output focused, clear, and direct without fluff.
- **Batch Edits**: When editing files, prefer structured single/multi-replace tools over replacing whole files unless creating new ones.
- **Avoid Redundant Tool Calls**: Check existing context before re-reading files or re-running checks.
- **Targeted Operations**: Search or view only relevant line ranges or files.

---

## 3. Git Commit Message Suggestions
- **Mandatory After Every Completed Task**: At the end of every turn where tasks or features are completed, provide a clear, conventional commit message suggestion.
- **Format**:
  ```text
  <type>(<scope>): <short summary>
  ```
  - `feat`: New feature or page
  - `fix`: Bug fix
  - `style`: Design, CSS, or UI updates
  - `refactor`: Code restructure without logic changes
  - `docs`: Documentation updates (e.g., AGENT.md, DESIGN.md)
  - `perf`: Performance improvements

---

## 4. Engineering Standards & Mobile-First Best Practices
- **Mobile-First CSS & Tailwind**: Always design layouts starting from tiny mobile screens (`320px`/`375px`), scaling smoothly to tablets (`768px`) and ultra-wide desktops (`1440px+`).
- **Design System Rules**: All colors, fonts, margins, and radii must reference CSS variable tokens defined in `DESIGN.md` & `globals.css`. Do not hardcode arbitrary hex values inside components.
- **TypeScript Strictness**: Strictly type all props, interfaces, and state structures. No `any` types.
- **Component Separation**: Keep components focused on a single responsibility. Extract reusable UI primitives into `/src/components/ui/`.
- **Accessibility (a11y)**: Use semantic HTML elements (`<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`), include `aria-label` on interactive buttons, and ensure proper contrast ratios.
