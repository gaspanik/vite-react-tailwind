# Tailwind Vite Project Context

## Project Overview

This is a **minimal starter template** for building modern web applications. It leverages the latest technologies for performance and developer experience.

## Tech Stack

*   **Framework:** React 19.2 + React DOM 19.2 (`react-jsx` transform)
*   **Build Tool:** Vite 7 (Fast Refresh enabled)
*   **Language:** TypeScript 5.9 (Strict mode, `noExplicitAny`, `react-jsx` transform)
*   **Styling:** Tailwind CSS 4 (Zero-configuration via `@tailwindcss/vite`)
*   **Utilities:**
    *   `clsx` + `tailwind-merge` (combined as `cn` helper)
    *   `class-variance-authority` (CVA) for component variants
    *   `lucide-react` for icons
*   **Tooling:** Biome 2.3 (Linter & Formatter), pnpm (Package Manager)

## Directory Structure

```text
.
├── .github/
│   └── copilot-instructions.md   # Detailed AI coding instructions
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── ButtonCn.tsx          # Simple button using 'cn'
│   │   └── ButtonCva.tsx         # Variant-based button using 'cva'
│   ├── lib/
│   │   ├── image.ts              # Eager image loading utilities
│   │   ├── imageAsync.ts         # Lazy image loading utilities
│   │   └── utils.ts              # Utilities (contains 'cn' function)
│   ├── assets/
│   │   └── images/               # Image assets
│   ├── App.tsx                   # Root component
│   ├── App.css                   # Component-level styles
│   ├── index.css                 # Global styles (@import "tailwindcss")
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts             # Vite types
├── biome.json                    # Biome configuration
├── index.html                    # HTML entry point
├── mise.toml                     # Task runner configuration
├── package.json                  # Dependencies
├── pnpm-workspace.yaml           # Workspace config
├── tsconfig.json                 # TS root config
└── vite.config.ts                # Vite config (defines '@/' alias)
```

## Development Workflow

### Prerequisites
*   **Node.js:** >= 20.19
*   **Package Manager:** pnpm

### Key Commands

| Command | Action | Description |
| :--- | :--- | :--- |
| `pnpm dev` | `vite` | Start dev server (HMR enabled). |
| `pnpm build` | `tsc -b && vite build` | Type-check and build for production. |
| `pnpm preview` | `vite preview` | Preview production build. |
| `pnpm check` | `biome check --write` | Format and lint code. |

**Note:** If `mise` is installed, you can use `mise run vite:dev`, `mise run biome:check`, etc.

## Coding Conventions

### React 19
*   **Imports:** **NEVER** import React (`import React from 'react'`). Use the `react-jsx` transform.
*   **Hooks:** Use named imports: `import { useState, useEffect } from 'react'`.
*   **Structure:** Use semantic HTML (`<nav>`, `<main>`, `<section>`). Define explicit props interfaces.

### TypeScript
*   **Strict Mode:** Enabled. `noExplicitAny` and `noUnusedVariables` are enforced errors.
*   **Path Alias:** Use `@/` to import from `src/` (e.g., `import { cn } from '@/lib/utils'`).

### Tailwind CSS v4 (CRITICAL)
*   **MCP Integration:** When Tailwind CSS MCP tools are available, **ALWAYS** use them to verify class names, search documentation, and ensure adherence to the latest v4 specifications.
*   **Configuration:** **NO** `tailwind.config.js`. Config is handled in `src/index.css` via `@import "tailwindcss";` and `@theme` blocks.
*   **Class Names (v4):**
    *   ❌ `space-x-*` / `space-y-*` -> ✅ Use `gap-*` with flex/grid.
    *   ❌ `divide-*` -> ✅ Use borders on children.
*   **Values:**
    *   Prioritize standard scale (e.g., `p-4`, `gap-2`).
    *   Use `@theme` variables for colors (e.g., `text-primary`).
    *   Avoid arbitrary values (`w-[35px]`) unless absolutely necessary.
*   **Theme Management:**
    Define project-specific design tokens in `src/index.css`:
    ```css
    @import "tailwindcss";
    @theme {
      --color-primary: #294779;
    }
    ```

### Component Patterns

#### `cn` Utility
Always use the `cn` function (from `@/lib/utils`) to merge classes and handle conditionals.
```tsx
<div className={cn('base-class', isActive && 'active-class', className)} />
```

#### Button Patterns
1.  **Simple (`ButtonCn.tsx`):** Use `cn` for simple boolean states (`active`, `disabled`).
2.  **Variants (`ButtonCva.tsx`):** Use `class-variance-authority` (CVA) for multiple variants (`size`, `intent`).

### Asset Management

#### Image Utilities
Images are managed via `import.meta.glob` in `src/lib/`. Place images in `src/assets/images/`.

*   **Eager Loading:** Use `getImage` from `@/lib/image` for static assets (returns string).
    ```tsx
    import { getImage } from '@/lib/image'
    <img src={getImage('hero.jpg')} alt="Hero" />
    ```
*   **Lazy Loading:** Use `getImageAsync` from `@/lib/imageAsync` for large images (returns Promise).
    ```tsx
    import { getImageAsync } from '@/lib/imageAsync'
    // in useEffect...
    getImageAsync('big-pic.png').then(setUrl)
    ```

### Accessibility (a11y)
*   **Navigation:** Use `<nav>` with descriptive `aria-label`.
*   **Interactive:**
    *   Use `aria-expanded` and `aria-controls` for menus/toggles.
    *   Ensure keyboard navigability.
*   **Images:** Always provide meaningful `alt` text.
*   **Contrast:** Ensure WCAG AA compliance.

### Formatting (Biome)
*   **Indentation:** 2 spaces.
*   **Quotes:** Single quotes (JSX attributes use double quotes).
*   **Semicolons:** As needed.
*   **Trailing Commas:** All.
