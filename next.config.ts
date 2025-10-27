import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Enable static site generation
  output: 'export',
  
  // Image optimization configuration
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression (enabled by default in production)
  compress: true,
  
  // Strict mode for better performance
  reactStrictMode: true,
  
  // Remove X-Powered-By header
  poweredByHeader: false,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
};

export default nextConfig;
