# CORE Educational Services — Full-Stack Website Project Plan
### For Cursor AI Implementation | Senior Architect Spec

---

## 📋 PROJECT OVERVIEW

**Client:** CORE Educational Services (CORE-ES)  
**Location:** 14120 Newbrook Dr Suite 200, Chantilly, VA 20151  
**Type:** Non-profit / Tax-exempt Educational Organization  
**Reference Site:** SkyAcademyNJ.org (design/structure inspiration)  
**Deliverable:** Full-stack web application with public site + admin dashboard  

---

## 🏗️ RECOMMENDED TECH STACK

| Layer | Technology | Reason |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SSR/SSG, API routes, file-based routing, SEO |
| Styling | **Tailwind CSS + shadcn/ui** | Rapid responsive UI, accessible components |
| Auth | **NextAuth.js v5 + Google OAuth** | Secure, email-whitelist access for admin |
| Database | **PostgreSQL + Prisma ORM** | Relational data for users, events, submissions |
| File Storage | **Cloudinary** | Image/video uploads for events, free tier available |
| Payments | **Stripe** | PCI-compliant, supports one-time donations & registration fees |
| Forms | **React Hook Form + Zod** | Type-safe validation |
| Maps | **Google Maps Embed API** | Contact page location embed |
| Email | **Resend (or SendGrid)** | Transactional emails on form submissions |
| Hosting | **Vercel** | Zero-config Next.js deployment, free tier |
| DB Hosting | **Neon (PostgreSQL)** | Serverless Postgres, free tier |

---

## 📁 PROJECT STRUCTURE

```
core-es/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Home
│   │   ├── about/page.tsx              # About Us
│   │   ├── contact/page.tsx            # Contact Us
│   │   ├── events/page.tsx             # Events listing
│   │   ├── events/[slug]/page.tsx      # Single event
│   │   ├── donate/page.tsx             # Donation page
│   │   ├── registration/
│   │   │   ├── summer-camp/page.tsx    # Summer Camp Registration
│   │   │   └── scholarship/page.tsx    # Scholarship Application
│   │   └── layout.tsx                  # Public layout (header/footer)
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── page.tsx                # Dashboard overview
│   │   │   ├── events/
│   │   │   │   ├── page.tsx            # Events management
│   │   │   │   ├── new/page.tsx        # Create event
│   │   │   │   └── [id]/edit/page.tsx  # Edit event
│   │   │   ├── submissions/
│   │   │   │   ├── summer-camp/page.tsx
│   │   │   │   └── scholarship/page.tsx
│   │   │   └── users/page.tsx          # Access management (superadmin only)
│   │   └── layout.tsx                  # Admin layout
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── events/route.ts
│   │   ├── submissions/route.ts
│   │   ├── donations/route.ts
│   │   └── upload/route.ts
│   └── layout.tsx                      # Root layout
├── components/
│   ├── public/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProgramsGrid.tsx
│   │   ├── EventsCarousel.tsx
│   │   ├── StatsSection.tsx
│   │   ├── DonationBanner.tsx
│   │   └── ImageCarousel.tsx
│   └── admin/
│       ├── Sidebar.tsx
│       ├── EventEditor.tsx
│       ├── DataTable.tsx
│       └── UserManager.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── cloudinary.ts
│   └── stripe.ts
├── prisma/
│   └── schema.prisma
└── middleware.ts                        # Route protection
```

---

## 🗄️ DATABASE SCHEMA (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  role      Role     @default(COORDINATOR)
  createdAt DateTime @default(now())
  events    Event[]
}

enum Role {
  SUPERADMIN
  COORDINATOR
}

model Event {
  id             String   @id @default(cuid())
  title          String
  slug           String   @unique
  date           DateTime
  location       String
  description    String   @db.Text
  highlightImage String?
  mediaUrls      String[] // Array of image/video URLs from Cloudinary
  published      Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  authorId       String
  author         User     @relation(fields: [authorId], references: [id])
}

model SummerCampRegistration {
  id             String   @id @default(cuid())
  // Student Info
  studentName    String
  dob            DateTime
  grade          String
  school         String
  // Parent Info
  parentName     String
  email          String
  phone          String
  address        String
  // Camp Info
  sessionChoice  String
  tshirtSize     String
  allergies      String?
  emergencyName  String
  emergencyPhone String
  // Payment
  paymentStatus  String   @default("pending")
  stripeSessionId String?
  amount         Float?
  submittedAt    DateTime @default(now())
}

model ScholarshipApplication {
  id             String   @id @default(cuid())
  applicantName  String
  email          String
  phone          String
  grade          String
  school         String
  gpa            String
  essayText      String   @db.Text
  resumeUrl      String?
  transcriptUrl  String?
  recommendationUrl String?
  status         String   @default("pending") // pending, reviewed, approved, rejected
  submittedAt    DateTime @default(now())
}

model Donation {
  id              String   @id @default(cuid())
  amount          Float
  method          String   // stripe, zelle, paypal
  donorName       String?
  donorEmail      String?
  stripeSessionId String?
  createdAt       DateTime @default(now())
}

model AllowedEmail {
  id    String @id @default(cuid())
  email String @unique
  role  Role   @default(COORDINATOR)
}
```

---

## 🎨 DESIGN SYSTEM

**Color Palette** (from CORE-ES branding):
```css
:root {
  --primary: #1B3F6E;       /* Deep Navy Blue */
  --primary-light: #2C5F9E;
  --accent: #4CAF7D;        /* Teal/Green (from logo colors) */
  --accent-warm: #E8A020;   /* Warm amber */
  --bg-light: #F8FAFC;
  --bg-white: #FFFFFF;
  --text-dark: #1A1A2E;
  --text-muted: #64748B;
  --border: #E2E8F0;
}
```

**Typography:**
- Display: `Playfair Display` (headings)
- Body: `Source Sans 3` (readable, professional)
- Accent: `Poppins` (buttons, nav)

---

---

# 🚀 SPRINT PLAN

---

## SPRINT 0 — Project Initialization (Day 1)
**Goal:** Full project scaffold, dependencies, env setup

### Cursor AI Prompt:

```
Create a new Next.js 14 project with the App Router called "core-es". 

Install and configure:
- Tailwind CSS with custom theme
- shadcn/ui (init with default style)
- Prisma with PostgreSQL provider
- NextAuth.js v5
- React Hook Form + Zod
- Cloudinary SDK (@cloudinary/next)
- Stripe
- Resend (email)
- lucide-react (icons)
- @next/font for Google Fonts (Playfair Display, Source Sans 3, Poppins)
- react-slick + slick-carousel (image sliders)
- react-leaflet OR just use Google Maps embed (contact page)
- date-fns
- clsx, tailwind-merge

Set up the following folder structure:
app/(public)/layout.tsx - public layout
app/(admin)/layout.tsx - admin layout
app/api/ - API routes
components/public/ - public components
components/admin/ - admin components
lib/ - utilities

Create .env.local.example with all required environment variables:
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

Create the Prisma schema as follows: [paste the full schema from above]

Set up the Tailwind config with these custom colors and fonts:
- primary: #1B3F6E
- primary-light: #2C5F9E
- accent: #4CAF7D
- accent-warm: #E8A020
- fonts: playfair (Playfair Display), sans (Source Sans 3), poppins (Poppins)

Run prisma generate and create a prisma.ts lib file with singleton PrismaClient.
```

---

## SPRINT 1 — Authentication & Middleware (Day 1-2)
**Goal:** Secure admin access with Google OAuth + role-based middleware

### Cursor AI Prompt:

```
Implement authentication for the core-es Next.js app using NextAuth.js v5 with Google OAuth provider.

Requirements:
1. Create lib/auth.ts with NextAuth config:
   - Google Provider
   - Sign-in callback: check if user's email exists in the AllowedEmail table in Prisma. If not, deny access with a custom error.
   - Session callback: include user.role and user.id from the database
   - JWT callback: persist role in token
   - Custom signIn page: app/auth/signin/page.tsx (styled, not default NextAuth page)

2. Create app/api/auth/[...nextauth]/route.ts

3. Create middleware.ts at project root:
   - Protect all /admin/* routes: redirect to /auth/signin if not authenticated
   - If authenticated but role is COORDINATOR, block access to /admin/users (show 403 page)
   - Public routes are fully open

4. Create the custom sign-in page (app/auth/signin/page.tsx):
   - Centered card layout with CORE-ES logo (use placeholder for now)
   - "Sign in with Google" button (styled in primary navy blue)
   - Show error message if access denied (not in AllowedEmail table)
   - Message: "Access restricted to authorized CORE-ES staff only."

5. Create a lib/permissions.ts helper:
   - canManageUsers(role) → only SUPERADMIN
   - canPostEvents(role) → SUPERADMIN or COORDINATOR
   - canViewSubmissions(role) → SUPERADMIN or COORDINATOR

The first time a SUPERADMIN logs in, if the AllowedEmail table is empty, seed it with the SUPERADMIN's email and role from an env variable: SUPERADMIN_EMAIL.
```

---

## SPRINT 2 — Public Layout: Header & Footer (Day 2)
**Goal:** Responsive header with nav, donation button, social icons; footer

### Cursor AI Prompt:

```
Build the public layout for core-es website with a professional Header and Footer.

HEADER (components/public/Header.tsx):
- Sticky header with slight shadow on scroll (use intersection observer)
- Left: CORE-ES logo (import from /public/logo.png, use Image component)
- Center: Navigation links:
  - Home (/)
  - About Us (/about)
  - Programs (dropdown: Summer Camp → /registration/summer-camp, Scholarship → /registration/scholarship)
  - Events (/events)
  - Contact (/contact)
- Right side: 
  - Social icons (Instagram, Facebook, Twitter/X, LinkedIn) using lucide-react, linking to placeholders for now
  - "Donate" button: rounded, accent green (#4CAF7D), links to /donate
- Mobile: hamburger menu that slides in a full-width drawer with all links
- Colors: white background, navy text (#1B3F6E), active link highlighted

FOOTER (components/public/Footer.tsx):
- 4-column grid (collapses to 2 on mobile, 1 on xs)
- Column 1: Logo + tagline "For Next Generation" + address: 14120 Newbrook Dr Suite 200, Chantilly, VA 20151 + email: info@core-es.org
- Column 2: Quick Links (same as nav)
- Column 3: Programs (Summer Camp, Scholarship, After School, Weekend School, SAT Course)
- Column 4: Connect (social icons with labels + Donate button)
- Bottom bar: © 2025 CORE Educational Services. All rights reserved. | 501(c)(3) Non-Profit Organization | Tax ID: [placeholder]
- Colors: deep navy (#1B3F6E) background, white text

Use app/(public)/layout.tsx to wrap all public pages with Header and Footer.
Import Playfair Display for headings, Source Sans 3 for body text.
Make fully mobile responsive using Tailwind breakpoints.
```

---

## SPRINT 3 — Home Page (Day 3-4)
**Goal:** Full hero, sections, carousels — inspired by Sky Academy NJ layout

### Cursor AI Prompt:

```
Build the complete Home page for CORE Educational Services at app/(public)/page.tsx.

Use the following sections in order:

--- SECTION 1: HERO ---
- Full-viewport-height hero section
- Background: dark navy (#1B3F6E) with a semi-transparent overlay on a background image (use a placeholder gradient for now, easy to swap)
- Large heading (Playfair Display, white): "Empowering Youth Through Education"
- Subheading (Source Sans 3): "Mentoring, Academic Support & Community Building in Northern Virginia"
- Two CTA buttons: "Explore Programs" → /registration | "Donate Now" → /donate (accent green)
- Animated subtle particle effect or gradient mesh in background using CSS only

--- SECTION 2: STATS BANNER ---
- Full-width background: accent green (#4CAF7D)
- 4 stats displayed in a row:
  - "500+ Students Served"
  - "Since 2017"
  - "6 Programs"
  - "501(c)(3) Non-Profit"
- Each stat: large bold number, small label below
- Animated count-up on scroll (use Intersection Observer + vanilla JS counter)

--- SECTION 3: ABOUT PREVIEW ---
- 2-column layout (image left, text right on desktop; stacked on mobile)
- Left: Rounded image placeholder (will be replaced with real photo)
- Right: 
  - Small label: "WHO WE ARE"
  - H2: "Building Futures, One Student at a Time"
  - Paragraph about CORE-ES mission (placeholder text referencing academic mentoring, youth development)
  - "Learn More" button linking to /about

--- SECTION 4: PROGRAMS GRID ---
- Section heading: "Our Programs"
- 3x2 grid of program cards, each card has:
  - Circular image (placeholder)
  - Program name
  - Short description
  - "Details" button
- Programs: After School Program, Seed School of Values, WoW Academy, SAT Course, Wise Walk, Core Mentoring Program
- Cards have hover effect (slight lift + shadow)

--- SECTION 5: UPCOMING EVENTS (CAROUSEL) ---
- Section heading: "Upcoming Events"
- Horizontal scrolling carousel using react-slick
- Each card: event image, event title, date badge, location, short description, "Learn More" link
- On desktop show 3 cards, tablet 2, mobile 1
- Auto-play disabled, arrow navigation
- Show placeholder event cards for now with dummy data
- "View All Events" button below → /events

--- SECTION 6: IMAGE GALLERY / HIGHLIGHTS CAROUSEL ---
- Full-width image slider using react-slick
- Show community/program photos in a wide format
- Overlay text on each slide: short quote or caption
- Use placeholder images with gradient overlays

--- SECTION 7: DONATION CTA BANNER ---
- Background: warm amber (#E8A020)
- Centered content:
  - "Support Our Mission"
  - Short text about tax-deductible donations
  - Large "Donate Now" button (navy, white text) → /donate

--- SECTION 8: TESTIMONIALS CAROUSEL ---
- Light gray background
- react-slick single-slide carousel
- Each slide: quote text, student/parent name, program attended
- Use 3 placeholder testimonials

Import all placeholder images from /public/images/ (just reference them, they'll be added later).
Make all sections fully mobile responsive.
Add smooth scroll-based fade-in animations for each section using Intersection Observer.
```

---

## SPRINT 4 — About Us Page (Day 4)
**Goal:** Mission, team, history, values

### Cursor AI Prompt:

```
Build the About Us page at app/(public)/about/page.tsx for CORE Educational Services.

Include these sections:

1. PAGE HERO: 
   - Navy background with page title "About CORE Educational Services"
   - Subtitle: "For Next Generation"
   - Breadcrumb: Home > About Us

2. MISSION & VISION:
   - Two-column cards: Mission card (navy) and Vision card (green)
   - Mission: "To provide quality educational services and youth development programs that empower the next generation."
   - Vision: "A future where every young person has access to the tools, mentors, and opportunities they need to thrive."

3. OUR STORY:
   - Timeline layout (vertical on mobile, alternating on desktop)
   - Milestones: Founded 2017, First program 2018, Tax-exempt status 2019, Expanded programs 2021, New location 2023, etc. (placeholder dates/text)

4. CORE VALUES:
   - 4-column icon grid (2 on mobile)
   - Values: Excellence, Integrity, Community, Empowerment
   - Each: icon (lucide-react), title, short description

5. TEAM SECTION:
   - Grid of team member cards
   - Each: circular photo placeholder, name, title, short bio
   - 4 placeholder team members

6. PARTNERS / AFFILIATIONS:
   - Logo row of partner organizations (placeholder gray boxes for now)

7. CALL TO ACTION:
   - "Join Our Community" section with two buttons: Volunteer, Donate
```

---

## SPRINT 5 — Events System (Day 5-6)
**Goal:** Events listing page + single event page (public) + database integration

### Cursor AI Prompt:

```
Build the Events system for CORE Educational Services.

1. CREATE API ROUTES:

app/api/events/route.ts:
- GET: fetch all published events, sorted by date descending. Support query params: ?limit=6, ?upcoming=true
- POST: create new event (admin only, check session role)

app/api/events/[id]/route.ts:
- GET: fetch single event by id or slug
- PUT: update event (admin only)
- DELETE: delete event (admin only, superadmin only)

2. PUBLIC EVENTS LISTING (app/(public)/events/page.tsx):
- Page hero with title "Events & Blog"
- Filter tabs: All | Upcoming | Past
- 3-column grid of event cards (2 on tablet, 1 on mobile):
  - Highlighted image (full width top of card)
  - Date badge (top-left overlay, navy pill)
  - Event title (Playfair Display)
  - Location line with map-pin icon
  - Short description (truncated to 2 lines)
  - "Read More" link → /events/[slug]
- Pagination (6 per page)
- When no events are in DB, show a "No upcoming events. Check back soon!" placeholder card

3. SINGLE EVENT PAGE (app/(public)/events/[slug]/page.tsx):
- generateMetadata for SEO (title, description, og:image from highlightImage)
- Full hero image (blur placeholder via Next.js Image)
- Date, Location, Author displayed
- Rich description (render as HTML safely using DOMPurify or next-mdx)
- Image gallery grid if multiple mediaUrls
- Embedded video if mediaUrls include YouTube or MP4 links
- Share buttons (copy link, Facebook, Twitter)
- "Back to Events" link
- Related events section (3 recent events)

4. Fetch events from Prisma in server components using async/await.
   Use generateStaticParams for static generation of event pages.
```

---

## SPRINT 6 — Contact Page (Day 6)
**Goal:** Contact form, address, map embed

### Cursor AI Prompt:

```
Build the Contact Us page at app/(public)/contact/page.tsx.

Layout (two-column on desktop, stacked on mobile):

LEFT COLUMN:
- Section: "Get In Touch"
- Address card with icon: 14120 Newbrook Dr Suite 200, Chantilly, VA 20151
- Email card with icon: info@core-es.org (placeholder)
- Phone card with icon: (placeholder phone number)
- Office Hours card: Mon-Fri 9AM-5PM
- Social links row

CONTACT FORM (right column):
- React Hook Form + Zod validation
- Fields:
  - Full Name (required)
  - Email Address (required, email format)
  - Phone Number (optional)
  - Subject (dropdown: General Inquiry, Program Info, Volunteering, Donation, Other)
  - Message (textarea, min 20 chars)
  - Honeypot field (hidden, spam prevention)
- Submit button: "Send Message" (navy, full width on mobile)
- On submit: POST to /api/contact → send email via Resend to info@core-es.org, show success toast
- Loading state on submit button

Create app/api/contact/route.ts:
- Validate body with Zod
- Check honeypot is empty
- Send email using Resend SDK
- Return success/error JSON

GOOGLE MAPS EMBED (below the two columns, full width):
- Use an <iframe> embed of Google Maps for: "14120 Newbrook Dr Suite 200, Chantilly, VA 20151"
- 400px height, rounded corners, border
- Fallback link to open in Google Maps if embed fails

Style everything consistently with navy primary and green accent theme.
```

---

## SPRINT 7 — Donation Page (Day 7)
**Goal:** Donation page with Stripe + Zelle/PayPal instructions

### Cursor AI Prompt:

```
Build the Donation page at app/(public)/donate/page.tsx for CORE Educational Services.

PAGE SECTIONS:

1. HERO:
- Warm amber (#E8A020) background gradient
- Title: "Support Our Mission"
- Subtitle: "Your donation helps us serve hundreds of young people in Northern Virginia. CORE Educational Services is a 501(c)(3) tax-exempt organization. All donations are tax-deductible."
- Tax ID placeholder: EIN: XX-XXXXXXX

2. DONATION AMOUNT SELECTOR:
- Preset amounts: $25, $50, $100, $250, $500
- "Custom Amount" input if none selected
- Amount buttons: pill-shaped, selected state = filled navy
- "Donate Monthly" toggle (checkbox, slightly different CTA color)

3. PAYMENT METHODS TABS:
Three tabs: "Credit/Debit Card" | "Zelle" | "PayPal"

TAB 1 - Credit/Debit Card (Stripe):
- "Donate via Stripe" button → creates Stripe Checkout session via /api/donations/stripe
- Amount passed from selector
- On success: redirect to /donate/success page
- On cancel: redirect back to /donate

TAB 2 - Zelle:
- Instructions card (navy background, white text):
  - "Send via Zelle to: [ZELLE_EMAIL placeholder]"
  - "In the memo, include your name and 'CORE-ES Donation'"
  - "We will send you a tax receipt by email"
- "Open Zelle App" button (links to https://www.zellepay.com)

TAB 3 - PayPal:
- Big PayPal button (use official PayPal SDK or just a styled placeholder button for now)
- Instructions similar to Zelle
- Placeholder PayPal.Me link

4. IMPACT SECTION:
- "Your Donation Makes a Difference"
- 3 cards showing impact:
  - $25 = "Provides school supplies for one student"
  - $100 = "Sponsors a student for one month of mentoring"
  - $500 = "Funds a full scholarship for a summer program"

5. SUCCESS PAGE (app/(public)/donate/success/page.tsx):
- Confetti animation (use canvas-confetti)
- "Thank You!" message
- Download receipt button (placeholder)
- "Return Home" button

CREATE API: app/api/donations/stripe/route.ts
- Accept: amount (number), monthly (boolean), donorName, donorEmail
- Create Stripe Checkout session (mode: payment or subscription)
- Store donation record in DB (status: pending)
- Return { url } for redirect
- Also create app/api/webhooks/stripe/route.ts to handle payment_intent.succeeded event and update DB record status to 'completed'
```

---

## SPRINT 8 — Registration Pages (Day 8-9)
**Goal:** Summer Camp registration form with payment + Scholarship application

### Cursor AI Prompt:

```
Build two registration pages for CORE Educational Services.

========================================
PAGE 1: Summer Camp Registration
app/(public)/registration/summer-camp/page.tsx
========================================

Multi-step form (4 steps) using React Hook Form with step navigation:

STEP 1 - Student Information:
- Student Full Name (required)
- Date of Birth (date picker, required)
- Current Grade (select: K-12, required)
- Current School Name (required)
- Any allergies or medical conditions? (textarea, optional)
- T-Shirt Size (select: XS, S, M, L, XL, required)

STEP 2 - Parent/Guardian Information:
- Parent/Guardian Full Name (required)
- Relationship to Student (select: Parent, Guardian, Other)
- Email Address (required, email format)
- Primary Phone (required, phone format)
- Home Address (required)
- City, State, ZIP (required)
- Emergency Contact Name (required, if different from parent)
- Emergency Contact Phone (required)

STEP 3 - Camp Session & Details:
- Session Choice (select: Session 1, Session 2, Full Summer - all TBD)
- How did you hear about us? (select: Social Media, Friend, School, Other)
- Special requests or notes (textarea, optional)
- Signature/Acknowledgment checkbox: "I agree to the terms and waiver" (required)
- Medical release checkbox (required)
- Photo release checkbox (required)

STEP 4 - Review & Payment:
- Summary of all entered information (read-only)
- Total cost displayed (placeholder: $TBD per session)
- Payment options: Stripe button OR "Pay Later / Contact Us"
- Submit button

Progress bar showing current step.
Each step validates before proceeding.
All data sent to POST /api/submissions/summer-camp on final submit.
Store in SummerCampRegistration table in Prisma.
Send confirmation email to parent via Resend.
On success: show a green confirmation card with registration ID.

========================================
PAGE 2: Core Scholarship Application  
app/(public)/registration/scholarship/page.tsx
========================================

Single long form (not multi-step) with sections:

SECTION 1 - Personal Information:
- Full Name, Email, Phone, Date of Birth, Address

SECTION 2 - Academic Information:
- Current School, Grade Level, GPA (0.0 - 4.0)
- Intended major/field of study
- List of extracurricular activities (textarea)

SECTION 3 - Essay:
- Prompt: "Please describe how CORE Educational Services has impacted your life, and how this scholarship will help you achieve your academic and career goals. (500-1000 words)"
- Large textarea with character/word counter

SECTION 4 - Document Uploads:
- Upload Resume (PDF, max 5MB) → Cloudinary upload
- Upload Transcript (PDF, max 5MB) → Cloudinary upload  
- Upload Letter of Recommendation (PDF, max 5MB) → Cloudinary upload
- Each upload shows file name and remove button after upload

SECTION 5 - Agreement:
- "I certify all information is accurate" checkbox (required)
- E-signature field (just type full name as signature, required)

Submit → POST /api/submissions/scholarship → store in DB → send confirmation email.
Show success message with application reference ID.

Style both forms with consistent navy/green theme, clear labels, error messages in red.
```

---

## SPRINT 9 — Admin Dashboard (Day 10-11)
**Goal:** Admin layout, dashboard overview, protected routes

### Cursor AI Prompt:

```
Build the Admin Dashboard for CORE Educational Services at app/(admin)/admin/.

ADMIN LAYOUT (app/(admin)/layout.tsx):
- Check session server-side, redirect to /auth/signin if not authenticated
- Sidebar navigation (collapsible on mobile):
  - CORE-ES logo small version
  - Navigation items with icons (lucide-react):
    - Dashboard (LayoutDashboard icon) → /admin
    - Events (Calendar icon) → /admin/events
    - Summer Camp Submissions (Users icon) → /admin/submissions/summer-camp
    - Scholarship Applications (GraduationCap icon) → /admin/submissions/scholarship
    - User Access (Shield icon) → /admin/users [SUPERADMIN ONLY - hide for COORDINATOR]
    - Settings (Settings icon) → /admin/settings
  - Bottom: User avatar, name, role badge, Sign Out button
- Main content area (white, padding)
- Top bar: page title, logged-in user info, notification bell (placeholder)

DASHBOARD PAGE (app/(admin)/admin/page.tsx):
- Welcome heading: "Welcome back, [name]"
- Stats cards row (4 cards):
  - Total Events Published
  - Summer Camp Registrations (count)
  - Scholarship Applications (count)
  - Total Donations (sum from DB)
- Recent Activity list: last 5 submissions or events
- Quick action buttons: "Post New Event", "View Registrations"
- Fetch all stats from Prisma in a server component

All data fetched server-side with Prisma. Role shown as color-coded badge (SUPERADMIN=purple, COORDINATOR=blue).
Make sidebar collapsible with a toggle button for mobile.
Use shadcn/ui Card, Badge, Button, Table components throughout.
```

---

## SPRINT 10 — Admin: Event Management (Day 11-12)
**Goal:** CRUD for events with rich editor and file upload

### Cursor AI Prompt:

```
Build the Event Management section of the admin dashboard.

1. EVENTS LIST PAGE (app/(admin)/admin/events/page.tsx):
- Table of all events (published and draft) using shadcn/ui Table
- Columns: Highlight Image (thumbnail), Title, Date, Location, Status (Published/Draft badge), Author, Actions
- Actions: Edit button, Publish/Unpublish toggle, Delete (with confirm dialog)
- "Create New Event" button top-right
- Search input to filter events by title
- Pagination (10 per page)
- Fetch from Prisma, show in a server component with client island for interactions

2. CREATE/EDIT EVENT PAGE (app/(admin)/admin/events/new/page.tsx and /[id]/edit/page.tsx):

Interactive event editor with these fields:

- Event Title (large text input, auto-generates slug)
- Slug (editable, shows URL preview: core-es.org/events/[slug])
- Event Date & Time (date-time picker)
- Location (text input with suggestion of "14120 Newbrook Dr, Chantilly, VA")
- Description:
  - Use a rich text editor: integrate @uiw/react-md-editor OR react-quill (whichever installs cleanly in Next.js 14)
  - Should support bold, italic, headers, bullet lists, links
- Highlighted Image Upload:
  - Drag & drop zone using react-dropzone
  - On drop: POST to /api/upload with FormData → upload to Cloudinary → return URL
  - Show preview of uploaded image
  - Shows as the card thumbnail on the public events page
- Additional Media (Images/Videos):
  - Multi-file dropzone
  - Supports JPG, PNG, GIF, MP4
  - Each file uploads to Cloudinary individually
  - Shows thumbnail grid of uploaded files
  - Remove button on each
- Published toggle (Draft / Published)
- "Save Draft" button and "Publish" button

3. API: app/api/upload/route.ts:
- Accept multipart FormData
- Upload to Cloudinary using cloudinary.uploader.upload
- Return { secure_url, public_id }
- Max file size: 10MB for images, 50MB for videos
- Check auth session before allowing upload

4. Slug auto-generation:
- As user types title, auto-fill slug as lowercase-hyphenated
- User can edit slug manually
- On save, check slug uniqueness against DB

Handle all loading, error, and success states clearly.
```

---

## SPRINT 11 — Admin: Submissions Viewer (Day 12-13)
**Goal:** View and manage form submissions (read-only for coordinators)

### Cursor AI Prompt:

```
Build the Submissions viewer pages for the admin dashboard.

1. SUMMER CAMP SUBMISSIONS (app/(admin)/admin/submissions/summer-camp/page.tsx):

- Page title: "Summer Camp Registrations"
- Stats bar: Total registrations, Paid, Pending Payment, This Month
- Filter bar: search by student name, email; filter by payment status; date range
- Data table (shadcn/ui Table) with columns:
  - Registration ID, Student Name, Grade, Parent Name, Email, Phone, Session Choice, Payment Status (badge: green=paid, yellow=pending, red=failed), Submitted Date
- Row click or "View" button → opens a slide-over drawer (Sheet from shadcn) showing ALL fields of that submission
- Export to CSV button (superadmin only): generate CSV download of all submissions
- Delete submission button (superadmin only, with confirmation)

2. SCHOLARSHIP APPLICATIONS (app/(admin)/admin/submissions/scholarship/page.tsx):

- Similar table layout
- Columns: App ID, Applicant Name, School, Grade, GPA, Email, Status (pending/reviewed/approved/rejected), Submitted Date
- Status can be updated via a dropdown in the table row (COORDINATOR and SUPERADMIN)
- "View" drawer shows all fields including:
  - Essay text (full, scrollable)
  - Links to uploaded documents (open in new tab from Cloudinary)
- Status update → PATCH /api/submissions/scholarship/[id]/status
- On status change to 'approved' or 'rejected' → option to send email notification to applicant

Both pages fetch data from Prisma server-side.
Implement proper pagination, at least 20 items per page.
Add loading skeletons while data loads.
```

---

## SPRINT 12 — Admin: User Access Management (Day 13)
**Goal:** Superadmin can manage who has admin access

### Cursor AI Prompt:

```
Build the User Access Management page (superadmin only) at app/(admin)/admin/users/page.tsx.

This page is ONLY accessible if session.user.role === 'SUPERADMIN'. 
Middleware should return 403 for COORDINATOR trying to access this page.

PAGE LAYOUT:
- Title: "Access Management"
- Subtitle: "Control who can access the admin dashboard"

SECTION 1 - Add Allowed Email:
- Input field: Email address
- Role selector: SUPERADMIN | COORDINATOR  
- "Add User" button → POST /api/admin/users → adds to AllowedEmail table
- Validation: must be valid email, cannot duplicate
- Success toast: "User [email] added as [role]"

SECTION 2 - Current Allowed Users Table:
- Columns: Email, Role (badge), Added Date, Actions
- Actions: 
  - Change Role dropdown (cannot change own role)
  - Remove button (cannot remove yourself)
- Fetch from AllowedEmail table in Prisma
- Shows actual logged-in admin users separately with "Last Login" date

SECTION 3 - Active Sessions (informational):
- List of users who have an active NextAuth session
- Just their name, email, role, last seen

API routes needed:
- GET /api/admin/users → list AllowedEmail records
- POST /api/admin/users → add new allowed email
- PATCH /api/admin/users/[id] → change role
- DELETE /api/admin/users/[id] → remove user access (also invalidate any active sessions if possible)

All endpoints: validate session, check role is SUPERADMIN, return 401/403 otherwise.
```

---

## SPRINT 13 — Stripe Integration & Security (Day 14)
**Goal:** Complete payment flows, webhook handling, security hardening

### Cursor AI Prompt:

```
Complete the Stripe integration and security hardening for core-es.

1. STRIPE CHECKOUT FOR DONATIONS (app/api/donations/stripe/route.ts):
- Validate request body with Zod: { amount: number, monthly: boolean, donorName?: string, donorEmail?: string }
- Create Stripe checkout session:
  - mode: monthly ? 'subscription' : 'payment'
  - success_url: process.env.NEXTAUTH_URL + '/donate/success?session_id={CHECKOUT_SESSION_ID}'
  - cancel_url: process.env.NEXTAUTH_URL + '/donate'
  - line_items: [{ price_data: { currency: 'usd', unit_amount: amount * 100, product_data: { name: 'Donation to CORE Educational Services' } }, quantity: 1 }]
  - metadata: { donorName, donorEmail }
- Save pending Donation to DB with stripeSessionId
- Return { url: session.url }

2. STRIPE CHECKOUT FOR SUMMER CAMP REGISTRATION:
- Similar checkout session but with product name "Summer Camp Registration"
- After payment: update SummerCampRegistration.paymentStatus to 'paid'

3. WEBHOOK HANDLER (app/api/webhooks/stripe/route.ts):
- Verify Stripe signature using stripe.webhooks.constructEvent
- Handle events:
  - checkout.session.completed → update Donation or SummerCampRegistration status to 'paid'
  - payment_intent.payment_failed → update status to 'failed'
- Return 200 immediately

4. SECURITY HARDENING:
- Add rate limiting to all API routes using upstash/ratelimit or a simple in-memory limiter:
  - Contact form: 5 requests per IP per hour
  - Registration: 3 per IP per hour
  - Auth attempts: NextAuth handles this
- Add Content Security Policy headers in next.config.js
- Sanitize all rich text / HTML content displayed from DB using DOMPurify on client
- Ensure all admin API routes check: const session = await getServerSession(authOptions); if (!session) return new Response('Unauthorized', { status: 401 });
- Add CSRF protection (NextAuth handles for auth routes; for forms, use Next.js server actions or include CSRF token)
- Environment variable validation on startup using zod in lib/env.ts

5. Add a /donate/success page that:
- Fetches the Stripe session using session_id query param
- Displays amount paid, donor name
- Shows tax-deductible receipt message
- "Download Receipt" button (generates a simple PDF using @react-pdf/renderer or jsPDF)
```

---

## SPRINT 14 — Polish, SEO & Deployment (Day 15)

### Cursor AI Prompt:

```
Final polish, SEO setup, and deployment preparation for core-es.

1. SEO & METADATA:
- Create app/layout.tsx root metadata:
  - title: { default: 'CORE Educational Services | Chantilly, VA', template: '%s | CORE-ES' }
  - description: 'CORE Educational Services is a non-profit providing mentoring, academic support, and youth development programs in Northern Virginia since 2017.'
  - keywords: ['educational services', 'youth mentoring', 'Chantilly VA', 'non-profit', 'after school programs', 'summer camp']
  - openGraph: { images: ['/og-image.png'], siteName: 'CORE Educational Services' }
- Add generateMetadata to all major pages
- Add JSON-LD structured data (Organization schema) to the home page
- Create /public/sitemap.xml or use next-sitemap package
- Create /public/robots.txt

2. PERFORMANCE:
- Ensure all images use Next.js <Image> with width, height, priority (for above fold)
- Add loading="lazy" to below-fold images
- Use next/font for all Google Fonts (no layout shift)
- Add suspense boundaries around data-fetching components
- Verify no unused CSS (Tailwind purge is enabled by default in prod)

3. ACCESSIBILITY:
- All interactive elements have aria-labels
- Color contrast ratio ≥ 4.5:1 for all text
- Skip-to-content link at top of page
- All form inputs have associated labels
- Focus ring visible on all focusable elements

4. ERROR PAGES:
- app/not-found.tsx: branded 404 page with "Back to Home" button
- app/error.tsx: branded error boundary with "Try Again" button
- app/(admin)/admin/forbidden/page.tsx: 403 page for unauthorized admin access

5. DEPLOYMENT CONFIG:
- Create vercel.json with proper configuration
- Create .env.production.example
- Add to next.config.js:
  - images.domains: ['res.cloudinary.com', 'lh3.googleusercontent.com']
  - Strict mode enabled
  - Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- Create a README.md with:
  - Local setup instructions
  - All environment variables explained
  - Database migration commands
  - Deployment steps to Vercel + Neon

6. TESTING CHECKLIST (add as a comment in README):
- [ ] Google OAuth sign-in works
- [ ] Non-whitelisted email is rejected
- [ ] Coordinator cannot access /admin/users
- [ ] Event CRUD works end-to-end
- [ ] File uploads to Cloudinary work
- [ ] Contact form sends email via Resend
- [ ] Stripe donation flow completes
- [ ] Webhook updates donation status
- [ ] All pages mobile responsive (test at 375px, 768px, 1280px)
- [ ] All forms validate properly
- [ ] 404 page shows correctly
```

---

## 🔑 ENVIRONMENT VARIABLES REFERENCE

```bash
# Database
DATABASE_URL="postgresql://user:pass@host/core_es?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="https://your-domain.com"

# Google OAuth (console.cloud.google.com)
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxx"

# First superadmin email (bootstraps the system)
SUPERADMIN_EMAIL="youremail@gmail.com"

# Cloudinary (cloudinary.com)
CLOUDINARY_CLOUD_NAME="xxx"
CLOUDINARY_API_KEY="xxx"
CLOUDINARY_API_SECRET="xxx"

# Stripe (dashboard.stripe.com)
STRIPE_SECRET_KEY="sk_live_xxx" # use sk_test_ for development
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# Resend (resend.com)
RESEND_API_KEY="re_xxx"
RESEND_FROM_EMAIL="noreply@core-es.org"
ADMIN_EMAIL="info@core-es.org"

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY="xxx"

# Zelle / PayPal (just display values, no API needed for manual)
NEXT_PUBLIC_ZELLE_EMAIL="donations@core-es.org"
NEXT_PUBLIC_PAYPAL_ME_LINK="https://paypal.me/corees"
```

---

## 📊 ROLE PERMISSIONS MATRIX

| Feature | Superadmin | Coordinator |
|---|---|---|
| View Dashboard | ✅ | ✅ |
| Create Events | ✅ | ✅ |
| Edit Own Events | ✅ | ✅ |
| Delete Any Event | ✅ | ❌ |
| View Summer Camp Submissions | ✅ | ✅ |
| View Scholarship Applications | ✅ | ✅ |
| Update Application Status | ✅ | ✅ |
| Export CSV | ✅ | ❌ |
| Delete Submissions | ✅ | ❌ |
| Manage User Access | ✅ | ❌ |
| View Donation Records | ✅ | ❌ |
| Change Any User's Role | ✅ | ❌ |

---

## 🌐 PAGE ROUTES SUMMARY

```
PUBLIC:
/ ...................... Home page
/about ................. About Us
/events ................ Events listing
/events/[slug] ......... Single event
/contact ............... Contact Us
/donate ................ Donation page
/donate/success ........ Donation success
/registration .......... Registration landing
/registration/summer-camp Summer Camp form
/registration/scholarship Scholarship application
/auth/signin ........... Admin login

ADMIN (protected):
/admin ................. Dashboard
/admin/events .......... Events list
/admin/events/new ...... Create event
/admin/events/[id]/edit Edit event
/admin/submissions/summer-camp
/admin/submissions/scholarship
/admin/users ........... Access management (superadmin only)
```

---

## 💡 ADDITIONAL CURSOR PROMPTS (Quick Actions)

### Add Instagram Feed to Home Page:
```
Add a static Instagram-style photo grid section to the Home page. 
Create 6 placeholder cards with gradient backgrounds and CORE-ES watermark text overlay.
Add a "Follow @corees on Instagram" button linking to https://instagram.com/corees.
This is a static display for now (no API needed).
```

### Add Cookie Consent Banner:
```
Add a GDPR/CCPA compliant cookie consent banner using a simple component.
Appears on first visit, stored in localStorage.
Buttons: "Accept All" | "Necessary Only".
Fixed to bottom of screen, navy background, white text.
```

### Add Newsletter Signup:
```
Add a newsletter signup section above the footer.
Email input + "Subscribe" button.
POST to /api/newsletter → store email in a Newsletter model in Prisma.
Send welcome email via Resend.
```

---

## 📝 NOTES FOR IMPLEMENTATION

1. **Admin URL**: The admin dashboard is at `/admin` — it's not "hidden" per se, but it requires Google auth. You can change the path to something less obvious like `/portal` if desired. Just update `middleware.ts` and all internal links.

2. **Stripe Test Mode**: Always test with `sk_test_` keys first. Use Stripe's test card `4242 4242 4242 4242` for testing payments.

3. **Cloudinary Free Tier**: 25GB storage, 25GB bandwidth/month — sufficient for starting out. Videos should be kept short.

4. **Database Migrations**: After any schema change, run `npx prisma migrate dev --name describe_change`.

5. **Google OAuth Setup**: In Google Cloud Console, add these authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://yourdomain.com/api/auth/callback/google` (prod)

6. **Vercel Deployment**: Connect your GitHub repo to Vercel. Add all env variables in Vercel dashboard. Set up Neon database and copy connection string.

7. **Domain**: Point your domain's DNS to Vercel. Update `NEXTAUTH_URL` to your production domain.
