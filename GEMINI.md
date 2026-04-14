# Gemini Context: Jaybhim Affirma

This project is a digital art showcase and portfolio for visual artist Sumit Sute, built with modern web technologies to create an interactive and experiential narrative.

## Project Overview

- **Purpose**: A documentary/art portfolio showcasing photography, politics, and digital expression.
- **Tech Stack**:
    - **Framework**: Next.js 15.5.8 (App Router)
    - **UI**: React 19, Tailwind CSS, shadcn/ui (Radix UI)
    - **Backend**: Supabase (Auth, Database for likes/comments)
    - **Animation**: Framer Motion, Motion
    - **Notifications**: Grammy (Telegram Bot API)
    - **Specialty**: `react-pageflip` and `turn.js` for photobook experiences.
- **Architecture**: Follows a strict 3-layer architecture as documented in `ARCHITECTURE.md`.

## Building and Running

- **Development**: `npm run dev` (uses Turbopack by default)
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`

## Project Structure & Layers

The codebase is organized into three primary layers:

1.  **App Layer (`src/app/`)**: Handles routing, API routes, and app-level context.
    - `(pages)/`: Feature-based route groups (e.g., `home-photobook`, `fathers-and-figures`).
    - `api/`: Backend functionality for likes, comments, visit, and analytics.
2.  **Shared Components Layer (`src/components/`)**:
    - `ui/`: shadcn/ui primitive components (base UI elements).
    - `features/`: Complete, self-contained feature modules (e.g., `header`, `likes`, `comments`).
    - `vendor/`: Third-party UI wrappers (e.g., Aceternity UI).
3.  **Infrastructure Layer (`src/lib/`, `src/hooks/`, etc.)**:
    - `lib/`: Business logic, services (Auth, Comments, Likes, Notifications, Visit), and Supabase clients.
    - `hooks/`: Global and feature-specific React hooks.
    - `types/`: TypeScript definitions.
    - `utils/`: Pure utility functions.

## Development Conventions

- **Surgical Updates**: Prefer targeted edits. Follow the established 3-layer architecture when adding new features.
- **Styling**:
    - Use Tailwind CSS utility classes.
    - Leverage custom CSS variables defined in `src/app/globals.css` (e.g., `--primary-blue`, `--primary-white`).
    - Utilize established utility classes for consistent UI (e.g., `.glass-hover`, `.card-shadow`, `.button-style`).
- **Components**:
    - Place new feature-specific components in `src/components/features/[feature-name]/`.
    - Use barrel files (`index.ts`) for clean imports.
    - UI primitives go into `src/components/ui/`.
- **Interactivity**:
    - Animations should use `framer-motion`.
    - Interactive elements that require authentication or specific actions should use the `ProtectedActionDrawer` wrapper.
- **Data Fetching**: Use Supabase services located in `src/lib/` for database interactions.

## Key Files for Reference

- `ARCHITECTURE.md`: Detailed architectural guidelines and migration history.
- `package.json`: Dependency list and scripts.
- `src/app/globals.css`: Global styles, brand colors, and custom utility classes.
- `src/lib/supabase/client.ts`: Supabase client configuration.
- `src/components/features/index.ts`: Main entry point for shared feature components.
