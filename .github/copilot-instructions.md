# Copilot Instructions

## Project Overview

Minimal React 19 + TypeScript + Vite 7 + Tailwind CSS 4 starter with pnpm workspace support.

## Tech Stack

- **Framework**: React 19.2 (`react-jsx` transform)
- **Build**: Vite 7 + `@vitejs/plugin-react` (Fast Refresh enabled)
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`, applied with `@import "tailwindcss"`)
- **Linter/Formatter**: Biome 2.3 (strict configuration in `.biome.json`)
- **Package Manager**: pnpm (`pnpm-workspace.yaml` with `@tailwindcss/oxide`, `esbuild` as build dependencies only)

## Key Structure

- **Entry**: `index.html` → `src/main.tsx` → `src/App.tsx`
- **Styles**: `src/index.css` with `@import "tailwindcss"` only (no config file, v4 approach)
- **TypeScript**: Project references (`tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`)
- **Vite Config**: `vite.config.ts` with `base: './'` (relative path deployment)

## Coding Conventions

### React

- **Omit React Import**: Project uses `react-jsx` transform — **never** write `import React from 'react'`
- **Hook Imports**: Import hooks as named imports: `import { useState, useEffect } from 'react'`
- **Component Structure**:
  - Use semantic HTML tags (`header`, `main`, `footer`, `section`, `article`, `nav`, `aside`)
  - Define props explicitly with TypeScript interfaces
  - Example:
    ```tsx
    interface ButtonProps {
      label: string
      onClick: () => void
    }

    function Button({ label, onClick }: ButtonProps) {
      return <button onClick={onClick}>{label}</button>
    }
    ```

### TypeScript

- **Strict Mode**: `strict: true`, unused variables/parameters error, `noUncheckedSideEffectImports` enabled
- **Module**: `moduleResolution: "bundler"`, `allowImportingTsExtensions: true`
- **JSX**: `react-jsx` transform (no `import React` needed)
- **Type Checking**: `erasableSyntaxOnly: true` (limited to type-only syntax)

### Biome Rules

- **Format**: 2 spaces, LF, 80 char width, semicolons `asNeeded`, single quotes, trailing commas `all`
- **Linter**: `recommended` base + strict TypeScript rules (`noExplicitAny: error`, `noUnusedVariables: error`)
- **React**: `useExhaustiveDependencies: warn`, `useHookAtTopLevel: error`
- **CSS**: Tailwind directives parsing enabled

## Development Workflow

```fish
# Start dev server (HMR enabled)
pnpm dev

# Build (type check → Vite build)
pnpm build

# Preview build artifacts
pnpm preview

# Code quality check (Biome format + lint)
pnpm check
```

### Mise Tasks (Recommended)

Tasks defined in `mise.toml` can be run with `mise run <task>`:

- `vite:dev` / `vite:build` / `vite:preview`
- `biome:format` / `biome:lint` / `biome:check` (with confirmation prompts)

## Dependency Management

- **Lock File**: `pnpm-lock.yaml` (pnpm v9+ format)
- **Updates**: `ncu -i -u` for interactive updates (from history)

## Tailwind CSS v4 Notes

- **No Config Needed**: No `tailwind.config.js`, just `@import "tailwindcss"` in `src/index.css`
- **Customization**: Use CSS variables or `@theme` directives (not traditional JS config)
- **Vite Plugin**: `@tailwindcss/vite` required (no PostCSS needed)

### Theme Management

- **Use @theme Block**: Define project-specific design tokens in `src/index.css`:
  ```css
  @import "tailwindcss";

  @theme {
    --color-primary: #294779;
    --color-secondary: #f59e0b;
  }
  ```
- **Reference Custom Classes**: Use theme variables (`text-primary`) instead of arbitrary values (`text-[#294779]`)
- **Avoid Hardcoded Values**: Centralize colors/spacing in `@theme` for consistency

### Spacing and Value Guidelines

- **Prioritize Standard Scale**: Tailwind's spacing scale (1 unit = 4px) should be used first:
  - ✅ Good: `gap-2` (8px), `p-4` (16px), `m-6` (24px), `w-80` (320px)
  - ❌ Avoid: `gap-[8px]`, `p-[16px]`, `w-[320px]`
- **Arbitrary Values as Last Resort**: Use `[...]` syntax **only** when standard scale or theme variables cannot achieve the design:
  - Acceptable: `w-[42px]` (if design requires exact 42px)
  - Better: Add to `@theme` if used multiple times
- **Responsive Design**: Use standard breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)

### V4 Class Name Changes (CRITICAL)

Tailwind CSS v4 has updated class naming conventions. **Always use v4 syntax**:

```tsx
// ❌ WRONG (v3 syntax)
<div className="text-gray-500 bg-gray-50 space-y-4">

// ✅ CORRECT (v4 syntax)
<div className="text-gray-500 bg-gray-50 flex flex-col gap-4">
```

**Key v4 changes:**
- ❌ `space-x-*` / `space-y-*` → ✅ Use `gap-*` with flex/grid
- ❌ `divide-*` → ✅ Use borders on individual children
- ✅ All utility classes remain: `flex`, `grid`, `p-*`, `m-*`, `w-*`, `h-*`, etc.
- ✅ Arbitrary values: Use sparingly (`w-[42px]`). Prefer standard scale (`w-2.5`) or CSS variables (`text-primary`)
- ✅ Responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- ✅ State variants: `hover:`, `focus:`, `active:`, `disabled:`, etc.

**Never generate or suggest v3-specific utilities.** When refactoring, convert deprecated utilities to modern flex/grid patterns.

## Component Patterns

```tsx
// lucide-react icon usage example (see src/App.tsx)
import { IconName } from 'lucide-react'

function Component() {
  return (
    <div className="flex items-center gap-2">
      <IconName className="w-6 h-6" />
      <h1 className="text-2xl font-bold">Title</h1>
    </div>
  )
}
```

- **CSS Classes**: Tailwind utilities preferred
- **Type Safety**: Local CSS like `App.css` can be used alongside (`import './App.css'`)

## Accessibility (a11y)

### Navigation Structure

- **Semantic Menus**: Build navigation using proper list structure:
  ```tsx
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
  ```
- **ARIA Labels**: Provide descriptive `aria-label` to `<nav>` elements (e.g., `"Main navigation"`, `"Footer links"`)

### Interactive Elements

- **Mobile Menu Buttons**: Use proper ARIA attributes:
  ```tsx
  <button
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
    aria-label="Toggle menu"
  >
    Menu
  </button>
  ```
- **State Indication**: Set `aria-expanded` to `true`/`false` for collapsible sections
- **Control Relationships**: Use `aria-controls` to link buttons with their target elements
- **Focus Management**: Ensure keyboard navigation works for all interactive elements

### Best Practices

- **Alt Text**: Always provide meaningful `alt` attributes for images
- **Color Contrast**: Ensure text meets WCAG AA standards (4.5:1 for normal text)
- **Keyboard Navigation**: All functionality must be accessible via keyboard
- **Screen Reader Testing**: Test with VoiceOver (macOS) or NVDA/JAWS (Windows)

## Troubleshooting

- **Biome LSP Errors**: Reload VSCode (`Developer: Reload Window`), verify workspace trust
- **HMR Stopped**: Restart `pnpm dev`, delete `node_modules/.vite` cache
- **Type Errors**: Pre-check with `pnpm build` (`tsc -b` → `vite build`)
