# CORE Educational Services — Base Project Scaffold
## Complete Starter Code for Cursor AI

> **Hostinger Note:** Yes, Hostinger works. Use their **VPS plan** (KVM 1 or higher, ~$5-8/mo) with Ubuntu + Node.js + PM2. Next.js does NOT work on shared/WordPress hosting. See deployment section at the bottom.
> **Payments:** Stripe removed. Payment buttons are placeholder UI only. Structure is there — just empty.

---

## STEP 1 — Run This First in Terminal

```bash
npx create-next-app@latest core-es --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd corees
npx shadcn@latest init
npx shadcn@latest add button card badge sheet dialog dropdown-menu table tabs toast separator avatar
npm install @prisma/client prisma
npm install next-auth@beta @auth/prisma-adapter
npm install react-hook-form @hookform/resolvers zod
npm install cloudinary
npm install resend
npm install react-slick slick-carousel
npm install @types/react-slick
npm install lucide-react
npm install date-fns
npm install clsx tailwind-merge
npm install @uiw/react-md-editor
npm install react-dropzone
npm install canvas-confetti @types/canvas-confetti
npm install next-themes
npm install @tanstack/react-table
npx prisma init
```

---

## FILE: package.json (key scripts section)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

---

## FILE: .env.local (copy this, fill in values)

```bash
# ─── DATABASE (Neon free tier: neon.tech OR local postgres) ───
DATABASE_URL="postgresql://user:password@host/core_es?sslmode=require"

# ─── NEXTAUTH ───
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# ─── GOOGLE OAUTH (console.cloud.google.com) ───
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# ─── FIRST SUPERADMIN (your email) ───
SUPERADMIN_EMAIL="your@email.com"

# ─── CLOUDINARY (cloudinary.com free tier) ───
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# ─── RESEND EMAIL (resend.com free tier) ───
RESEND_API_KEY=""
RESEND_FROM_EMAIL="noreply@core-es.org"
ADMIN_EMAIL="info@core-es.org"

# ─── GOOGLE MAPS EMBED (optional, can use free iframe without key) ───
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY=""

# ─── PAYMENTS (leave empty — placeholder only for now) ───
NEXT_PUBLIC_ZELLE_EMAIL="donations@core-es.org"
NEXT_PUBLIC_PAYPAL_ME_LINK="https://paypal.me/corees"
# STRIPE_SECRET_KEY=""          # add later
# NEXT_PUBLIC_STRIPE_KEY=""     # add later
# STRIPE_WEBHOOK_SECRET=""      # add later

# ─── APP ───
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="CORE Educational Services"
```

---

## FILE: prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  SUPERADMIN
  COORDINATOR
}

model AllowedEmail {
  id        String   @id @default(cuid())
  email     String   @unique
  role      Role     @default(COORDINATOR)
  createdAt DateTime @default(now())
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  image     String?
  role      Role     @default(COORDINATOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  events    Event[]

  @@map("users")
}

model Event {
  id             String   @id @default(cuid())
  title          String
  slug           String   @unique
  date           DateTime
  location       String
  description    String   @db.Text
  highlightImage String?
  mediaUrls      String[]
  published      Boolean  @default(false)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  authorId       String
  author         User     @relation(fields: [authorId], references: [id])

  @@map("events")
}

model SummerCampRegistration {
  id               String   @id @default(cuid())
  // Student
  studentName      String
  dob              String
  grade            String
  school           String
  allergies        String?
  tshirtSize       String
  // Parent
  parentName       String
  relationship     String
  email            String
  phone            String
  address          String
  city             String
  state            String
  zip              String
  emergencyName    String
  emergencyPhone   String
  // Camp
  sessionChoice    String
  heardFrom        String?
  specialRequests  String?
  // Agreements
  termsAccepted    Boolean  @default(false)
  medicalRelease   Boolean  @default(false)
  photoRelease     Boolean  @default(false)
  // Payment (placeholder — not connected to processor yet)
  paymentStatus    String   @default("pending")
  paymentMethod    String?
  amount           Float?
  submittedAt      DateTime @default(now())

  @@map("summer_camp_registrations")
}

model ScholarshipApplication {
  id                  String   @id @default(cuid())
  // Personal
  applicantName       String
  email               String
  phone               String
  dob                 String
  address             String
  // Academic
  school              String
  grade               String
  gpa                 String
  intendedMajor       String?
  extracurriculars    String?  @db.Text
  // Essay
  essayText           String   @db.Text
  // Document URLs (Cloudinary)
  resumeUrl           String?
  transcriptUrl       String?
  recommendationUrl   String?
  // Admin
  status              String   @default("pending")
  reviewNotes         String?  @db.Text
  // Agreements
  certified           Boolean  @default(false)
  eSignature          String
  submittedAt         DateTime @default(now())

  @@map("scholarship_applications")
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String
  message   String   @db.Text
  createdAt DateTime @default(now())

  @@map("contact_submissions")
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())

  @@map("newsletter")
}
```

---

## FILE: prisma/seed.ts

```typescript
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const superadminEmail = process.env.SUPERADMIN_EMAIL
  if (!superadminEmail) {
    console.log('No SUPERADMIN_EMAIL set, skipping seed')
    return
  }

  // Seed superadmin allowed email
  await prisma.allowedEmail.upsert({
    where: { email: superadminEmail },
    update: {},
    create: { email: superadminEmail, role: Role.SUPERADMIN },
  })

  // Seed sample events
  await prisma.event.upsert({
    where: { slug: 'summer-camp-2025-kickoff' },
    update: {},
    create: {
      title: 'Summer Camp 2025 Kickoff',
      slug: 'summer-camp-2025-kickoff',
      date: new Date('2025-06-15T09:00:00'),
      location: '14120 Newbrook Dr Suite 200, Chantilly, VA 20151',
      description: '<p>Join us for the launch of our Summer Camp 2025! Fun activities, mentorship, and community building.</p>',
      highlightImage: 'https://placehold.co/800x450/1B3F6E/white?text=Summer+Camp+2025',
      published: true,
      authorId: 'seed', // will be set properly when real users exist
    },
  }).catch(() => {
    // ignore if author doesn't exist yet
  })

  console.log('✅ Database seeded')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## FILE: lib/prisma.ts

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## FILE: lib/auth.ts

```typescript
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      // Check if email is in the allowed list
      const allowed = await prisma.allowedEmail.findUnique({
        where: { email: user.email },
      })

      if (!allowed) return '/auth/signin?error=AccessDenied'

      // Upsert user record with role
      await prisma.user.upsert({
        where: { email: user.email },
        update: { name: user.name, image: user.image, role: allowed.role },
        create: {
          email: user.email,
          name: user.name,
          image: user.image,
          role: allowed.role,
        },
      })

      return true
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, role: true },
        })
        if (dbUser) {
          token.userId = dbUser.id
          token.role = dbUser.role
        }
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string
        session.user.role = token.role as Role
      }
      return session
    },
  },
})
```

---

## FILE: lib/permissions.ts

```typescript
import type { Role } from '@prisma/client'

export function canManageUsers(role: Role): boolean {
  return role === 'SUPERADMIN'
}

export function canDeleteContent(role: Role): boolean {
  return role === 'SUPERADMIN'
}

export function canPostEvents(role: Role): boolean {
  return role === 'SUPERADMIN' || role === 'COORDINATOR'
}

export function canViewSubmissions(role: Role): boolean {
  return role === 'SUPERADMIN' || role === 'COORDINATOR'
}

export function canExportData(role: Role): boolean {
  return role === 'SUPERADMIN'
}

export function canUpdateApplicationStatus(role: Role): boolean {
  return role === 'SUPERADMIN' || role === 'COORDINATOR'
}
```

---

## FILE: lib/cloudinary.ts

```typescript
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function uploadToCloudinary(
  file: Buffer,
  folder: string = 'core-es',
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: resourceType },
        (error, result) => {
          if (error || !result) return reject(error)
          resolve({ url: result.secure_url, publicId: result.public_id })
        }
      )
      .end(file)
  })
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

export default cloudinary
```

---

## FILE: lib/email.ts

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@core-es.org'
const ADMIN = process.env.ADMIN_EMAIL ?? 'info@core-es.org'

export async function sendContactEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return resend.emails.send({
    from: FROM,
    to: ADMIN,
    replyTo: data.email,
    subject: `[CORE-ES Contact] ${data.subject} — from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br/>')}</p>
    `,
  })
}

export async function sendRegistrationConfirmation(data: {
  parentEmail: string
  parentName: string
  studentName: string
  registrationId: string
}) {
  return resend.emails.send({
    from: FROM,
    to: data.parentEmail,
    subject: `CORE-ES Summer Camp Registration Confirmed — ${data.studentName}`,
    html: `
      <h2>Registration Confirmed!</h2>
      <p>Dear ${data.parentName},</p>
      <p>Thank you for registering <strong>${data.studentName}</strong> for the CORE Educational Services Summer Camp.</p>
      <p><strong>Registration ID:</strong> ${data.registrationId}</p>
      <p>Our team will be in touch with further details. If you have any questions, please contact us at ${ADMIN}.</p>
      <br/>
      <p>Warm regards,<br/>CORE Educational Services Team<br/>14120 Newbrook Dr Suite 200, Chantilly, VA 20151</p>
    `,
  })
}

export async function sendScholarshipConfirmation(data: {
  email: string
  name: string
  applicationId: string
}) {
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `CORE-ES Scholarship Application Received — ${data.name}`,
    html: `
      <h2>Application Received</h2>
      <p>Dear ${data.name},</p>
      <p>Thank you for applying for the CORE Educational Services Scholarship.</p>
      <p><strong>Application ID:</strong> ${data.applicationId}</p>
      <p>Our review committee will evaluate your application and be in touch. Thank you for taking this step toward your future.</p>
      <br/>
      <p>Warm regards,<br/>CORE Educational Services Team</p>
    `,
  })
}

export { resend }
```

---

## FILE: lib/utils.ts

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str
}
```

---

## FILE: middleware.ts (root of project)

```typescript
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default auth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    if (!req.auth) {
      const signInUrl = new URL('/auth/signin', req.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Only SUPERADMIN can access /admin/users
    if (pathname.startsWith('/admin/users')) {
      if (req.auth.user?.role !== 'SUPERADMIN') {
        return NextResponse.redirect(new URL('/admin/forbidden', req.url))
      }
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
```

---

## FILE: next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Hostinger VPS deployment
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
```

---

## FILE: tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B3F6E',
          light: '#2C5F9E',
          dark: '#122D50',
        },
        accent: {
          DEFAULT: '#4CAF7D',
          warm: '#E8A020',
          light: '#6DC996',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## FILE: app/layout.tsx (Root)

```tsx
import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CORE Educational Services | Chantilly, VA',
    template: '%s | CORE Educational Services',
  },
  description:
    'CORE Educational Services is a 501(c)(3) non-profit providing mentoring, academic support, and youth development programs in Northern Virginia since 2017.',
  keywords: [
    'educational services',
    'youth mentoring',
    'Chantilly VA',
    'non-profit',
    'after school programs',
    'summer camp',
    'SAT prep',
    'scholarship',
    'Northern Virginia',
  ],
  openGraph: {
    siteName: 'CORE Educational Services',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${sourceSans.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

---

## FILE: app/(public)/layout.tsx

```tsx
import { Header } from '@/components/public/Header'
import { Footer } from '@/components/public/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

---

## FILE: app/(admin)/layout.tsx

```tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/Sidebar'
import { AdminTopBar } from '@/components/admin/TopBar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar role={session.user.role} userName={session.user.name ?? ''} userImage={session.user.image ?? ''} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopBar user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

---

## FILE: app/auth/signin/page.tsx

```tsx
'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function SignInPage() {
  const params = useSearchParams()
  const error = params.get('error')
  const callbackUrl = params.get('callbackUrl') ?? '/admin'

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold font-playfair">CE</span>
          </div>
          <h1 className="text-2xl font-bold font-playfair text-primary">CORE Educational Services</h1>
          <p className="text-gray-500 text-sm mt-1">Staff Portal</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
            {error === 'AccessDenied'
              ? 'Access restricted to authorized CORE-ES staff only. Contact your administrator.'
              : 'An error occurred. Please try again.'}
          </div>
        )}

        {/* Sign in button */}
        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-poppins font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          Only authorized CORE-ES personnel can access this portal.
        </p>
      </div>
    </div>
  )
}
```

---

## FILE: app/api/auth/[...nextauth]/route.ts

```typescript
import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
```

---

## FILE: types/next-auth.d.ts

```typescript
import type { Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    role?: Role
  }
}
```

---

## FILE: app/(public)/page.tsx (Home — scaffold only)

```tsx
import { HeroSection } from '@/components/public/HeroSection'
import { StatsSection } from '@/components/public/StatsSection'
import { AboutPreview } from '@/components/public/AboutPreview'
import { ProgramsGrid } from '@/components/public/ProgramsGrid'
import { EventsCarousel } from '@/components/public/EventsCarousel'
import { GallerySection } from '@/components/public/GallerySection'
import { DonationBanner } from '@/components/public/DonationBanner'
import { TestimonialsSection } from '@/components/public/TestimonialsSection'
import { NewsletterSection } from '@/components/public/NewsletterSection'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  // Fetch latest published events for carousel
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
    take: 6,
    include: { author: { select: { name: true } } },
  })

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ProgramsGrid />
      <EventsCarousel events={events} />
      <GallerySection />
      <DonationBanner />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
```

---

## FILE: components/public/Header.tsx (scaffold)

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Instagram, Facebook, Twitter, Linkedin, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Programs',
    href: '#',
    children: [
      { label: 'Summer Camp Registration', href: '/registration/summer-camp' },
      { label: 'Core Scholarship', href: '/registration/scholarship' },
      { label: 'After School Program', href: '/about#programs' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

const SOCIAL_LINKS = [
  { icon: Instagram, href: 'https://instagram.com/corees', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/corees', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/corees', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/core-es', label: 'LinkedIn' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white transition-shadow duration-300',
        scrolled ? 'shadow-md' : 'shadow-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* Replace with actual logo: */}
            {/* <Image src="/logo.png" alt="CORE-ES" width={140} height={40} /> */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold font-poppins">CE</span>
              </div>
              <div>
                <div className="text-primary font-bold font-poppins text-sm leading-tight">CORE EDUCATIONAL</div>
                <div className="text-accent text-xs font-poppins">SERVICES</div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center gap-1 text-gray-700 hover:text-primary text-sm font-poppins font-medium py-2">
                    {link.label} <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-700 hover:text-primary text-sm font-poppins font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: Socials + Donate */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-1.5 text-gray-500 hover:text-primary transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <Link
              href="/donate"
              className="bg-accent hover:bg-accent/90 text-white font-poppins font-semibold text-sm px-4 py-2 rounded-full transition-colors"
            >
              Donate
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white pb-4">
          <nav className="container mx-auto px-4 flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-3 py-2 font-poppins font-semibold text-sm text-gray-500">{link.label}</div>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block pl-6 pr-3 py-2 text-sm text-gray-700 hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-poppins font-medium text-gray-700 hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-4 px-3 flex items-center justify-between">
              <div className="flex gap-2">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="p-2 text-gray-500 hover:text-primary">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <Link href="/donate" onClick={() => setMobileOpen(false)}
                className="bg-accent text-white font-poppins font-semibold text-sm px-5 py-2 rounded-full">
                Donate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
```

---

## FILE: app/api/contact/route.ts

```typescript
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendContactEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(20).max(2000),
  honeypot: z.string().max(0, 'Bot detected'), // must be empty
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Save to DB
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    })

    // Send email notification
    await sendContactEmail(data).catch(console.error) // don't fail if email fails

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## FILE: app/api/upload/route.ts

```typescript
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadToCloudinary } from '@/lib/cloudinary'

const MAX_SIZE_IMAGE = 10 * 1024 * 1024 // 10MB
const MAX_SIZE_VIDEO = 50 * 1024 * 1024 // 50MB

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) ?? 'core-es'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const isVideo = file.type.startsWith('video/')
    const maxSize = isVideo ? MAX_SIZE_VIDEO : MAX_SIZE_IMAGE

    if (file.size > maxSize) {
      return NextResponse.json({ error: `File too large. Max: ${maxSize / 1024 / 1024}MB` }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadToCloudinary(buffer, folder, isVideo ? 'video' : 'image')

    return NextResponse.json(result)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

---

## FILE: app/api/events/route.ts

```typescript
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

const eventSchema = z.object({
  title: z.string().min(3).max(200),
  date: z.string(),
  location: z.string().min(3),
  description: z.string().min(10),
  highlightImage: z.string().url().optional().or(z.literal('')),
  mediaUrls: z.array(z.string().url()).optional(),
  published: z.boolean().optional(),
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') ?? '10')
  const upcoming = searchParams.get('upcoming') === 'true'

  const events = await prisma.event.findMany({
    where: {
      published: true,
      ...(upcoming ? { date: { gte: new Date() } } : {}),
    },
    orderBy: { date: 'desc' },
    take: limit,
    include: { author: { select: { name: true, image: true } } },
  })

  return NextResponse.json(events)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = eventSchema.parse(body)

    const slug = slugify(data.title)

    const event = await prisma.event.create({
      data: {
        title: data.title,
        slug,
        date: new Date(data.date),
        location: data.location,
        description: data.description,
        highlightImage: data.highlightImage || null,
        mediaUrls: data.mediaUrls ?? [],
        published: data.published ?? false,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## FILE: app/api/submissions/summer-camp/route.ts

```typescript
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendRegistrationConfirmation } from '@/lib/email'

const schema = z.object({
  studentName: z.string().min(2),
  dob: z.string(),
  grade: z.string(),
  school: z.string(),
  allergies: z.string().optional(),
  tshirtSize: z.string(),
  parentName: z.string().min(2),
  relationship: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  emergencyName: z.string(),
  emergencyPhone: z.string(),
  sessionChoice: z.string(),
  heardFrom: z.string().optional(),
  specialRequests: z.string().optional(),
  termsAccepted: z.literal(true),
  medicalRelease: z.literal(true),
  photoRelease: z.literal(true),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const registration = await prisma.summerCampRegistration.create({ data })

    // Send confirmation email (non-blocking)
    sendRegistrationConfirmation({
      parentEmail: data.email,
      parentName: data.parentName,
      studentName: data.studentName,
      registrationId: registration.id,
    }).catch(console.error)

    return NextResponse.json({ success: true, id: registration.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
```

---

## FILE: app/admin/page.tsx (Dashboard)

```tsx
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, GraduationCap, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const session = await auth()

  const [eventCount, campCount, scholarshipCount] = await Promise.all([
    prisma.event.count({ where: { published: true } }),
    prisma.summerCampRegistration.count(),
    prisma.scholarshipApplication.count(),
  ])

  const recentCamp = await prisma.summerCampRegistration.findMany({
    orderBy: { submittedAt: 'desc' },
    take: 5,
  })

  const stats = [
    { title: 'Published Events', value: eventCount, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Camp Registrations', value: campCount, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Scholarship Apps', value: scholarshipCount, icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Programs Active', value: 6, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-playfair text-gray-900">
          Welcome back, {session?.user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening at CORE Educational Services</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${s.bg}`}>
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold font-poppins text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <Link href="/admin/events/new"
          className="bg-primary text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors">
          + Post New Event
        </Link>
        <Link href="/admin/submissions/summer-camp"
          className="bg-white text-primary border border-primary font-poppins font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-primary/5 transition-colors">
          View Registrations
        </Link>
      </div>

      {/* Recent registrations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-poppins">Recent Camp Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          {recentCamp.length === 0 ? (
            <p className="text-gray-400 text-sm">No registrations yet.</p>
          ) : (
            <div className="divide-y">
              {recentCamp.map((r) => (
                <div key={r.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{r.studentName}</p>
                    <p className="text-xs text-gray-500">{r.email} · {r.sessionChoice}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-poppins ${
                    r.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {r.paymentStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## FILE: app/admin/forbidden/page.tsx

```tsx
import Link from 'next/link'
import { ShieldX } from 'lucide-react'

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <ShieldX className="w-16 h-16 text-red-400 mb-4" />
      <h1 className="text-2xl font-bold font-playfair text-gray-800 mb-2">Access Restricted</h1>
      <p className="text-gray-500 mb-6">You don't have permission to view this page. Please contact your administrator.</p>
      <Link href="/admin" className="bg-primary text-white font-poppins px-6 py-2 rounded-lg hover:bg-primary-dark">
        Back to Dashboard
      </Link>
    </div>
  )
}
```

---

## FILE: app/not-found.tsx

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
      <div className="text-8xl font-bold font-playfair text-primary/20 mb-4">404</div>
      <h1 className="text-3xl font-bold font-playfair text-primary mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="bg-primary text-white font-poppins font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">
        Back to Home
      </Link>
    </div>
  )
}
```

---

## FOLDER STRUCTURE (create these empty files so Cursor can fill them)

```bash
# Run this in terminal to create all empty page files
mkdir -p app/\(public\)/{about,contact,events,donate/{success},registration/{summer-camp,scholarship}}
mkdir -p app/\(admin\)/admin/{events/{new},submissions/{summer-camp,scholarship},users}
mkdir -p app/auth/{signin,error}
mkdir -p components/{public,admin}
mkdir -p lib public/images

touch app/\(public\)/about/page.tsx
touch app/\(public\)/contact/page.tsx
touch app/\(public\)/events/page.tsx
touch "app/(public)/events/[slug]/page.tsx"
touch app/\(public\)/donate/page.tsx
touch app/\(public\)/donate/success/page.tsx
touch app/\(public\)/registration/summer-camp/page.tsx
touch app/\(public\)/registration/scholarship/page.tsx
touch app/\(admin\)/admin/events/page.tsx
touch app/\(admin\)/admin/events/new/page.tsx
touch "app/(admin)/admin/events/[id]/edit/page.tsx"
touch app/\(admin\)/admin/submissions/summer-camp/page.tsx
touch app/\(admin\)/admin/submissions/scholarship/page.tsx
touch app/\(admin\)/admin/users/page.tsx

touch components/public/{Header,Footer,HeroSection,StatsSection,AboutPreview,ProgramsGrid,EventsCarousel,GallerySection,DonationBanner,TestimonialsSection,NewsletterSection}.tsx
touch components/admin/{Sidebar,TopBar,EventEditor,DataTable,UserManager}.tsx

touch app/api/events/route.ts
touch "app/api/events/[id]/route.ts"
touch app/api/contact/route.ts
touch app/api/upload/route.ts
touch app/api/submissions/summer-camp/route.ts
touch app/api/submissions/scholarship/route.ts
touch "app/api/submissions/scholarship/[id]/status/route.ts"
touch app/api/admin/users/route.ts
touch "app/api/admin/users/[id]/route.ts"
touch app/api/newsletter/route.ts
```

---

## HOSTINGER DEPLOYMENT GUIDE

### What You Need:
- **Hostinger VPS KVM 1** plan (~$5-8/month) with Ubuntu 22.04
- **Neon.tech** free PostgreSQL (or Hostinger's own MySQL — but PostgreSQL preferred)
- Your domain pointed to Hostinger

### Server Setup (run once via SSH):

```bash
# 1. Connect to your VPS
ssh root@YOUR_SERVER_IP

# 2. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Install PM2 (process manager)
npm install -g pm2

# 4. Install Nginx (web server / reverse proxy)
apt-get install -y nginx

# 5. Install Git
apt-get install -y git
```

### Nginx Config (`/etc/nginx/sites-available/core-es`):

```nginx
server {
    listen 80;
    server_name core-es.org www.core-es.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site and add SSL
ln -s /etc/nginx/sites-available/core-es /etc/nginx/sites-enabled/
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d core-es.org -d www.core-es.org
nginx -t && systemctl reload nginx
```

### Deploy Script (`deploy.sh` — run on server):

```bash
#!/bin/bash
set -e

APP_DIR="/var/www/core-es"

echo "📦 Pulling latest code..."
cd $APP_DIR && git pull origin main

echo "📦 Installing dependencies..."
npm ci

echo "🏗️ Building..."
npm run build

echo "🔄 Restarting with PM2..."
pm2 restart core-es || pm2 start npm --name "core-es" -- start

echo "✅ Deployed!"
```

### PM2 Ecosystem File (`ecosystem.config.js`):

```javascript
module.exports = {
  apps: [{
    name: 'core-es',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/core-es',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      // All env vars go here OR use a .env.production file
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
  }]
}
```

### First Deploy:

```bash
# On server:
cd /var/www
git clone https://github.com/YOUR_REPO/core-es.git
cd core-es
cp .env.local.example .env.production.local
nano .env.production.local   # fill in all values
npm ci
npx prisma migrate deploy
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # follow the instructions it prints
```

---

## PAYMENTS — PLACEHOLDER ONLY

The donate page currently shows:
- **Zelle:** Display email + instructions (no API needed)
- **PayPal:** Display PayPal.Me link button (no API needed)  
- **Credit Card:** Empty tab with "Coming Soon" or a contact form to arrange payment

To add real card processing later, the plan doc (CORE_ES_Project_Plan.md) has the full Stripe sprint ready to go.

---

## QUICK CURSOR PROMPTS — USE THESE AS YOU GO

### Fill in the Home Page Hero:
```
Build the HeroSection component at components/public/HeroSection.tsx.
Full-viewport hero with navy blue gradient background (#1B3F6E to #122D50), 
subtle animated background with CSS gradient mesh effect.
Large Playfair Display heading: "Empowering Youth Through Education"
Source Sans 3 subheading: "Mentoring, Academic Support & Community Building in Northern Virginia"
Two CTA buttons: "Explore Programs" (white outlined) and "Donate Now" (accent green filled).
Fade-in animation on load using CSS keyframes and animation-delay for stagger effect.
Scroll indicator arrow at bottom.
Fully mobile responsive.
```

### Fill in the Footer:
```
Build the Footer component at components/public/Footer.tsx.
4-column grid layout on desktop, 2-column on tablet, 1-column on mobile.
Dark navy background (#1B3F6E), white text.
Col 1: CORE-ES logo/name, tagline "For Next Generation", address, email.
Col 2: Quick Links list (Home, About, Programs, Events, Contact).
Col 3: Programs list (After School, Weekend School, SAT Course, Summer Camp, Scholarship).
Col 4: Connect - social icons (Instagram, Facebook, Twitter, LinkedIn) + Donate button.
Bottom bar: Copyright 2025, 501(c)(3) notice, Tax ID placeholder.
All links use Next.js Link component.
```

### Build the Admin Sidebar:
```
Build AdminSidebar component at components/admin/Sidebar.tsx.
Props: role (Role), userName (string), userImage (string).
Fixed sidebar, navy background (#1B3F6E), white text.
Top: CORE-ES logo area.
Nav items with lucide-react icons:
  - Dashboard (LayoutDashboard) → /admin
  - Events (Calendar) → /admin/events  
  - Camp Registrations (Users) → /admin/submissions/summer-camp
  - Scholarship Apps (GraduationCap) → /admin/submissions/scholarship
  - User Access (Shield) → /admin/users — ONLY show if role === SUPERADMIN
  - Settings (Settings) → /admin/settings (placeholder)
Active state: accent green background pill on active link.
Bottom: Avatar + name + role badge + Sign Out button (uses next-auth signOut).
Collapsible on mobile via a hamburger toggle.
Use usePathname() for active link detection.
```
