# Project Overview

This is a full-stack web application that mimics a Correios (Brazilian postal service) package tracking interface. The application uses a modern tech stack with React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.
Design Requirements: Visual replica exactly identical to original Correios website with professional quality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Correios branding (blue color scheme)
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with React plugin
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: tsx for TypeScript execution

### Key Design Decisions

1. **Monorepo Structure**: Single repository with separate client, server, and shared directories for better code organization and type sharing
2. **Type Safety**: Full TypeScript implementation across frontend and backend with shared schema definitions
3. **Component Architecture**: shadcn/ui for consistent, accessible UI components with Tailwind CSS for styling
4. **Database Strategy**: Drizzle ORM chosen for type-safe database operations with PostgreSQL for production reliability

## Key Components

### Frontend Components
- **TrackingPage**: Main application page with tracking form
- **TrackingForm**: Form component with tracking code input and CAPTCHA validation
- **Header**: Correios-branded header with navigation and accessibility options
- **PromotionalBanner**: Marketing component for Correios services
- **UI Components**: Complete shadcn/ui component library for consistent interface

### Backend Components
- **Storage Interface**: Abstracted storage layer with memory implementation for development
- **Route Handler**: Express route registration system (currently minimal)
- **Vite Integration**: Development server with HMR support

### Shared Components
- **Schema Definitions**: Drizzle schema with Zod validation for users table
- **Type Definitions**: Shared TypeScript types between frontend and backend

## Data Flow

1. **User Interaction**: User enters tracking code and completes CAPTCHA on frontend
2. **Form Validation**: Client-side validation using React Hook Form and Zod schemas
3. **API Communication**: TanStack Query manages HTTP requests to Express backend
4. **Data Processing**: Backend processes requests using storage interface
5. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
6. **Response Handling**: Results returned through the same pipeline in reverse

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon Database
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **@radix-ui/***: Headless UI component primitives
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation utilities

### Development Dependencies
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Migration**: Drizzle Kit handles schema migrations

### Environment Configuration
- **Development**: tsx runs TypeScript directly with Vite middleware
- **Production**: Compiled JavaScript served with static file serving
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Key Configuration Files
- **drizzle.config.ts**: Database configuration and migration settings
- **vite.config.ts**: Frontend build and development configuration
- **tsconfig.json**: TypeScript compilation settings for monorepo
- **tailwind.config.ts**: CSS framework configuration with Correios theming

The application is designed for easy deployment on platforms like Replit, with proper environment variable management and build processes for both development and production environments.