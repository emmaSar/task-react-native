# Development Guide

This project uses ESLint and Prettier for code quality and formatting.

## Setup

### Prerequisites

- Node.js >= 18
- VS Code (recommended)
- VS Code Extensions:
  - ESLint
  - Prettier - Code formatter
  - TypeScript and JavaScript Language Features

### Installation

```bash
# Install dependencies
npm install

# Install additional ESLint plugins (if needed)
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native
```

## Available Scripts

### Linting

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting errors
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check
```

## VS Code Integration

The project includes VS Code settings that automatically:

- Format code on save using Prettier
- Fix ESLint errors on save
- Organize imports on save
- Validate TypeScript and JavaScript files

## Configuration Files

### ESLint (.eslintrc.js)

- Extends React Native and TypeScript configurations
- Includes React Hooks rules
- Enforces consistent code style
- Integrates with Prettier

### Prettier (.prettierrc.js)

- 80 character line width
- 2 spaces indentation
- Single quotes
- Trailing commas
- Semicolons

### Prettier Ignore (.prettierignore)

- Excludes build files, dependencies, and generated files
- Protects important configuration files

## Code Style Rules

### General

- Use `const` instead of `let` when possible
- Use arrow functions for components
- Use template literals instead of string concatenation
- Use object shorthand notation
- Always use semicolons
- Use single quotes for strings

### React/React Native

- Use functional components with hooks
- Use React.memo for performance optimization
- Use useCallback and useMemo where appropriate
- Avoid inline styles
- Use the Colors config for all colors
- Use semantic props for components (e.g., `primary` instead of `variant="primary"`)

### TypeScript

- Use proper typing for all props and state
- Avoid `any` type when possible
- Use interfaces for component props
- Use type inference when types are obvious

## Best Practices

1. **Performance Optimization**

   - Use React.memo for components that don't need frequent re-renders
   - Use useCallback for event handlers passed to child components
   - Use useMemo for expensive calculations

2. **Code Organization**

   - Keep components small and focused
   - Extract reusable logic into custom hooks
   - Use consistent file naming (PascalCase for components)

3. **Error Handling**

   - Use try-catch blocks for async operations
   - Provide meaningful error messages
   - Use error boundaries for component errors

4. **Testing**
   - Write unit tests for utility functions
   - Write integration tests for critical user flows
   - Use meaningful test descriptions

## Troubleshooting

### Common Issues

1. **ESLint not working in VS Code**

   - Make sure ESLint extension is installed
   - Restart VS Code
   - Check if ESLint is enabled for the workspace

2. **Prettier conflicts with ESLint**

   - The configuration includes `eslint-config-prettier` to disable conflicting rules
   - Make sure both extensions are installed and enabled

3. **TypeScript errors**
   - Run `npm run lint` to see all TypeScript errors
   - Use `npm run lint:fix` to auto-fix some issues
   - Check the TypeScript configuration in `tsconfig.json`

### Getting Help

- Check the ESLint and Prettier documentation
- Review the configuration files in this project
- Ask the team for guidance on specific rules
