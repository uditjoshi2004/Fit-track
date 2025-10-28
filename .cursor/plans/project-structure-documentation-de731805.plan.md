<!-- de731805-372e-471e-bf27-214c3d14faae e5ee593e-a468-4f9d-988f-449d177bae5e -->
# Fit-Track Project Structure Documentation

## Overview

Create a detailed markdown document that maps out the entire project structure with descriptions of each component's purpose and relationships.

## Project Architecture

### High-Level Structure

```
Fit-track/
├── fit-track/           # Angular 20 Frontend Application
├── fit-track-api/       # Node.js/Express Backend API
└── README.md           # Project documentation
```

### Technology Stack

**Frontend (fit-track/):**

- Framework: Angular 20 (standalone components)
- Styling: Tailwind CSS
- UI Components: Lucide Angular icons
- Charts: Chart.js + ng2-charts
- HTTP: Angular HttpClient with interceptors
- State: Angular Signals
- Key Libraries: ngx-daterangepicker, ngx-image-cropper, html2canvas, jspdf

**Backend (fit-track-api/):**

- Runtime: Node.js
- Framework: Express 5
- Database: MongoDB (Mongoose ODM)
- Authentication: JWT + bcryptjs
- External APIs: Google Fit API (OAuth2)
- AI: Google Generative AI (Gemini)
- File Upload: Cloudinary + Multer
- Email: Nodemailer
- 2FA: Speakeasy + QRCode
- Scheduling: node-cron

## Detailed Structure

### Frontend (fit-track/)

```
fit-track/
├── src/
│   ├── app/
│   │   ├── app.config.ts          # App configuration, providers, interceptors
│   │   ├── app.routes.ts          # Main routing configuration
│   │   ├── app.ts/html/css        # Root app component
│   │   │
│   │   ├── auth/                  # Authentication Module
│   │   │   ├── auth-guard.ts      # Protected route guard
│   │   │   ├── auth-interceptor.ts # JWT token interceptor
│   │   │   ├── public-guard.ts    # Guest-only route guard
│   │   │   ├── auth-layout/       # Auth pages wrapper layout
│   │   │   └── pages/
│   │   │       ├── login/         # Login page
│   │   │       ├── register/      # Registration page
│   │   │       ├── unified-auth/  # Combined login/register
│   │   │       ├── forgot-password/ # Password reset request
│   │   │       └── reset-password/  # Password reset form
│   │   │
│   │   ├── layout/                # Application Layouts
│   │   │   ├── auth/              # Auth layout (for login/register)
│   │   │   ├── main/              # Main app layout (with sidebar/header)
│   │   │   ├── header/            # Top navigation bar
│   │   │   └── sidebar/           # Side navigation menu
│   │   │
│   │   ├── components/            # Reusable Components
│   │   │   ├── dashboard/         # Main dashboard (KPIs, charts)
│   │   │   ├── profile/           # User profile management
│   │   │   ├── settings/          # App settings (goals, Google Fit)
│   │   │   ├── avatar-crop-modal/ # Image cropping modal
│   │   │   ├── bmi-display/       # BMI info card
│   │   │   ├── body-clock/        # Circadian rhythm visualization
│   │   │   ├── detail-modal/      # Detailed metric view modal
│   │   │   ├── goal-progress-card/# Individual goal card
│   │   │   └── two-factor-auth-modal/ # 2FA setup modal
│   │   │
│   │   ├── pages/                 # Feature Pages
│   │   │   ├── bmi/               # BMI calculator
│   │   │   ├── hydration/         # Water intake tracker
│   │   │   ├── weight-tracking/   # Weight management
│   │   │   ├── reports/           # Analytics & reports
│   │   │   └── google-fit-callback/ # OAuth callback handler
│   │   │
│   │   ├── services/              # Angular Services
│   │   │   ├── auth.service.ts    # Authentication & user management
│   │   │   ├── google-fit.service.ts # Google Fit API integration
│   │   │   ├── fitness-data.service.ts # Fitness data CRUD
│   │   │   ├── achievement.service.ts # Achievements/badges
│   │   │   ├── hydration.service.ts # Hydration tracking
│   │   │   ├── weight.service.ts  # Weight tracking
│   │   │   ├── theme.service.ts   # Dark/light mode
│   │   │   ├── date-state.service.ts # Date selection state
│   │   │   └── filter-state.service.ts # Filter state management
│   │   │
│   │   └── models/                # TypeScript Interfaces
│   │       ├── achievement.model.ts
│   │       ├── fitness-data.model.ts
│   │       ├── hydration.model.ts
│   │       └── weight.model.ts
│   │
│   ├── assets/                    # Static Assets
│   │   ├── google-fit-logo.png
│   │   └── logo.svg
│   │
│   ├── environments/              # Environment Config
│   │   ├── environment.ts         # Development config
│   │   └── environment.prod.ts    # Production config
│   │
│   ├── index.html                 # HTML entry point
│   ├── main.ts                    # Angular bootstrap
│   └── styles.css                 # Global styles
│
├── dist/                          # Build output (ignored)
├── package.json                   # NPM dependencies
├── angular.json                   # Angular CLI config
├── tailwind.config.js             # Tailwind CSS config
└── tsconfig.json                  # TypeScript config
```

### Backend (fit-track-api/)

```
fit-track-api/
├── config/
│   ├── db.js                      # MongoDB connection setup
│   └── achievements.js            # Achievement definitions
│
├── models/                        # Mongoose Models
│   ├── UserModel.js               # User schema (auth, profile, goals)
│   ├── ActivityModel.js           # Fitness activity data
│   ├── WeightEntry.js             # Weight tracking entries
│   └── HydrationEntry.js          # Water intake entries
│
├── controllers/                   # Request Handlers
│   ├── hydrationController.js     # Hydration CRUD logic
│   └── weightController.js        # Weight CRUD logic
│
├── routes/                        # API Route Definitions
│   ├── userRoutes.js              # /api/users/* (auth, profile, goals)
│   ├── activityRoutes.js          # /api/activities/* (fitness data)
│   ├── googleFitRoutes.js         # /api/google-fit/* (OAuth, sync)
│   ├── weightRoutes.js            # /api/weight/* (weight tracking)
│   ├── hydrationRoutes.js         # /api/hydration/* (water intake)
│   ├── achievementRoutes.js       # /api/achievements/* (badges)
│   └── uploadRoutes.js            # /api/upload/* (Cloudinary avatar)
│
├── middleware/
│   └── authMiddleware.js          # JWT verification middleware
│
├── services/
│   ├── achievementService.js      # Achievement evaluation logic
│   └── aiAnalystService.js        # Gemini AI integration (daily briefing)
│
├── utils/
│   ├── generateToken.js           # JWT token generation
│   └── dataSync.js                # Scheduled Google Fit data sync
│
├── seeder/
│   └── seed.js                    # Database seeding script
│
├── index.js                       # Express app entry point
├── package.json                   # NPM dependencies
└── .env                           # Environment variables (not in repo)
```

## Key Architectural Patterns

### Frontend Architecture

1. **Routing Structure:**

   - `/auth/*` - Public routes (login, register) with publicGuard
   - `/app/*` - Protected routes with authGuard
   - Nested layouts (Auth layout vs Main layout)

2. **State Management:**

   - Angular Signals for reactive state
   - Services as state containers (date-state, filter-state)
   - RxJS Observables for async operations

3. **Component Architecture:**

   - Standalone components (Angular 20)
   - Feature-based organization
   - Shared components in `/components`
   - Page components in `/pages`

4. **HTTP Communication:**

   - HttpClient with interceptors
   - Auth interceptor adds JWT to requests
   - Service layer abstracts API calls

### Backend Architecture

1. **API Structure:**

   - RESTful endpoints
   - JWT-based authentication
   - Middleware for auth verification

2. **Data Flow:**

   - Routes → Controllers → Models
   - Services for business logic
   - Middleware for cross-cutting concerns

3. **External Integrations:**

   - Google Fit OAuth2 flow
   - Gemini AI for insights
   - Cloudinary for image storage
   - Nodemailer for emails

4. **Scheduled Tasks:**

   - Cron job (3 AM daily) syncs Google Fit data
   - AI briefing generation

## Key Features

1. **Authentication:**

   - Email/password registration & login
   - Google OAuth integration
   - JWT tokens
   - Password reset via email
   - Two-factor authentication (2FA)

2. **Google Fit Integration:**

   - OAuth2 connection flow
   - Daily data sync (steps, calories, active minutes, sleep)
   - Disconnect functionality

3. **Health Tracking:**

   - Dashboard with KPI cards
   - BMI calculator
   - Weight tracking with history
   - Hydration/water intake tracker
   - Activity visualization (charts)

4. **User Features:**

   - Profile management
   - Avatar upload/crop
   - Goal setting
   - Achievement system
   - Dark/light theme toggle

5. **Analytics:**

   - Reports page with date filtering
   - Chart visualizations
   - PDF export
   - AI-powered daily briefing (Gemini)

## API Endpoints Summary

### User Routes (`/api/users`)

- POST `/register` - Create account
- POST `/login` - Authenticate user
- POST `/google-login` - Google OAuth login
- GET `/profile` - Get user profile
- PUT `/profile` - Update profile
- PUT `/change-password` - Change password
- POST `/forgot-password` - Request reset
- POST `/reset-password/:token` - Reset password
- GET `/goals` - Get user goals
- PUT `/goals` - Update goals
- POST `/upload-avatar` - Upload profile picture
- GET `/achievements` - Get user achievements
- POST `/generate-2fa` - Generate 2FA secret
- POST `/verify-2fa` - Verify 2FA code
- POST `/disable-2fa` - Disable 2FA
- GET `/bmi-data` - Get current BMI data

### Google Fit Routes (`/api/google-fit`)

- POST `/connect` - Complete OAuth connection
- POST `/disconnect` - Disconnect Google Fit
- GET `/today` - Get today's fitness data
- GET `/intraday` - Get intraday data (hourly)

### Activity Routes (`/api/activities`)

- GET `/` - Get activities with filters
- GET `/latest` - Get latest activity
- GET `/:id` - Get single activity
- POST `/` - Create activity (manual)
- PUT `/:id` - Update activity
- DELETE `/:id` - Delete activity

### Weight Routes (`/api/weight`)

- GET `/` - Get weight entries
- POST `/` - Add weight entry
- PUT `/:id` - Update weight entry
- DELETE `/:id` - Delete weight entry

### Hydration Routes (`/api/hydration`)

- GET `/` - Get hydration entries
- POST `/` - Add hydration entry
- GET `/today` - Get today's total
- DELETE `/:id` - Delete entry

### Achievement Routes (`/api/achievements`)

- GET `/` - Get user achievements

## Environment Variables

### Frontend (`environment.ts`)

```typescript
GOOGLE_CLIENT_ID: string
```

### Backend (`.env`)

```
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb_connection_string
JWT_SECRET=secret_key
GOOGLE_CLIENT_ID=google_oauth_client_id
GOOGLE_CLIENT_SECRET=google_oauth_client_secret
EMAIL_USER=gmail_address
EMAIL_PASS=gmail_app_password
CLOUDINARY_CLOUD_NAME=cloudinary_name
CLOUDINARY_API_KEY=cloudinary_key
CLOUDINARY_API_SECRET=cloudinary_secret
GEMINI_API_KEY=gemini_api_key
```

## Development Workflow

1. **Start Backend:** `cd fit-track-api && npm start` (port 3000)
2. **Start Frontend:** `cd fit-track && ng serve` (port 4200)
3. **Database:** MongoDB must be running (local or Atlas)
4. **Sync Job:** Runs daily at 3 AM (IST) or on server restart

This structure provides a complete overview of the Fit-Track application architecture for AI understanding and development purposes.