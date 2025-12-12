# Tailwind Vite Project Context

## Project Overview

This is a **minimal starter template** for building modern web applications using **React 19**, **TypeScript 5.9**, **Vite 7**, and **Tailwind CSS 4**. It is designed for performance and developer experience, leveraging **Biome** for fast linting and formatting.

**Key Features:**
*   **Framework:** React 19 + React DOM 19
*   **Build Tool:** Vite 7 (with Fast Refresh)
*   **Styling:** Tailwind CSS 4 (Zero-configuration approach via `@tailwindcss/vite`)
*   **Language:** TypeScript 5.9 (Strict mode enabled)
*   **Tooling:** Biome 2.3 (Linter & Formatter), pnpm (Package Manager)

## Directory Structure

```text
/Users/cipher/Documents/projects/tailwind-vite/
├── .github/               # GitHub specific configurations (Copilot instructions)
├── src/
│   ├── App.tsx            # Root React component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles (includes Tailwind directives)
│   └── vite-env.d.ts      # Vite type definitions
├── .editorconfig          # Editor configuration (respected by Biome)
├── biome.json             # Biome configuration (Linting/Formatting rules)
├── index.html             # HTML entry point
├── mise.toml              # Task runner configuration (wraps pnpm scripts)
├── package.json           # Dependencies and scripts
├── pnpm-workspace.yaml    # pnpm workspace configuration
├── tsconfig.json          # TypeScript root configuration
└── vite.config.ts         # Vite configuration
```

## Development Workflow

### Prerequisites
*   **Node.js:** >= 20.19 (Recommended for Vite 7)
*   **Package Manager:** pnpm

### Key Commands
Run these commands using `pnpm <script>` or `mise run <task>`:

| Command | Action | Description |
| :--- | :--- | :--- |
| `dev` | `vite` | Starts the development server with HMR. |
| `build` | `tsc -b && vite build` | Type-checks and builds the application for production. |
| `preview` | `vite preview` | Previews the production build locally. |
| `lint` | `biome lint --write` | Lints the codebase using Biome and fixes issues where possible. |
| `format` | `biome format --write` | Formats the codebase using Biome. |
| `check` | `biome check --write` | Runs both formatting and linting checks. |

## Coding Conventions

### TypeScript
*   **Strict Mode:** Enabled. Avoid `any` types; explicit typing is enforced.
*   **Imports:** Uses standard ES modules.
*   **JSX:** Uses the automatic runtime (`react-jsx`), so `import React` is not required.

### Styling (Tailwind CSS v4)
*   **Configuration:** Zero-config. Tailwind is configured via `@import "tailwindcss";` in `src/index.css`.
*   **Usage:** Use utility classes directly in JSX (e.g., `className="flex items-center"`).
*   **Icons:** `lucide-react` is used for icons.

### Formatting & Linting (Biome)
*   **Indentation:** 2 spaces.
*   **Quotes:** Single quotes for JS/TS, double quotes for JSX attributes.
*   **Semicolons:** As needed.
*   **Trailing Commas:** All (ES5+ compatible).
*   **Rules:**
    *   `noExplicitAny`: Error.
    *   `noUnusedVariables`: Error.
    *   `useHookAtTopLevel`: Error.
    *   `useExhaustiveDependencies`: Warning.

## Configuration Files

*   **`vite.config.ts`:** Configures the React and Tailwind CSS plugins. Sets the base path to `./`.
*   **`biome.json`:** strict rules for linting and formatting. Includes overrides for TypeScript files.
*   **`tsconfig.json`:** Uses project references (`tsconfig.app.json`, `tsconfig.node.json`) and sets strict compiler options suitable for modern web development.
