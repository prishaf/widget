# Floating Accessibility Widget
A comprehensive, customizable floating accessibility widget that helps users personalize their browsing experience for better accessibility. Built with React, Next.js, and Tailwind CSS.

## Features
Visual Adjustments
Contrast+: Increase color contrast by 120%
Highlight Links: Emphasize hyperlinks with borders and backgrounds
Text Size: Adjustable font size from 50% to 200%
Text Spacing: Modify letter spacing and line height

## Behavior Controls
Pause Animations: Stop all CSS/JS animations and transitions
Hide Images: Toggle image visibility
Dyslexia-Friendly Font: Switch to Lexend font with improved readability

## Interface Tools
Large Cursor: Enlarge pointer for better visibility
Show Tooltips: Force visible alt-text and tooltips
Page Structure: Show heading outlines (H1, H2, etc.)

## Additional Features
Persistent Settings: All preferences saved to localStorage
Real-time Preview: Changes apply immediately
Reset Function: One-click reset to default settings
Responsive Design: Works on all screen sizes
WCAG 2.1 Compliant: Follows accessibility standards

## Project Structure
accessibility-widget/
├── app/
│   ├── globals.css              # Global styles and custom animations
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Demo page with animations
│   └── accessibility-statement/
│       └── page.tsx             # Accessibility statement page
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── accessibility-widget.tsx # Main widget component
├── public/                      # Static assets
├── README.md
├── package.json
├── tailwind.config.ts
└── tsconfig.json

## Styling:
The widget uses Tailwind CSS classes.

# Implementation Choices Explained

Here's a detailed breakdown of the key implementation decisions made for the accessibility widget and the reasoning behind each choice:

## Architecture & Framework Choices

### 1. **React + Next.js App Router**

**Choice**: Built with React functional components using Next.js 13+ App Router
**Reasoning**:

- **Modern React Patterns**: Uses hooks (useState, useEffect) for clean state management
- **Server-Side Rendering**: Next.js provides better SEO and initial load performance
- **File-based Routing**: App Router simplifies navigation structure
- **Built-in Optimization**: Automatic code splitting and performance optimizations


### 2. **TypeScript**

**Choice**: Full TypeScript implementation with strict typing
**Reasoning**:

- **Type Safety**: Prevents runtime errors with compile-time checking
- **Better DX**: Enhanced IDE support with autocomplete and refactoring
- **Interface Definitions**: Clear contracts for settings and component props
- **Maintainability**: Easier to refactor and extend functionality


## State Management

### 3. **Local State with useState**

**Choice**: React's built-in useState instead of external state management
**Reasoning**:

- **Simplicity**: Widget is self-contained with minimal state complexity
- **Performance**: No unnecessary re-renders or state subscriptions
- **Bundle Size**: Avoids additional dependencies like Redux or Zustand
- **Isolation**: Widget state doesn't interfere with parent application


### 4. **localStorage for Persistence**

**Choice**: Browser's localStorage API for saving user preferences
**Reasoning**:

- **No Backend Required**: Works without server-side storage
- **Instant Persistence**: Settings survive page refreshes and browser sessions
- **Privacy-Friendly**: Data stays on user's device
- **Simple API**: Easy to implement and debug


## UI/UX Design Decisions

### 5. **Floating Button + Expandable Panel**

**Choice**: Bottom-right floating button that opens a modal-like panel
**Reasoning**:

- **Non-Intrusive**: Doesn't interfere with existing page layout
- **Familiar Pattern**: Users expect accessibility widgets in bottom corners
- **Mobile-Friendly**: Works well on small screens
- **Always Accessible**: Available on every page without navigation


### 6. **Collapsible Sections**

**Choice**: Organized features into collapsible Visual/Behavior/Interface sections
**Reasoning**:

- **Reduced Cognitive Load**: Groups related features together
- **Progressive Disclosure**: Users see only what they need
- **Space Efficiency**: Fits more features in limited screen space
- **Logical Organization**: Matches how users think about accessibility needs


### 7. **Real-time Preview**

**Choice**: Changes apply immediately without "Apply" button
**Reasoning**:

- **Instant Feedback**: Users see results immediately
- **Better UX**: No extra clicks required
- **Experimentation-Friendly**: Easy to try different settings
- **Accessibility Standard**: Follows WCAG guidelines for immediate feedback


## Technical Implementation

### 8. **CSS Injection Strategy**

**Choice**: Dynamic `<style>` element injection instead of CSS classes
**Reasoning**:

- **Global Application**: Affects entire page regardless of existing CSS
- **High Specificity**: Uses `!important` to override existing styles
- **Runtime Flexibility**: Can generate CSS based on user settings
- **Clean Removal**: Easy to remove styles when features are disabled


### 9. **CSS Selectors with Exclusions**

**Choice**: `:not([data-accessibility-widget])` selectors for animation pausing
**Reasoning**:

- **Widget Protection**: Prevents breaking the widget's own functionality
- **Surgical Precision**: Only affects page content, not the accessibility controls
- **Maintainable**: Clear separation between widget and page styles
- **Robust**: Works even with complex nested structures


### 10. **Font Loading Strategy**

**Choice**: Google Fonts CDN with fallback fonts for dyslexia feature
**Reasoning**:

- **Reliability**: Google Fonts has excellent uptime and global CDN
- **Performance**: Fonts are cached across sites
- **Fallback Chain**: `"Lexend", "Comic Sans MS", "Trebuchet MS", Verdana` ensures something loads
- **Accessibility**: All fonts in chain are dyslexia-friendly


## Component Architecture

### 11. **Single Component File**

**Choice**: All widget functionality in one `accessibility-widget.tsx` file
**Reasoning**:

- **Easy Integration**: Single file to copy into existing projects
- **Self-Contained**: No complex dependency tree
- **Maintainability**: All related code in one place
- **Portability**: Simple to extract and reuse


### 12. **shadcn/ui Components**

**Choice**: Used pre-built UI components (Button, Switch, Slider, etc.)
**Reasoning**:

- **Accessibility Built-in**: Components follow ARIA standards
- **Consistent Design**: Professional, cohesive appearance
- **Keyboard Navigation**: Full keyboard support out of the box
- **Customizable**: Easy to theme and modify


## Accessibility Implementation

### 13. **ARIA Labels and Semantic HTML**

**Choice**: Comprehensive ARIA labeling and semantic elements
**Reasoning**:

- **Screen Reader Support**: Clear announcements for all interactive elements
- **Keyboard Navigation**: Proper focus management and tab order
- **WCAG Compliance**: Meets Level AA accessibility standards
- **Future-Proof**: Works with assistive technologies


### 14. **Animation Pausing Strategy**

**Choice**: Comprehensive CSS override approach for stopping animations
**Reasoning**:

- **Medical Necessity**: Critical for users with vestibular disorders
- **Complete Coverage**: Stops all types of animations (CSS, transitions, transforms)
- **Immediate Effect**: No delay in stopping motion
- **Reversible**: Clean removal when disabled


### 15. **High Contrast Implementation**

**Choice**: CSS filter approach rather than custom color schemes
**Reasoning**:

- **Universal Application**: Works with any existing design
- **No Theme Dependency**: Doesn't require predefined color schemes
- **Immediate Effect**: Single CSS property change
- **Predictable Results**: Consistent contrast improvement


## Performance Considerations

### 16. **Lazy Loading and Code Splitting**

**Choice**: Component only loads when needed, minimal initial bundle
**Reasoning**:

- **Performance**: Doesn't slow down initial page load
- **Progressive Enhancement**: Page works without the widget
- **Bundle Optimization**: Only loads required dependencies
- **Memory Efficient**: Cleans up resources when not in use


### 17. **Event Delegation**

**Choice**: Single event listeners with efficient state updates
**Reasoning**:

- **Performance**: Minimal DOM manipulation
- **Memory Management**: Prevents memory leaks
- **Smooth Interactions**: No lag in user interactions
- **Battery Friendly**: Efficient for mobile devices


## Security & Privacy

### 18. **No External Data Collection**

**Choice**: All data stays in user's browser localStorage
**Reasoning**:

- **Privacy First**: No tracking or data transmission
- **GDPR Compliant**: No personal data processing
- **User Control**: Users can clear their own data
- **Trust Building**: Transparent about data handling


### 19. **CSP-Friendly Implementation**

**Choice**: Inline styles with nonce support capability
**Reasoning**:

- **Security**: Compatible with Content Security Policy
- **Enterprise Ready**: Works in strict security environments
- **Future-Proof**: Can be adapted for stricter CSP requirements
- **Best Practices**: Follows modern web security standards


## Extensibility & Maintenance

### 20. **Configuration Object Pattern**

**Choice**: Centralized `defaultSettings` object for all features
**Reasoning**:

- **Easy Customization**: Single place to modify default behavior
- **Type Safety**: TypeScript interface ensures consistency
- **Extensible**: Easy to add new features
- **Maintainable**: Clear structure for future developers

<img width="1871" height="852" alt="Screenshot 2025-07-26 212416" src="https://github.com/user-attachments/assets/3e17fe8a-abfb-48ab-9400-719a34fffdca" />
<img width="1859" height="850" alt="Screenshot 2025-07-26 212409" src="https://github.com/user-attachments/assets/42b61f26-c85e-4d4b-ae68-b54d58214ab8" />
<img width="1880" height="833" alt="Screenshot 2025-07-26 212400" src="https://github.com/user-attachments/assets/b44b739d-2683-43e3-a8b0-fbf1952f14c5" />
<img width="1896" height="860" alt="Screenshot 2025-07-26 212349" src="https://github.com/user-attachments/assets/32c6eadc-15c0-4802-90fc-5ff7b6d2d19a" />
<img width="1890" height="869" alt="Screenshot 2025-07-26 212341" src="https://github.com/user-attachments/assets/29487cd4-5236-427c-bf6e-a3d1bec93790" />
<img width="1893" height="857" alt="Screenshot 2025-07-26 212319" src="https://github.com/user-attachments/assets/cd970508-5398-4b8f-ba22-b920bc3bacdc" />
<img width="1887" height="867" alt="Screenshot 2025-07-26 212309" src="https://github.com/user-attachments/assets/3ce0c6dd-25c1-4d2b-8a45-55124c5a728d" />
