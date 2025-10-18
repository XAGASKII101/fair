# FairMonie Pay - Financial Services Platform

## Overview

FairMonie Pay is a React-based financial services web application that provides users with digital financial services including airtime/data purchases, TV subscriptions, betting wallet funding, loan applications, and peer-to-peer money transfers. The platform features a referral program, bonus claiming system, and integrated payment processing.

The application is built as a single-page application (SPA) using modern React patterns with TypeScript, focusing on mobile-first responsive design and user-friendly financial transactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18.3+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Single-page application (SPA) pattern with React Router for client-side routing
- Component-based architecture with functional components and React Hooks

**UI Component System**
- Radix UI primitives (@radix-ui/*) for accessible, unstyled component foundations
- shadcn/ui component library for pre-built, customizable UI components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS-in-JS approach using Tailwind's CSS variables for theming
- Custom green color scheme (--fairmonie-green: 142 76% 36%) as primary brand color

**State Management**
- TanStack React Query v5 for server state management and caching
- Local React state (useState, useReducer) for component-level state
- localStorage for client-side persistence of user sessions, referral data, and transaction history
- No global state management library (Redux/Zustand) - relies on prop drilling and localStorage

**Form Handling**
- React Hook Form with @hookform/resolvers for form state management
- Zod validation schema resolution (implied by resolver usage)
- Custom Input components wrapping native HTML inputs

**Routing Strategy**
- React Router DOM for client-side routing
- Minimal route structure: Index page (/) and NotFound catch-all (*)
- Authentication handled at component level rather than route guards
- Conditional rendering based on user authentication state

### Data Storage Solutions

**Client-Side Storage**
- localStorage as primary data persistence layer
- User session data: `currentUser` key stores { name, email }
- Referral tracking: `referralData_{email}`, `pendingReferrals_{code}`, `userReferralCode_{email}`
- Transaction history stored per user session
- Last bonus claim timestamp: `lastBonusClaim` for 3-day claim cooldown

**No Backend Database**
- Application currently operates entirely client-side
- No server-side database integration
- All data persists only in browser localStorage
- Transactions are simulated with setTimeout delays

### Authentication & Authorization

**Authentication Pattern**
- Custom email/password authentication system (no third-party auth provider)
- Client-side only validation - no backend verification
- Session persistence via localStorage
- Auto-login on page refresh if `currentUser` exists in localStorage
- No JWT tokens or secure session management
- Logout simply clears localStorage

**Authorization**
- No role-based access control (RBAC)
- Single user type with full feature access
- Feature gating based on "faircode" validation (hardcoded: 'F-187377')
- Balance-based restrictions for withdrawals and purchases

### External Dependencies

**Third-Party UI Libraries**
- Radix UI component primitives (dialogs, dropdowns, tooltips, etc.)
- Lucide React for icon system
- Embla Carousel for image carousels
- html5-qrcode for QR code scanning functionality
- input-otp for OTP input components
- date-fns for date manipulation
- cmdk for command palette patterns

**Payment Processing**
- Manual bank transfer system (no payment gateway integration)
- Hardcoded bank account details for deposits
- Manual transaction confirmation flow
- No real payment processing - simulated with delays

**Communication Channels**
- WhatsApp Web API integration for group invites (chat.whatsapp.com links)
- Telegram links for support (t.me/FAIRMOINIEPAY)
- Email support (mailto: links to fairmoniepay@gmail.com)
- No in-app messaging system

**Media & Assets**
- Lovable image hosting service for banner images and logos
- Image URLs: lovable-uploads/[hash].png format
- No CDN configuration
- No image optimization pipeline

**Browser APIs**
- Web Speech API (speechSynthesis) for text-to-speech announcements
- getUserMedia API for QR code camera access
- Web Audio API for success sound effects
- LocalStorage API for data persistence

**External Links & Integrations**
- YouTube embed for tutorial videos
- App download link: median.co/share/aajxwj#apk (Android APK)
- Referral sharing via WhatsApp Web API
- No analytics or tracking integrations visible

**Development Tools**
- ESLint with TypeScript plugin for code linting
- Lovable component tagger for development mode
- PostCSS with Autoprefixer for CSS processing
- No testing framework configured (no Jest, Vitest, etc.)

**Design System**
- HSL-based color system with CSS custom properties
- Responsive breakpoint: 768px (mobile-first)
- Custom gradient utilities (gradient-green, gradient-green-light)
- No design token management system beyond Tailwind config

### Key Architectural Decisions

**Monolithic Frontend**
- Rationale: Simplified deployment and no backend infrastructure needed
- Trade-off: Limited scalability, no real-time data, security concerns with client-side only validation

**localStorage as Database**
- Rationale: No backend required, instant persistence
- Trade-off: Data loss on cache clear, no data portability, limited storage (~5-10MB)

**Simulated Transactions**
- Rationale: Prototype/demo functionality without payment provider integration
- Trade-off: Not production-ready, requires full rebuild for real transactions

**Component Co-location**
- Rationale: All components in src/components/ for easy discovery
- Structure: Flat component hierarchy with subdirectories for related components (loan/, ui/)

**Hardcoded Business Logic**
- Faircode validation, bank details, referral amounts all hardcoded
- Rationale: Simplified development, no configuration management needed
- Trade-off: Requires code changes for business rule updates

**Mobile-First Design**
- Primary target is mobile web users
- Desktop experience is secondary
- Touch-friendly UI elements and larger tap targets