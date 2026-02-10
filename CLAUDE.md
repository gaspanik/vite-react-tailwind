# Claude Development Guidelines

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
- **Components**: `src/components/` for reusable UI components
- **Utilities**: `src/lib/utils.ts` with `cn` function (clsx + tailwind-merge)
- **Path Alias**: `@/` maps to `src/` for cleaner imports (configured in both `vite.config.ts` and `tsconfig.app.json`)
- **TypeScript**: Project references (`tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`)
- **Vite Config**: `vite.config.ts` with `base: './'` (relative path deployment)

## Coding Conventions

### React

#### CRITICAL: React Import Rules

- **Omit React Import**: Project uses `react-jsx` transform — **NEVER** write `import React from 'react'`
- **Hook Imports**: Import hooks as named imports: `import { useState, useEffect } from 'react'`

#### Component Structure

- **Semantic HTML**: Use `header`, `main`, `footer`, `section`, `article`, `nav`, `aside`
- **Props Definition**: Define props explicitly with TypeScript interfaces

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
- **Path Mapping**: `baseUrl: "./src"` with `@/*` alias for absolute imports from `src/`

```tsx
// Use @/ to import from src/
import { Button } from '@/components/ButtonCn'
import { cn } from '@/lib/utils'
```

### Biome Rules

- **Format**: 2 spaces, LF, 80 char width, semicolons `asNeeded`, single quotes, trailing commas `all`
- **Linter**: `recommended` base + strict TypeScript rules (`noExplicitAny: error`, `noUnusedVariables: error`)
- **React**: `useExhaustiveDependencies: warn`, `useHookAtTopLevel: error`
- **CSS**: Tailwind directives parsing enabled

## Development Workflow

```bash
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

- **Vite tasks**: `vite:dev`, `vite:build`, `vite:preview`
- **Biome tasks**: `biome:format`, `biome:lint`, `biome:check`

Use mise commands in environments with mise installed, otherwise use pnpm directly.

## Tailwind CSS v4 Notes

### Core Principles

- **No Config Needed**: No `tailwind.config.js` required — just use `@import "tailwindcss"` in your main CSS file
- **Installation**: Use `@tailwindcss/vite` plugin (no PostCSS setup required for Vite projects)
- **Customization**: Use CSS variables and `@theme` directives directly in CSS (not JavaScript config)

### MCP Server Integration

**AI-Assisted Development**: When Tailwind CSS MCP server is available, leverage it to ensure accurate utility class usage and stay updated with v4 specifications:

- Search utilities by category or property (`mcp__TailwindCSS__get_tailwind_utilities`)
- Verify v4 syntax and class names (`mcp__TailwindCSS__search_tailwind_docs`)
- Convert legacy CSS to Tailwind utilities (`mcp__TailwindCSS__convert_css_to_tailwind`)
- Generate component templates with proper Tailwind classes (`mcp__TailwindCSS__generate_component_template`)
- Get color palette information (`mcp__TailwindCSS__get_tailwind_colors`)

### Theme Management

Define project-specific design tokens in `src/index.css`:

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

- **Prioritize Standard Scale**: Tailwind's spacing scale (base unit = 0.25rem/4px) should be used first:
  - ✅ Good: `gap-2` (0.5rem), `p-4` (1rem), `m-8` (2rem), `w-80` (20rem)
  - ❌ Avoid: `gap-[0.5rem]`, `p-[1rem]`, `w-[20rem]`
- **Arbitrary Values as Last Resort**: Use `[...]` syntax **only** when standard scale or theme variables cannot achieve the design:
  - Acceptable: `w-[42px]` (if design requires exact 42px outside the scale)
  - Better: Add to `@theme` if used multiple times
- **Responsive Design**: Use standard breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- **Modifiers**: Combine with state variants (`hover:`, `focus:`, `active:`, `disabled:`) and dark mode (`dark:`)

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

**When MCP server is available**: Always verify class names and syntax against the latest Tailwind CSS v4 documentation using MCP tools before suggesting code.

## Component Patterns

### cn Function

The `cn` utility (in `src/lib/utils.ts`) combines `clsx` and `tailwind-merge` to handle conditional class names and resolve Tailwind conflicts:

```tsx
import { cn } from '@/lib/utils'

// Basic usage with conditional classes
<button
  className={cn(
    'base-styles',
    isActive && 'active-styles',
    disabled && 'disabled-styles',
    className  // Allow external override
  )}
>
```

### Button Component Patterns

Two main approaches for building components with variant styles:

#### 1. Simple Conditional Approach (`ButtonCn.tsx`)

- Use `cn` function for conditional styling
- Best for simple components with few variations or single DOM elements

```tsx
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
  active?: boolean
}

export const Button = ({ className, active, disabled, ...props }: ButtonProps) => (
  <button
    className={cn(
      'base-classes',
      active && 'active-classes',
      disabled && 'disabled-classes',
      className
    )}
    {...props}
  />
)
```

#### 2. Variant API Approach (`ButtonCva.tsx`)

- Use `class-variance-authority` (CVA) for complex variants
- Best for single-element components with multiple design system variants
- Type-safe variant props with `VariantProps<typeof variants>`

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('base-classes', {
  variants: {
    intent: {
      primary: 'primary-classes',
      secondary: 'secondary-classes'
    },
    size: {
      sm: 'small-classes',
      md: 'medium-classes'
    }
  },
  defaultVariants: { intent: 'primary', size: 'md' }
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>

export const ButtonCva = ({ intent, size, className, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ intent, size }), className)} {...props} />
)
```

**When to use each approach:**
- **cn function**: Simple components, few conditionals, single element
- **CVA**: Single-element components with multiple variant combinations (buttons, badges, forms)

### Icons

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

### Styling Guidelines

- **CSS Classes**: Tailwind utilities preferred
- **Type Safety**: Local CSS like `App.css` can be used alongside (`import './App.css'`)
- **Inline classes**: Keep component styles in `className` props
- **`cn()` for composition**: Merge and dedupe Tailwind classes (uses `clsx` + `tailwind-merge`)
- **Icons**: Use `lucide-react` with consistent sizing (`w-4 h-4` for inline, `w-6 h-6` for headings)
- **Component Overrides**: Accept `className` prop and apply it last in `cn` call

## Asset Management

### Image Utilities

This project uses Vite's `import.meta.glob` for optimized image handling. All images should be placed in `src/assets/images/`.

**Files**:
- `src/lib/image.ts` - Eager loading (sync functions)
- `src/lib/imageAsync.ts` - Lazy loading (async functions)

**Supported formats**: `jpg`, `jpeg`, `png`, `webp`, `svg`

#### getImage()

Get images with or without file extension. Automatically resolves extension if omitted.

```tsx
import { getImage } from '@/lib/image'

function Component() {
  return (
    <img
      src={getImage('portrait.jpg')}  // With extension
      alt="Portrait"
    />
    // or
    <img
      src={getImage('portrait')}      // Auto-detects portrait.jpg
      alt="Portrait"
    />
  )
}
```

- Returns empty string if image not found
- Dev mode: Logs console warning for missing images
- Eager loading (all images loaded at build time)

#### getImageAsync()

Lazy-load large images for better performance:

```tsx
import { getImageAsync } from '@/lib/imageAsync'
import { useState, useEffect } from 'react'

function Gallery() {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    getImageAsync('large-photo.jpg').then(setImageUrl)
  }, [])

  return imageUrl ? <img src={imageUrl} alt="Large" /> : <p>Loading...</p>
}
```

#### getAllImages()

Get all images as a key-value map (useful for galleries):

```tsx
import { getAllImages } from '@/lib/image'

function ImageGallery() {
  const images = getAllImages() // { filename: url, ... }

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(images).map(([name, url]) => (
        <img key={name} src={url} alt={name} />
      ))}
    </div>
  )
}
```

#### getAllImagesAsync()

Asynchronously get all images as a key-value map:

```tsx
import { getAllImagesAsync } from '@/lib/imageAsync'
import { useState, useEffect } from 'react'

function ImageGallery() {
  const [images, setImages] = useState<Record<string, string>>({})

  useEffect(() => {
    getAllImagesAsync().then(setImages)
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(images).map(([name, url]) => (
        <img key={name} src={url} alt={name} />
      ))}
    </div>
  )
}
```

**Best Practices:**
- Place all images in `src/assets/images/`
- Use descriptive filenames (e.g., `hero-banner.jpg`, not `img1.jpg`)
- Prefer `getImage()` for static assets (eager loading, faster initial load)
- Use `getImageAsync()` for large images or conditional loading (lazy loading)
- Import async functions from `@/lib/imageAsync`
- Import sync functions from `@/lib/image`
- Always provide meaningful `alt` text for accessibility

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

## Special Instructions for Claude

### Code Generation Guidelines

1. **NEVER Import React**: This project uses `react-jsx` transform, so **NEVER** write `import React from 'react'`
   ```tsx
   // ❌ WRONG - Do not do this
   import React from 'react'
   import { useState } from 'react'

   // ✅ CORRECT
   import { useState, useEffect } from 'react'
   ```

2. **Use Tailwind v4 Classes**:
   - When MCP server is available, always verify class names before suggesting code
   - Never use v3-specific utilities like `space-x-*`, `space-y-*`, `divide-*`
   - Use `flex` or `grid` with `gap-*` instead

3. **Path Aliases**: Always use `@/` alias for imports from `src/`
   ```tsx
   // ✅ CORRECT
   import { Button } from '@/components/Button'
   import { cn } from '@/lib/utils'

   // ❌ WRONG
   import { Button } from '../components/Button'
   import { cn } from '../lib/utils'
   ```

4. **Component Structure**:
   - Prioritize semantic HTML tags
   - Explicitly define prop types with TypeScript interfaces
   - Use `cn` function to merge classes
   - Accept `className` prop to allow external style overrides

5. **Image Handling**:
   - All images go in `src/assets/images/`
   - Use `getImage()` for static images
   - Use `getImageAsync()` for large images
   - Always provide `alt` attributes

6. **Accessibility**:
   - Use proper `aria-label` for navigation
   - Use `aria-expanded`, `aria-controls` for interactive elements
   - Consider keyboard navigation and screen readers

### File Creation and Editing

- **Prefer Editing Existing Files**: Read and understand existing code before suggesting modifications
- **Don't Create Unnecessary Files**: Only create files when absolutely necessary for the task
- **Follow Biome Conventions**: 2 spaces, single quotes, trailing commas, etc.

### Communication

- Reference code locations using `file_path:line_number` format
- Keep explanations concise and clear
- Use markdown links for file references: `[filename.ts](src/filename.ts)` or `[filename.ts:42](src/filename.ts#L42)`
