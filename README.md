# Portfolio Site with Admin CMS

A modern, responsive portfolio website built with Next.js, Prisma, and NextAuth.js. Features a public portfolio, blog system, and a private admin dashboard for content management.

## Features

- **Public Site**: Home, About, Projects, Contact, and Blog pages.
- **Admin Dashboard**: Secure admin area to manage content.
- **Blog System**: Create, edit, and delete blog posts with a rich-text editor (TipTap).
- **Image Upload**: Upload and optimize images for blog posts.
- **Authentication**: Secure login for admin users.
- **Responsive Design**: Optimized for mobile and desktop.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (Development) / PostgreSQL (Production ready)
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Styling**: CSS Modules
- **Editor**: TipTap

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed the admin user:
   ```bash
   npm run seed
   ```
   Default credentials:
   - Email: `admin@example.com`
   - Password: `tempPassword123`

6. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.
   Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin).

## Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Set the environment variables in Vercel project settings:
   - `NEXTAUTH_URL`: Your production URL (e.g., `https://your-site.vercel.app`)
   - `NEXTAUTH_SECRET`: A strong random string.
   - `DATABASE_URL`: Your production database URL (e.g., from Vercel Postgres or Supabase).
4. Redeploy.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and configurations (Prisma, Auth).
- `prisma/`: Database schema and migrations.
- `public/`: Static assets.

## License

MIT
