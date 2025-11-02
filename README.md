# Aman Devrani - Portfolio Website

A modern, responsive portfolio website built with Next.js 14+, TypeScript, and Tailwind CSS to showcase technical skills, projects, experience, and achievements.

## Tech Stack

- **Framework**: Next.js 16.0.0 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Icons**: React Icons & Lucide React
- **Font**: Inter (Google Fonts)

## Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main portfolio page
│   └── globals.css        # Global styles and design tokens
├── components/            # React components
├── data/                  # Data files (projects, skills, etc.)
├── public/               # Static assets
│   └── images/           # Project screenshots
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Accent**: Green (#10B981), Purple (#8B5CF6)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Inter
- **Font Sizes**: 12px - 48px scale
- **Font Weights**: 400, 500, 600, 700

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

My Portfolio - [amandevrani.vercel.app](https://amandevrani.vercel.app) to view my deployed portfolio in your browser.

## Features

- ✅ Responsive design (mobile-first approach)
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS with custom design tokens
- ✅ Smooth scroll navigation
- ✅ Framer Motion animations
- ✅ SEO optimized with metadata
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Performance optimized (< 3s load time)

## Development

The project follows a component-based architecture with:
- Reusable React components in `/components`
- Centralized data management in `/data`
- Custom design tokens in `globals.css`
- Type-safe development with TypeScript

## Deployment

This project is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
vercel

# Or connect your Git repository for automatic deployments
```

## License

© 2025 Aman Devrani. All rights reserved.
