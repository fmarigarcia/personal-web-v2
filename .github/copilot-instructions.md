# Copilot Instructions for Personal Web v2

## 🚀 Project Overview

This is a modern React 19 + TypeScript + Vite personal website featuring i18n support and TailwindCSS v4. The project follows clean code principles with a component-first architecture, comprehensive testing strategy, and established patterns for maintainability and scalability.

**Key Principles**: Component reusability, separation of concerns, performance optimization, type safety, and comprehensive testing.

---

## 📁 Architecture & File Organization

### Directory Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout-specific components
├── pages/               # Page-level components with co-located hooks
├── hooks/               # Global reusable hooks
├── contexts/            # React Context providers
├── utils/               # Utility functions and constants
├── types/               # TypeScript type definitions
├── lib/                 # Third-party library configurations
└── data/                # Static data files
```

### Component Organization Pattern

```
ComponentName/
├── ComponentName.tsx    # Main component implementation
├── index.ts            # Barrel export: export { ComponentName } from './ComponentName'
├── ComponentName.css   # Optional component-specific styles
└── __tests__/          # Co-located tests
    ├── ComponentName.test.tsx
    └── __snapshots__/   # Jest snapshots
```

### Hook Organization Patterns

**Global Hooks** (`src/hooks/`): Reusable across multiple components

```typescript
// Pattern: {data, actions} return structure
interface UseHookNameReturn {
    data: {
        // State and computed values
    };
    actions: {
        // Functions that modify state
    };
}
```

**Hook Utility Organization** (`src/hooks/HookName/utils/`):

```
HookName/
├── HookName.ts          # Main hook implementation
├── index.ts            # Barrel export
├── utils/              # Extracted utility functions
│   ├── utilityModule.ts # Pure functions for testability
│   ├── index.ts        # Utility barrel export
│   └── __tests__/      # Comprehensive utility tests
│       └── utilityModule.test.ts
└── __tests__/          # Hook integration tests
    └── HookName.test.ts
```

**Utility Extraction Principles**:

- Extract pure functions from hooks for better testability
- Keep utilities small, focused, and side-effect free
- Co-locate utility tests for isolated testing
- Use centralized types from `@types/hooks` for consistency

**Component-Specific Hooks** (`src/pages/ComponentName/useComponentName.ts`):

- Co-located with their component
- Follow same `{data, actions}` pattern
- Use `useCallback` for performance optimization

---

## 🎯 Development Patterns & Best Practices

### 1. Custom Hook Pattern (MANDATORY)

```typescript
export const useMyHook = () => {
    // ... hook logic

    const data = {
        // All state and computed values
    };

    const actions = {
        // All functions that modify state (use useCallback)
        myAction: useCallback(() => {
            // action implementation
        }, [dependencies]),
    };

    return { data, actions };
};
```

### 2. Component Pattern

```typescript
interface ComponentProps {
    // Well-defined props with TypeScript
}

export const MyComponent: React.FC<ComponentProps> = ({ props }) => {
    const { data, actions } = useMyHook();

    return (
        // JSX implementation
    );
};
```

### 3. Testing Patterns

**Component Tests**: Focus on behavior, not implementation

```typescript
describe('ComponentName', () => {
    it('should render with expected behavior', () => {
        // Test what the component does, not how
    });
});
```

**Hook Tests**: Test data and actions separately

```typescript
describe('useMyHook', () => {
    it('should return data with correct structure', () => {
        const { result } = renderHook(() => useMyHook());
        expect(result.current.data).toEqual(expectedData);
    });

    it('should execute actions correctly', () => {
        const { result } = renderHook(() => useMyHook());
        act(() => {
            result.current.actions.myAction();
        });
        // Verify side effects
    });
});
```

**Utility Function Tests**: Test pure functions in isolation

```typescript
describe('utilityFunction', () => {
    it('should handle normal cases correctly', () => {
        const result = utilityFunction(validInput);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle edge cases gracefully', () => {
        const result = utilityFunction(edgeCase);
        expect(result).toEqual(expectedEdgeCaseOutput);
    });

    it('should validate input parameters', () => {
        expect(() => utilityFunction(invalidInput)).toThrow();
    });
});
```

---

## 🛠 Technology Stack & Configuration

### Core Dependencies

- **React 19.1.1** + **TypeScript** (Strict mode)
- **Vite 7.1.0** (Build tool with HMR)
- **TailwindCSS 4.1.11** (Utility-first styling)
- **i18next** (Internationalization)
- **Jest** + **@testing-library/react** (Testing)

### Import Aliases (tsconfig.json)

```typescript
'@components/*' → 'src/components/*'
'@hooks/*'      → 'src/hooks/*'
'@contexts/*'   → 'src/contexts/*'
'@utils/*'      → 'src/utils/*'
'@types/*'      → 'src/types/*'
'@pages/*'      → 'src/pages/*'
'@lib/*'        → 'src/lib/*'
```

### ESLint Configuration

- **Import ordering**: external → builtin → internal → sibling → parent → index
- **Import rules**: Automatic sorting, no unresolved imports disabled
- **TypeScript**: Strict type checking with recommended rules
- **React**: Hooks rules for proper usage patterns

---

## 🧪 Testing Strategy

### Testing Principles

1. **Test behavior, not implementation**
2. **Co-locate tests with components/hooks**
3. **Mock external dependencies properly**
4. **Use descriptive test names**
5. **Maintain test isolation**

### Test Coverage Requirements

- **Components**: Snapshot + behavior tests
- **Hooks**: Data structure + action functionality
- **Utilities**: Pure function testing with edge cases and mathematical accuracy
- **Integration**: Context providers + complex interactions

**Current Test Coverage**: 424+ tests across 44 test suites with 87 utility-specific tests

### Utility Testing Best Practices

- **Test pure functions in isolation** for better reliability and debugging
- **Cover edge cases and boundary conditions** (negative values, zero, null/undefined)
- **Test mathematical accuracy** for numeric calculations (easing functions, animations)
- **Validate input parameters** and error handling
- **Use descriptive test names** that explain the scenario being tested
- **Group related tests** using nested describe blocks for organization

### Mocking Patterns

```typescript
// Mock external dependencies
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: jest.fn() }),
}));

// Mock internal hooks/contexts
const mockFunction = jest.fn();
jest.mock('@contexts/MyContext', () => ({
    useMyContext: jest.fn(() => ({ value: mockFunction })),
}));
```

---

## 🎨 Styling & UI Guidelines

### TailwindCSS Usage

- **Utility-first approach**: Use Tailwind classes for styling
- **Component variants**: Create reusable variants in `@utils/classNames`
- **Responsive design**: Mobile-first approach with breakpoint prefixes
- **Design tokens**: Consistent spacing, colors, and typography

### Component Styling Pattern

```typescript
// utils/classNames.ts - Centralized style variants
export const buttonVariants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 px-4 py-2 rounded',
};

// Component usage
const Button: React.FC<ButtonProps> = ({ variant = 'primary' }) => {
    const classes = buttonVariants[variant];
    return <button className={classes}>...</button>;
};
```

---

## 🌍 Internationalization (i18n)

### Translation Structure

```
public/locales/
├── en/translation.json
└── es/translation.json
```

### Usage Pattern

```typescript
const { t } = useTranslation();

// Nested keys for organization
const title = t('hero.title');
const description = t('hero.description');
```

### Best Practices

- **Organize by feature/section**: `hero.title`, `nav.home`
- **Descriptive keys**: Avoid generic keys like `button1`
- **Fallback handling**: Always provide English as fallback

---

## ⚡ Performance Optimization

### Hook Performance

```typescript
// Use useCallback for stable function references
const actions = {
    handleClick: useCallback(() => {
        // action implementation
    }, [dependencies]),
};

// Use useMemo for expensive computations
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
}, [data]);
```

### Component Performance

- **Avoid inline functions** in JSX props
- **Use React.memo** for components that receive stable props
- **Minimize re-renders** with proper dependency arrays

---

## 🚦 Code Quality Standards

### TypeScript Requirements

- **Strict mode enabled**: No implicit any, strict null checks
- **Interface over type**: Use interfaces for object shapes
- **Proper typing**: Avoid any, use unknown for truly unknown types
- **Generic constraints**: Use meaningful generic constraints
- **Centralized types**: Use `@types/*` for shared types across modules

### Type Organization Pattern

```typescript
// src/types/hooks.ts - Centralized hook-related types
export interface UseHookReturn {
    data: {
        /* ... */
    };
    actions: {
        /* ... */
    };
}

// Utility function types grouped by domain
export interface AnimationFrame {
    /* ... */
}
export type EasingFunction = (t: number) => number;
export interface TouchGestureData {
    /* ... */
}

// Import centralized types in hooks and utilities
import type { AnimationFrame, EasingFunction } from '@types/hooks';
```

### Code Organization

- **Single responsibility**: Each file/function has one clear purpose
- **DRY principle**: Extract common logic into utilities/hooks
- **Consistent naming**: PascalCase for components, camelCase for functions
- **Barrel exports**: Use index.ts files for clean imports

### Git Commit Standards

```
feat: add new feature
fix: resolve issue
refactor: improve code structure
test: add/update tests
docs: update documentation
config: update configuration
perf: performance improvements
```

---

## 🔧 Development Workflows

### Available Commands

```bash
npm run dev       # Development server (http://localhost:5173)
npm run build     # Production build with type checking
npm run test      # Run Jest test suite
npm run lint      # ESLint + TypeScript checking
npm run preview   # Preview production build locally
```

### Adding New Features Checklist

1. ✅ **Plan component structure** (ui/ vs layout/ vs pages/)
2. ✅ **Create TypeScript interfaces** for props/data
3. ✅ **Follow established patterns** ({data, actions} for hooks)
4. ✅ **Add comprehensive tests** (component + hook if applicable)
5. ✅ **Use translation keys** for user-facing text
6. ✅ **Add barrel exports** (index.ts files)
7. ✅ **Verify ESLint compliance** (import order, TypeScript rules)
8. ✅ **Update tests** and ensure they pass
9. ✅ **Document any new patterns** or architectural decisions

### Common Patterns to Follow

**Creating a New UI Component:**

```typescript
// 1. Create component folder structure
src/components/ui/NewComponent/
├── NewComponent.tsx
├── index.ts
└── __tests__/NewComponent.test.tsx

// 2. Implement with proper typing
interface NewComponentProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

export const NewComponent: React.FC<NewComponentProps> = ({
    variant = 'primary',
    children,
}) => {
    // Implementation with TailwindCSS classes
};

// 3. Add barrel export
export { NewComponent } from './NewComponent';

// 4. Update ui/index.ts
export { NewComponent } from './NewComponent';
```

**Creating a New Page with Hook:**

```typescript
// 1. Create page structure
src/pages/NewPage/
├── NewPage.tsx
├── useNewPage.ts
├── index.ts
└── __tests__/useNewPage.test.ts

// 2. Follow {data, actions} pattern in hook
export const useNewPage = () => {
    const data = { /* state and computed values */ };
    const actions = { /* memoized action functions */ };
    return { data, actions };
};
```

**Creating Hook Utilities for Better Testability:**

```typescript
// 1. Create utility structure
src/hooks/MyHook/
├── MyHook.ts
├── utils/
│   ├── mathUtils.ts         # Pure mathematical functions
│   ├── domUtils.ts          # DOM manipulation utilities
│   ├── eventUtils.ts        # Event handling utilities
│   ├── index.ts            # Utility exports
│   └── __tests__/          # Comprehensive utility tests
│       ├── mathUtils.test.ts
│       ├── domUtils.test.ts
│       └── eventUtils.test.ts
└── __tests__/MyHook.test.ts # Hook integration tests

// 2. Extract pure functions to utilities
// mathUtils.ts
export const calculatePosition = (start: number, end: number, progress: number): number => {
    return start + (end - start) * progress;
};

// 3. Import utilities in hook
import { calculatePosition } from './utils';

// 4. Centralize utility types in @types/hooks
export interface CalculationParams {
    start: number;
    end: number;
    progress: number;
}

// 5. Test utilities independently
describe('mathUtils', () => {
    describe('calculatePosition', () => {
        it('should calculate position correctly', () => {
            expect(calculatePosition(0, 100, 0.5)).toBe(50);
        });

        it('should handle edge cases', () => {
            expect(calculatePosition(0, 100, 0)).toBe(0);
            expect(calculatePosition(0, 100, 1)).toBe(100);
        });
    });
});
```

---

## 🚨 Critical Considerations

### Security

- **No sensitive data** in client-side code
- **Validate all inputs** from external sources
- **Sanitize translations** if they contain HTML

### Accessibility

- **Semantic HTML**: Use proper HTML elements
- **ARIA labels**: Add appropriate accessibility attributes
- **Keyboard navigation**: Ensure all interactive elements are accessible
- **Color contrast**: Follow WCAG guidelines

### Browser Compatibility

- **Modern browsers**: ES2020+ features are acceptable
- **Progressive enhancement**: Core functionality works without JS
- **Responsive design**: Mobile-first approach with proper breakpoints

---

## 🔄 Maintenance & Updates

### When Adding New Dependencies

1. **Justify the addition**: Does it solve a real problem?
2. **Check bundle impact**: Monitor build size increases
3. **Update these instructions**: Document new patterns/integrations
4. **Add proper typing**: Ensure TypeScript compatibility
5. **Update tests**: Mock new dependencies appropriately

### Keeping Instructions Current

**Update this file when:**

- Adding new architectural patterns
- Introducing new dependencies or build tools
- Changing testing strategies or conventions
- Modifying file structure or import aliases
- Establishing new code quality standards
- Adding deployment or CI/CD processes

**Version**: Updated after hook utility extraction and comprehensive testing (August 2025)
**Last Major Changes**:

- Established hook utility extraction patterns with dedicated utils/ folders
- Implemented centralized type system in @types/hooks.ts
- Added comprehensive utility testing strategy (87 new utility tests)
- Enhanced testing patterns for pure functions with edge case coverage
- Performance optimization patterns with utility isolation

This ensures AI agents have accurate, current guidance for maintaining and extending the codebase effectively.
