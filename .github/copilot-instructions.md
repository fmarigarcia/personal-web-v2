# Copilot Instructions for Personal Web v2

## Project Overview

This is a modern React 19 + TypeScript + Vite personal website with i18n support and TailwindCSS v4. The project follows a component-first architecture with strict TypeScript configuration and comprehensive testing setup.

## Architecture & File Organization

### Component Structure

- `src/components/ui/` - Reusable UI components following the [ComponentName]/index.ts barrel export pattern
- `src/components/layout/` - Layout-specific components
- `src/pages/` - Page-level components
- `src/hooks/` - Custom React hooks with co-located tests

### Key Patterns

```
Button/
├── Button.tsx          # Component implementation
├── index.ts           # Barrel export: export { default } from './Button'
└── __tests__/         # Co-located tests
```

### Import Aliases

- `@components/*` for `src/components/*` imports
- `@hooks/*` for `src/hooks/*` imports
- `@utils/*` for `src/utils/*` imports
- `@types/*` for `src/types/*` imports
- `@pages/*` for `src/pages/*` imports
- `@lib/*` for `src/lib/*` imports (e.g., `import '@lib/i18n.ts'`)

## Development Workflows

### Commands

- `npm run dev` - Development server with Vite HMR
- `npm run build` - TypeScript compilation + Vite build
- `npm run test` - Jest with jsdom environment
- `npm run lint` - ESLint with TypeScript, React, and import sorting

### Testing

- Jest configured with jsdom for React testing
- Component snapshot testing for UI consistency
- Tests located in `__tests__/` directories alongside components
- No additional setup files configured

## Technology Stack

### Core Dependencies

- **React 19.1.1** with TypeScript
- **Vite 7.1.0** for build tooling
- **TailwindCSS 4.1.11** with Vite plugin integration
- **i18next** with browser language detection and HTTP backend

### i18n Setup

- Translation files: `public/locales/{en,es}/translation.json`
- Configuration: `src/lib/i18n.ts` with fallback to English
- Initialized in `main.tsx` before React app

### Styling

- TailwindCSS v4 integrated via Vite plugin for utility-first CSS
- Global styles in `src/index.css` with `@import 'tailwindcss'`
- Component-specific styles in individual `.css` files if needed
- Follow Tailwind design system principles for consistent spacing, colors, and typography

## Code Quality & Standards

### ESLint Configuration

- TypeScript-aware rules with recommended configs
- React Hooks plugin for hook usage validation
- Import plugin with automatic sorting by groups
- Prettier integration for consistent formatting
- Import order: external → builtin → internal → sibling → parent → index

### TypeScript Setup

- Project references architecture (`tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`)
- Strict mode enabled
- Path aliases configured

## Development Conventions

### Component Creation

1. Create folder in appropriate directory (`ui/`, `layout/`, `pages/`)
2. Add `ComponentName.tsx` with React.FC typing
3. Create `index.ts` barrel export
4. Add `__tests__/` directory for tests
5. Use TailwindCSS classes for styling

### State Management

- React Context API for global state management
- Built-in React hooks (useState, useReducer, useContext) for local state
- Context providers should be placed in `src/contexts/` directory

### File Naming

- Components: PascalCase folders and files (`Button/Button.tsx`)
- Utilities/hooks: camelCase
- Config files: kebab-case where conventional

## Key Integration Points

- **Vite**: Custom config with React and TailwindCSS plugins
- **i18n**: Automatic language detection, files for translations in `public/locales/{lang}/translation.json`
- **TypeScript**: Strict compilation with project references
- **Testing**: Jest with jsdom, no React Testing Library currently configured

## When Adding Features

1. Follow the established component structure with barrel exports
2. Add TypeScript types in `src/types/` for complex data structures
3. Use i18next hooks for any user-facing text
4. Write snapshot tests in co-located `__tests__/` directories
5. Follow ESLint import ordering rules
6. Leverage TailwindCSS utility classes for styling
7. Use React Context API for shared state across components

## Maintaining These Instructions

**Important**: Keep these instructions up to date when adding new features, libraries, or changing project architecture. Update relevant sections when:

- Adding new dependencies or libraries
- Changing build tools, testing frameworks, or development workflows
- Introducing new architectural patterns or conventions
- Modifying file structure or import aliases
- Adding deployment pipelines or CI/CD processes

This ensures AI agents have accurate, current guidance for working with the codebase.
