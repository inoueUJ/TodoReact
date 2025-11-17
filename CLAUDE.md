# CLAUDE.md - AI Assistant Guide for TodoReact

**Last Updated:** 2025-11-17
**Project:** TodoReact
**Type:** React + Vite Application

## Project Overview

TodoReact is a modern React application bootstrapped with Vite. Currently, it's a starter template with a basic counter component, positioned to be developed into a full-featured todo application.

### Technology Stack

- **Framework:** React 18.2.0
- **Build Tool:** Vite 4.3.2
- **Language:** JavaScript (JSX)
- **Package Manager:** npm
- **Code Quality:** ESLint
- **React Features:** Hooks, StrictMode, Fast Refresh

## Project Structure

```
TodoReact/
├── public/              # Static assets served directly
│   └── vite.svg        # Vite logo
├── src/                # Source code
│   ├── assets/         # Asset files (images, etc.)
│   │   └── react.svg   # React logo
│   ├── App.css         # Component-specific styles
│   ├── App.jsx         # Main App component
│   ├── index.css       # Global styles
│   └── main.jsx        # Application entry point
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore rules
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Locked dependency versions
└── vite.config.js      # Vite configuration
```

## Key Files and Their Purposes

### Entry Points

- **`index.html`** (line 11): Mounts the React app via `src/main.jsx`
- **`src/main.jsx`** (lines 6-10): Creates React root and renders `<App />` in StrictMode
- **`src/App.jsx`**: Main application component (currently a counter demo)

### Configuration Files

- **`vite.config.js`**: Minimal Vite config with React plugin
- **`.eslintrc.cjs`**: ESLint rules for React development
  - Extends: `eslint:recommended`, `plugin:react/recommended`, `plugin:react/jsx-runtime`, `plugin:react-hooks/recommended`
  - Uses React 18.2 settings
  - Includes `react-refresh` plugin for HMR

- **`package.json`**: Defines 4 scripts:
  - `dev`: Start development server
  - `build`: Production build
  - `lint`: Run ESLint on src directory
  - `preview`: Preview production build

### Styling

- **`src/index.css`**: Global styles with light/dark theme support
  - Uses CSS custom properties
  - Responsive color scheme based on user preference
  - Base styles for typography and layout

- **`src/App.css`**: Component-specific styles
  - Logo animations
  - Card layouts
  - Responsive design considerations

## Development Workflows

### Getting Started

```bash
# Install dependencies
npm install

# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Server

- Vite dev server runs with Hot Module Replacement (HMR)
- Changes to JSX files trigger fast refresh without losing state
- Default port: Check console output from `npm run dev`

### Code Quality

- ESLint is configured with React-specific rules
- Max warnings set to 0 (strict mode)
- Run linting before committing: `npm run lint`

## Code Conventions

### React Patterns

1. **Functional Components:** Use function declarations with hooks
   ```jsx
   function ComponentName() {
     const [state, setState] = useState(initialValue)
     return <div>...</div>
   }
   export default ComponentName
   ```

2. **Imports:** Follow this order
   - React imports
   - Third-party libraries
   - Local components
   - Assets
   - Styles

3. **Hooks:** Current usage in App.jsx:
   - `useState` for state management
   - Follow React Hooks rules (enforced by ESLint)

4. **JSX:**
   - Use fragments (`<>...</>`) to avoid unnecessary wrapper divs
   - Component files use `.jsx` extension
   - Self-closing tags for components without children

### File Naming

- Components: PascalCase (e.g., `App.jsx`)
- Styles: kebab-case or match component name (e.g., `App.css`, `index.css`)
- Assets: kebab-case (e.g., `react.svg`)

### Code Style

- Modern ES6+ JavaScript syntax
- Arrow functions for inline callbacks
- Destructuring where appropriate
- ESLint enforces consistent style

## Git Workflow

### Current Branch Structure

- **Active Branch:** `claude/claude-md-mi2elu2r3ctdnq7o-01H7cz1gPk5tZwk5NX7MT1e7`
- **Initial Commit:** `ff40027` - "firstCommit"

### Branch Naming Convention

- Claude AI branches follow pattern: `claude/claude-md-{identifier}-{session-id}`
- Always develop on designated feature branches
- Never push to unintended branches without permission

### Git Ignore

The following are ignored (see `.gitignore`):
- `node_modules/` - Dependencies
- `dist/`, `dist-ssr/` - Build outputs
- `*.local` - Local environment files
- Log files
- Editor-specific files (except `.vscode/extensions.json`)

## AI Assistant Guidelines

### When Working on This Codebase

1. **Before Making Changes:**
   - Read relevant source files to understand current implementation
   - Check `package.json` for available scripts and dependencies
   - Review ESLint config to understand code quality standards

2. **Development Practices:**
   - Always run `npm run lint` before committing
   - Test changes with `npm run dev` to ensure HMR works
   - Verify production builds with `npm run build` and `npm run preview`
   - Maintain existing code style and conventions

3. **Component Development:**
   - Place new components in `src/` directory
   - Create corresponding CSS files if needed
   - Import and use in `App.jsx` or create new component hierarchy
   - Follow functional component + hooks pattern
   - Export components as default exports

4. **State Management:**
   - Currently using React hooks (`useState`)
   - No global state management library installed
   - Consider adding Context API or state library for complex features

5. **Styling Approach:**
   - CSS modules or component-scoped CSS files
   - Global styles in `index.css`
   - Maintains light/dark theme support
   - Responsive design considerations

6. **Common Gotchas:**
   - Vite uses ES modules (`"type": "module"` in package.json)
   - ESLint config uses CommonJS (`.eslintrc.cjs`)
   - React 18 features available (Suspense, transitions, etc.)
   - StrictMode is enabled (components mount twice in dev)

### Testing Changes

Since no testing framework is currently installed:
- Manual testing via dev server is primary method
- Consider adding Vitest or Jest for unit tests
- Consider adding React Testing Library for component tests

### Adding Dependencies

```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name
```

Common packages you might add:
- State: `redux`, `zustand`, `jotai`
- Routing: `react-router-dom`
- Forms: `react-hook-form`, `formik`
- UI: `tailwindcss`, `styled-components`, `mui`
- Testing: `vitest`, `@testing-library/react`

### Performance Considerations

- Vite provides fast HMR and optimized builds
- Use React.memo() for expensive components
- Lazy load components with React.lazy() + Suspense
- Code splitting is handled by Vite automatically

## Future Development Paths

Given the project name "TodoReact", likely development directions:

1. **Todo Application Features:**
   - Create TodoList component
   - Implement add/delete/edit functionality
   - Add filtering (all/active/completed)
   - LocalStorage persistence
   - Task prioritization

2. **Architecture Enhancements:**
   - Add routing for multi-page views
   - Implement state management solution
   - Add testing framework
   - Set up CI/CD pipeline

3. **UI/UX Improvements:**
   - Design system or component library
   - Animations and transitions
   - Accessibility improvements
   - Mobile-first responsive design

## Quick Reference

### Project Commands
| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Key Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | React DOM rendering |
| vite | ^4.3.2 | Build tool & dev server |
| @vitejs/plugin-react | ^4.0.0 | React support for Vite |
| eslint | ^8.38.0 | Code quality tool |

### File Path Patterns
- Components: `src/**/*.jsx`
- Styles: `src/**/*.css`
- Assets: `src/assets/*`
- Public files: `public/*`

## Troubleshooting

### Common Issues

1. **Module not found:**
   - Run `npm install` to ensure dependencies are installed
   - Check import paths are correct (Vite uses `/` for public folder)

2. **ESLint errors:**
   - Check `.eslintrc.cjs` for rule configuration
   - Run `npm run lint` to see all issues
   - Fix or disable specific rules if needed

3. **HMR not working:**
   - Ensure files are in `src/` directory
   - Check component exports are correct
   - Restart dev server if needed

4. **Build failures:**
   - Check for console errors during build
   - Ensure all imports are valid
   - Verify no TypeScript errors (type checking on dev dependencies)

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [React Hooks](https://react.dev/reference/react)

---

**Note for AI Assistants:** This document should be updated whenever significant architectural changes are made, new conventions are established, or major dependencies are added. Keep it current to maintain its usefulness.
