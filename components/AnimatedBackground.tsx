'use client';

import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'orbs' | 'grid' | 'waves';
}

export default function AnimatedBackground({ variant = 'orbs' }: AnimatedBackgroundProps) {
  if (variant === 'grid') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    );
  }

  if (variant === 'waves') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)`,
        }} />
      </div>
    );
  }

  // Default: orbs
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
    </div>
  );
}
