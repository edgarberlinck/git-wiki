# Git Wiki

A modern Wiki generator for GitHub repositories. Create beautiful documentation from your repository's `/docs` folder with fine-grained access control.

## Features

- 📚 **Automatic Documentation**: Simply place Markdown files in your repo's `/docs` folder
- 🔐 **Access Control**: Choose between public or private wikis
- 👥 **User Management**: Invite collaborators by GitHub username
- 🎨 **Beautiful UI**: Built with Next.js, React 19, and Tailwind CSS
- 🔒 **GitHub Authentication**: Secure login with GitHub OAuth
- 📝 **Markdown Support**: Full GitHub Flavored Markdown (GFM) support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS + ShadCN UI
- **Authentication**: NextAuth.js v4 (GitHub Provider)
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Vitest
- **Language**: TypeScript

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- GitHub OAuth App credentials

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/edgarberlinck/git-wiki.git
cd git-wiki
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gitwiki?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here-generate-with-openssl-rand-base64-32"

# GitHub OAuth
GITHUB_ID="your-github-oauth-app-client-id"
GITHUB_SECRET="your-github-oauth-app-client-secret"
```

#### Creating GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps → New OAuth App
2. Set **Application name**: Git Wiki (or your preferred name)
3. Set **Homepage URL**: `http://localhost:3000`
4. Set **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
5. Click "Register application"
6. Copy the Client ID and generate a Client Secret
7. Add these to your `.env` file

#### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 4. Set up the database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Creating a Wiki

1. Sign in with your GitHub account
2. Click "Create Wiki" in the dashboard
3. Enter your wiki details:
   - **Wiki Name**: Display name for your wiki
   - **Description**: Optional description
   - **Repository URL**: Full GitHub repository URL (e.g., `https://github.com/username/repo`)
   - **Public/Private**: Choose whether the wiki is publicly accessible

### Adding Documentation

Add Markdown files to your repository's `/docs` folder. The wiki will automatically display this content with proper formatting.

### Managing Access

For private wikis:
1. Go to your wiki management page
2. Invite users by their GitHub username
3. Invited users can access the wiki after signing in

## Project Structure

```
git-wiki/
├── app/                      # Next.js app router
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth configuration
│   │   └── wikis/          # Wiki management API
│   ├── dashboard/          # Dashboard pages
│   ├── wiki/               # Wiki viewer pages
│   └── auth/               # Authentication pages
├── components/              # React components
│   └── ui/                 # ShadCN UI components
├── lib/                     # Utility functions
│   ├── auth.ts             # NextAuth configuration
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema
│   └── schema.prisma       # Prisma schema
└── __tests__/              # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI

## Database Schema

### User
Stores user information from GitHub authentication.

### Wiki
Represents a wiki connected to a GitHub repository.

### WikiAccess
Manages user access to private wikis.

### Account & Session
NextAuth.js tables for authentication.

## Development

### Running Tests

```bash
npm test
```

### Database Management

View database with Prisma Studio:

```bash
npx prisma studio
```

Create a new migration:

```bash
npx prisma migrate dev --name your_migration_name
```

## Deployment

### Environment Variables

Make sure to set all environment variables in your production environment:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: A secure random string
- `GITHUB_ID`: GitHub OAuth App Client ID
- `GITHUB_SECRET`: GitHub OAuth App Client Secret

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy

### Database

Deploy your PostgreSQL database using:
- [Neon](https://neon.tech)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- Or any PostgreSQL hosting provider

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.
