import type { Metadata } from "next";
import { Inter, Outfit, Work_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amandevrani.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aman Devrani's Portfolio",
    template: "%s | Aman Devrani's Portfolio",
  },
  description: "Portfolio of Aman Devrani - Computer Science student specializing in C++, Python, JavaScript, and Machine Learning. View projects, experience, and achievements.",
  keywords: [
    "Aman Devrani",
    "Software Engineer",
    "Portfolio",
    "Machine Learning",
    "Web Development",
    "C++",
    "Python",
    "JavaScript",
    "React",
    "Next.js",
    "Full Stack Developer",
  ],
  authors: [{ name: "Aman Devrani", url: siteUrl }],
  creator: "Aman Devrani",
  publisher: "Aman Devrani",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Aman Devrani | Software Engineer Portfolio",
    description: "Explore projects and experience in software development and ML. Specializing in C++, Python, JavaScript, React, and Machine Learning.",
    siteName: "Aman Devrani Portfolio",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Aman Devrani - Software Engineer & ML Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Devrani | Software Engineer Portfolio",
    description: "Explore projects and experience in software development and ML",
    images: [`${siteUrl}/og-image.png`],
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aman Devrani",
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    jobTitle: "Software Engineer & ML Enthusiast",
    description: "Computer Science student specializing in software development and machine learning",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "B.Tech Computer Science",
    },
    knowsAbout: [
      "Software Engineering",
      "Machine Learning",
      "C++",
      "Python",
      "JavaScript",
      "React",
      "Next.js",
      "Flask",
      "Node.js",
      "Data Structures and Algorithms",
    ],
    sameAs: [
      "https://github.com/AMAN6921",
      "https://www.linkedin.com/in/amandevrani",
      "https://leetcode.com/AMAN6921",
    ],
    email: "aman.devrani6921@gmail.com",
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${workSans.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-work">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
