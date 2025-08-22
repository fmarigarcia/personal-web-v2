# Section Component

A reusable wrapper component for page sections that ensures proper spacing and fills the viewport correctly accounting for the fixed navigation header.

## Features

- **Automatic navbar offset**: Accounts for the fixed header height using `SCROLL_OFFSET` constant
- **Full viewport height**: Option to make sections fill the entire viewport
- **Predefined backgrounds**: White, gray-50, or gradient backgrounds
- **Flexible content**: Accepts any React children
- **Responsive padding**: Consistent horizontal padding and responsive vertical spacing

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
- **Top padding**: `${SCROLL_OFFSET}px` - accounts for fixed navbar
- **Bottom padding**: `0px` - content determines height
- **Content wrapper**: `min-h-screen flex flex-col justify-center py-20`

### Regular Sections (`fullHeight={false}`)

- **Height**: Content-driven (no min-height)
- **Top padding**: `0px` - no navbar offset needed
- **Bottom padding**: `5rem` - consistent section spacing
- **Content wrapper**: `py-20` - standard section padding

## Implementation Notes

1. **Navbar Integration**: Uses `SCROLL_OFFSET` constant (80px) from utils to account for fixed header
2. **Responsive Design**: Includes `px-6` for horizontal padding on all screen sizes
3. **Content Flow**: Regular sections stack naturally, full-height sections fill viewport
4. **TypeScript**: Fully typed with comprehensive interface

## Current Usage in Project

- **Hero**: `fullHeight + gradient` - Landing section that fills viewport
- **About**: `white` - Content section with standard padding
- **Experience**: `gray-50` - Alternating background for visual separation
- **Contact**: `gray-50` - Form section with consistent styling

This component centralizes section styling and ensures consistent spacing throughout the application while providing flexibility for different content types.
