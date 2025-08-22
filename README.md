# Personal Website v2

A modern, performant personal portfolio website built with React 19, TypeScript, and cutting-edge web technologies. Features clean architecture, comprehensive testing, and a CSS-first styling approach.

## 🚀 Tech Stack

### Core Framework
- **React 19.1.1** - Latest React with modern patterns and concurrent features
- **TypeScript** - Strict type safety with project references architecture  
- **Vite 7.1.0** - Lightning-fast build tool with HMR and optimized bundling

### Styling & UI
- **TailwindCSS 4.1.11** - Utility-first CSS framework with Vite plugin integration
- **clsx 2.1.1** - Conditional className utility for clean styling logic
- **CSS-first approach** - Zero inline styles, performance-optimized styling

### Internationalization
- **i18next** - Complete i18n solution with React hooks
- **Browser language detection** - Automatic locale detection
- **HTTP backend** - Dynamic translation loading

### Development Experience
- **ESLint** - Comprehensive linting with TypeScript, React, and import rules
- **Prettier** - Consistent code formatting
- **Jest + jsdom** - Robust testing framework with React component testing
- **Project References** - Scalable TypeScript configuration

## ✨ Key Features

### 🎨 **Modern Design System**
- Responsive design optimized for all devices
- Consistent typography scale and color palette
- Smooth animations and micro-interactions
- Clean, professional aesthetic

### 🌍 **Internationalization Ready**
- Full English and Spanish support
- Dynamic language switching
- Fallback handling for missing translations
- SEO-friendly locale management

### ⚡ **Performance Optimized**
- CSS-first styling approach (no runtime style calculations)
- Optimized bundle splitting and code organization
- Fast build times with Vite (< 1 second)
- Lighthouse-optimized performance metrics

### 🧪 **Comprehensive Testing**
- Component snapshot testing for UI consistency
- Jest configuration with jsdom environment
- Co-located test files with components
- 83+ passing tests ensuring code reliability

### 🏗️ **Clean Architecture**
- Component-first architecture with barrel exports
- Utility classes for consistent styling patterns
- Custom hooks for reusable logic
- Strict TypeScript configuration

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Section/          # Layout section wrapper
│   │   ├── NavigationLinks/  # Navigation components
│   │   └── ...
│   └── layout/               # Layout-specific components
├── pages/                    # Page-level components
│   ├── Hero/                 # Landing section
│   ├── About/                # About section
│   ├── Experience/           # Professional experience
│   └── Contact/              # Contact form
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions and constants
│   └── classNames.ts         # Reusable styling utilities
├── lib/                      # External library configurations
│   └── i18n.ts              # i18next configuration
└── types/                    # TypeScript type definitions
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/fmarigarcia/personal-web-v2.git

# Install dependencies
cd personal-web-v2
npm install
```

### Available Scripts
```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Development Workflow
1. **Components**: Create in appropriate directory with TypeScript and barrel exports
2. **Styling**: Use utility classes from `classNames.ts` and TailwindCSS
3. **Testing**: Add snapshot tests in co-located `__tests__/` directories
4. **i18n**: Add translations to `public/locales/{lang}/translation.json`

## 🎯 Architecture Decisions

### CSS-First Approach
- **Zero inline styles** across the entire codebase
- Component-specific CSS files for dynamic styling needs
- Utility classes for common patterns and consistency
- Performance benefits from eliminating runtime style calculations

### Component Design Patterns
```typescript
// Example component structure
ComponentName/
├── ComponentName.tsx     # Component implementation
├── ComponentName.css     # Component-specific styles (if needed)
├── index.ts             # Barrel export: export { default } from './ComponentName'
└── __tests__/           # Co-located tests
    ├── ComponentName.test.tsx
    └── __snapshots__/   # Jest snapshots
```

### Import Aliases
- `@components/*` → `src/components/*`
- `@hooks/*` → `src/hooks/*`  
- `@utils/*` → `src/utils/*`
- `@types/*` → `src/types/*`
- `@pages/*` → `src/pages/*`
- `@lib/*` → `src/lib/*`

## 📊 Code Quality

### ESLint Configuration
- TypeScript-aware rules with recommended configs
- React Hooks plugin for proper hook usage
- Import plugin with automatic sorting
- Prettier integration for consistent formatting

### Testing Strategy
- Component snapshot testing for UI consistency
- Jest with jsdom environment for React testing
- Co-located tests for better maintainability
- Comprehensive test coverage for critical paths

### Performance Metrics
- **Build time**: ~653ms (optimized Vite configuration)
- **Bundle size**: CSS 24.98kB, JS 272.20kB
- **Zero runtime style calculations**: Complete CSS-first implementation
- **TypeScript compilation**: Clean, no errors or warnings

## 📚 Documentation

- **[Style Props Migration](./docs/STYLE_PROPS_MIGRATION.md)** - Complete guide to CSS-first approach
- **[Copilot Instructions](./.github/copilot-instructions.md)** - AI development guidelines

## 🚀 Recent Achievements

### Complete Style Refactoring (August 2025)
- ✅ **Eliminated all inline style props** across the codebase
- ✅ **Implemented clsx** for conditional className management  
- ✅ **Created utility class system** for consistent styling patterns
- ✅ **Added comprehensive documentation** for future maintenance
- ✅ **Updated all tests and snapshots** to reflect new architecture

This refactoring improved performance, maintainability, and developer experience while following React best practices.

## 📄 License

This project is personal portfolio code. Feel free to use as inspiration for your own projects.

---

**Built with ❤️ by Francisco Marí García**  
*Senior Full Stack Engineer specializing in scalable web architectures*
