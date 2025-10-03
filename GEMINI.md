# GEMINI.md

## Project Overview

This project is a web-based Arabic screenplay editor built with React, Vite, and TypeScript. It provides a rich text editing experience tailored for writing screenplays in Arabic, with features like automatic formatting, character and dialogue detection, and AI-powered assistance. The application is styled with Tailwind CSS and includes a dark mode theme.

The project is structured with a clear separation of concerns, with components for the editor, home page, and various other pages. It uses `vitest` for testing and `eslint` for linting.

## Building and Running

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5177`.

### Building

To build the application for production:

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Testing

To run the tests:

```bash
npm run test
```

To run the tests with a UI:

```bash
npm run test:ui
```

To run the tests with coverage:

```bash
npm run test:coverage
```

### Linting

To lint the codebase:

```bash
npm run lint
```

To fix linting errors:

```bash
npm run lint:fix
```

## Development Conventions

### Coding Style

The project follows the standard TypeScript and React coding conventions. It uses ESLint to enforce a consistent coding style.

### Testing

The project uses `vitest` for unit and component testing. Tests are located in the `src` directory, alongside the files they test.

### Contribution Guidelines

There are no explicit contribution guidelines in the project. However, it is recommended to follow the existing coding style and to add tests for any new features or bug fixes.
