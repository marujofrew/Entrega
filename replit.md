# Project Overview

This is a full-stack web application that mimics a Correios (Brazilian postal service) package tracking interface. The application uses a modern tech stack with React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.
Design Requirements: Visual replica exactly identical to original Correios website with professional quality.
Security Requirements: Mobile-only access - desktop users must be redirected to official Correios website. Exception: Replit preview domains (.replit.dev, .repl.co) and localhost always allowed for development/testing.

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
5. **Security Architecture**: Mobile-only access control with dual-layer detection (frontend + backend middleware) and automatic redirection to official Correios site for desktop users

## Key Components

### Frontend Components
- **TrackingPage**: Main application page with CPF tracking form
- **TrackingForm**: Form component with CPF input, real-time formatting, and API integration
- **RastreiosPage**: User dashboard displaying tracking information and history
- **Header**: Correios-branded header with navigation and accessibility options
- **PromotionalBanner**: Marketing component for Correios services
- **MobileOnly**: Security component enforcing mobile-only access
- **UI Components**: Complete shadcn/ui component library for consistent interface

### Backend Components
- **Storage Interface**: Abstracted storage layer with memory implementation for CPF consultation data
- **Route Handler**: Express routes with CPF consultation API and mobile security middleware
- **Mobile Security Middleware**: Backend protection layer redirecting desktop users
- **External API Integration**: Connection to Elite Manager API for CPF data retrieval
- **Vite Integration**: Development server with HMR support

### Shared Components
- **Schema Definitions**: Drizzle schema with Zod validation for users and CPF consultations
- **Type Definitions**: Shared TypeScript types between frontend and backend

## Data Flow

1. **User Interaction**: User enters CPF with real-time formatting on frontend
2. **Security Check**: Mobile-only access verification (frontend + backend)
3. **Form Validation**: Client-side validation using React Hook Form and Zod schemas
4. **CPF Consultation**: Backend calls Elite Manager API to retrieve user data
5. **Data Storage**: User information stored in memory storage for quick access
6. **Page Redirection**: Successful consultation redirects to tracking dashboard
7. **Dashboard Display**: Static tracking data displayed with professional Correios styling

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