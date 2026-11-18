# 🌿 Hasiru Haadi

> Stories rooted in nature. A little digital world for plants, gardens, village life and sustainable living.

**Hasiru Haadi** is a nature-inspired website and small-business platform built around a personal journey with gardening, a family farm, village memories and a growing plant business.

🌍 **Live website:** https://hasiru-haadi-world.vercel.app

---

## ✨ Explore the website

The public website brings the different parts of Hasiru Haadi together through an interactive, map-led experience.

| Section | What you'll find |
| --- | --- |
| **World Map** | The central navigation point for exploring Hasiru Haadi |
| **Garden** | Backyard gardening, vegetable beds, irrigation and harvest stories |
| **Plants** | A personal plant journey and everyday growing experiences |
| **Farm** | Family farming, trees, seasonal crops and sustainable practices |
| **Village** | Stories and memories from Yerigenahalli |
| **Gallery** | A collection of photographs and moments |
| **Shop** | Plant and eco-friendly product listings with links to the store |
| **Journal** | Featured stories, journal collections and individual blog posts |

## 📝 Journal

The Journal is an editorial space for stories about gardening, village life, farming and the small moments behind Hasiru Haadi.

- Journal landing page: `/journal`
- Individual stories: `/journal/:slug`
- Featured story and latest-story collection
- Responsive story cards and article layouts
- Journal content can be managed through the admin area when Supabase is configured.

## 🔐 Admin CMS

The private admin area provides tools to manage website content without editing the React components for every update.

| Admin page | Route | Purpose |
| --- | --- | --- |
| Login | `/admin` | Sign in with the configured Supabase admin account |
| Dashboard | `/admin/dashboard` | Access the content-management sections |
| Media Library | `/admin/media` | Upload and manage website images |
| Journal Studio | `/admin/journal` | Create and manage journal stories |
| Shop Studio | `/admin/shop` | Add, edit, order and publish shop products |
| Page Content Studio | `/admin/content` | Update supported page headings, introductions and hero images |

The admin interface is protected by an authenticated route and an admin-email check. **Supabase Row Level Security (RLS) policies are essential**: frontend route checks alone are not a security boundary.

## 🧰 Tech stack

- **Frontend:** React 19
- **Build tool:** Vite
- **Routing:** React Router
- **Styling:** Custom CSS
- **Animation:** Framer Motion
- **Backend services:** Supabase Authentication, Database and Storage
- **Deployment:** Vercel

---

## 🚀 Run locally

### Prerequisites

- Node.js (LTS recommended)
- npm
- A Supabase project for admin CMS functionality

### 1. Clone the repository

```bash
git clone https://github.com/spandana-builds/hasiru-haadi-world.git
cd hasiru-haadi-world
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local file named `.env.local` in the project root. Use `.env.example` as the template:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
VITE_ADMIN_EMAIL=your-admin-email@example.com
```

Replace the placeholders with your Supabase project URL, a **publishable key (or legacy anon key)**, and the email address of the admin Auth user.

> Never put a Supabase service-role key or secret key in a `VITE_*` variable or commit it to Git. Vite exposes `VITE_*` values to the browser.

If Supabase environment variables are not configured, the public site can use its local fallback content, but CMS-backed features will not be available.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

### 5. Build for production

```bash
npm run build
```

To preview a production build locally:

```bash
npm run preview
```

---

## ☁️ Supabase configuration

The admin CMS uses Supabase services:

- **Authentication** for admin sign-in.
- **Database** for journal posts, shop products and page-content overrides.
- **Storage** for uploaded media in the public `hasiru-haadi-media` bucket.

Before using the CMS in a fresh Supabase project:

1. Create the admin user in Supabase Authentication.
2. Create/configure the database tables used by the Journal, Shop and Page Content sections.
3. Apply Row Level Security policies so public visitors can only read intended published/active content and only the authorized admin can make changes.
4. Create the `hasiru-haadi-media` storage bucket and configure upload/delete policies for the admin account.
5. Set the same admin email in `VITE_ADMIN_EMAIL` and in the relevant Supabase RLS policies.

Use a public bucket only for assets intended to be publicly viewable. Keep write permissions restricted to the admin. Do not disable RLS to make the CMS work.

---

## 🌱 Project structure

```text
src/
├── admin/          # Admin login, dashboard and CMS managers
├── components/     # Shared UI and map components
├── data/           # Local fallback story/content data
├── lib/            # Supabase client and content helpers
├── pages/          # Public website pages and Journal
└── App.jsx         # Application routes
```

---

## 🌼 Inspiration

Hasiru Haadi began with a small terrace garden during the COVID-19 lockdown. Reused containers, the excitement of a new leaf and the joy of growing plants gradually became a deeper connection with nature.

This website brings those experiences together — from a home garden to the family farm, from village memories to a small green business.

## 💚 Our belief

- Nature deserves care and patience.
- Small efforts can create meaningful change.
- Reuse what you can; grow what you love.
- Every place and every plant has a story.

## 🛍️ Find us

**Meesho store:** https://www.meesho.com/Hasiruhaadi?_ms=3.0.1

---

*Growing green, sharing goodness. 🌿*
