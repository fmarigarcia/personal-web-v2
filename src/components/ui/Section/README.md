# Section Component

A reusable wrapper component for page sections that ensures proper spacing and fills the viewport correctly accounting for the fixed navigation header.

## Features

- **CSS-based navbar offset**: Uses CSS classes instead of inline styles for better performance
- **Full viewport height**: Option to make sections fill the entire viewport
- **Predefined backgrounds**: White, gray-50, or gradient backgrounds
- **Flexible content**: Accepts any React children
- **Responsive padding**: Consistent horizontal padding and responsive vertical spacing
- **Clean styling**: No inline styles, all styling via CSS classes

## Props

```typescript
interface SectionProps {
    id: string; // Required: Section ID for navigation
    className?: string; // Optional: Additional CSS classes
    children: React.ReactNode; // Required: Section content
    fullHeight?: boolean; // Optional: Fill viewport height (default: false)
    backgroundColor?: 'white' | 'gray-50' | 'gradient'; // Optional: Background style (default: 'white')
}
```

## Usage Examples

### Basic Section (Content-based height)

```tsx
<Section id="about" backgroundColor="white">
    <div className="max-w-6xl mx-auto">
        <h2>About Us</h2>
        <p>Content here...</p>
    </div>
</Section>
```

### Full-height Section (Hero style)

```tsx
<Section
    id="hero"
    fullHeight
    backgroundColor="gradient"
    className="flex items-center justify-center"
>
    <div className="text-center">
        <h1>Welcome</h1>
        <button>Get Started</button>
    </div>
</Section>
```

### Gray Background Section

```tsx
<Section id="experience" backgroundColor="gray-50">
    <div className="max-w-6xl mx-auto">
        <h2>Experience</h2>
        {/* Timeline content */}
    </div>
</Section>
```

## Background Options

- **`white`**: Clean white background (`bg-white`)
- **`gray-50`**: Light gray background (`bg-gray-50`)
- **`gradient`**: Subtle gray gradient (`bg-gradient-to-br from-gray-50 to-gray-100`)

## Spacing Behavior

### Full Height Sections (`fullHeight={true}`)

- **Height**: `min-h-screen` - fills entire viewport
- **Top padding**: `section-navbar-offset` CSS class (80px) - accounts for fixed navbar
- **Bottom padding**: `0px` - content determines height
- **Content wrapper**: `min-h-screen flex flex-col justify-center py-20`

### Regular Sections (`fullHeight={false}`)

- **Height**: Content-driven (no min-height)
- **Top padding**: `0px` - no navbar offset needed
- **Bottom padding**: `pb-20` class (5rem) - consistent section spacing
- **Content wrapper**: `py-20` - standard section padding

## Implementation Notes

1. **CSS Classes**: Uses `section-navbar-offset` CSS class (80px) for navbar spacing
2. **No Inline Styles**: All styling handled via CSS classes for better performance
3. **Responsive Design**: Includes `px-6` for horizontal padding on all screen sizes
4. **Content Flow**: Regular sections stack naturally, full-height sections fill viewport
5. **TypeScript**: Fully typed with comprehensive interface
6. **CSS File**: Component styles defined in `Section.css`

## Current Usage in Project

- **Hero**: `fullHeight + gradient` - Landing section that fills viewport
- **About**: `white` - Content section with standard padding
- **Experience**: `gray-50` - Alternating background for visual separation
- **Contact**: `gray-50` - Form section with consistent styling

This component centralizes section styling and ensures consistent spacing throughout the application while providing flexibility for different content types.
