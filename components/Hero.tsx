'use client';

import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import Image from 'next/image';

interface HeroProps {
  name: string;
  title: string;
  location: string;
  education: string;
  currentRole: string;
  summary: string;
  contacts: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export default function Hero({
  name,
  title,
  location,
  education,
  currentRole,
  summary,
  contacts,
}: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 px-4 sm:px-6 py-20 pt-24 relative overflow-hidden"
    >
      {/* Animated background gradient orbs */}
      <AnimatedBackground variant="orbs" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
        {/* Name with gradient text effect */}
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 px-2 font-outfit"
        >
          <motion.span
            className="bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400 bg-clip-text text-transparent inline-block cursor-default"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {name}
          </motion.span>
        </motion.h1>

        {/* Professional title */}
        <motion.p
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-dark-300 font-medium mb-6 px-2 font-outfit text-center lg:text-left"
        >
          {title}
        </motion.p>

        {/* Badges: Location, Education, Current Role */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4 mb-8 px-2">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-600/20 to-primary-500/20 backdrop-blur-sm rounded-full shadow-lg border border-primary-400/40 hover:border-primary-300/60 transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 5 }}
            >
              <MapPin className="w-4 h-4 text-primary-300 flex-shrink-0" />
            </motion.div>
            <span className="text-xs sm:text-sm text-primary-200 font-semibold tracking-wide font-outfit">{location}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-accent-600/20 to-accent-500/20 backdrop-blur-sm rounded-full shadow-lg border border-accent-400/40 hover:border-accent-300/60 transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 5 }}
            >
              <GraduationCap className="w-4 h-4 text-accent-300 flex-shrink-0" />
            </motion.div>
            <span className="text-xs sm:text-sm text-accent-200 font-semibold tracking-wide font-outfit">{education}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-600/20 to-accent-600/20 backdrop-blur-sm rounded-full shadow-lg border border-primary-400/40 hover:border-accent-300/60 transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <Briefcase className="w-4 h-4 text-primary-300 flex-shrink-0" />
            </motion.div>
            <span className="text-xs sm:text-sm text-primary-200 font-semibold tracking-wide font-outfit">{currentRole}</span>
          </motion.div>
        </div>

        {/* Professional summary */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-lg text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed px-4 font-work"
        >
          {summary}
        </motion.p>

        {/* CTA Buttons - Badge style */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4 mb-12 px-2">
          <motion.button
            initial={{ opacity: 0, x: -30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -3 }}
            onClick={() => scrollToSection('projects')}
            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-600/20 to-primary-500/20 backdrop-blur-sm rounded-full shadow-lg border border-primary-400/40 hover:border-primary-300/60 transition-all duration-200 text-xs sm:text-sm text-primary-200 font-semibold tracking-wide font-outfit"
            aria-label="Navigate to projects section"
          >
            View My Projects
          </motion.button>

          <motion.a
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -3 }}
            href="/resume.pdf"
            download
            className="flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-accent-600/20 to-accent-500/20 backdrop-blur-sm rounded-full shadow-lg border border-accent-400/40 hover:border-accent-300/60 transition-all duration-200 text-xs sm:text-sm text-accent-200 font-semibold tracking-wide font-outfit"
            aria-label="Download resume PDF"
          >
            Download Resume
          </motion.a>

          <motion.button
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -3 }}
            onClick={() => scrollToSection('contact')}
            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-600/20 to-accent-600/20 backdrop-blur-sm rounded-full shadow-lg border border-primary-400/40 hover:border-accent-300/60 transition-all duration-200 text-xs sm:text-sm text-primary-200 font-semibold tracking-wide font-outfit"
            aria-label="Navigate to contact section"
          >
            Contact Me
          </motion.button>
        </div>
        </div>

        {/* Right side - Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative group cursor-pointer"
          >
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            
            {/* Profile image */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <Image
                src="/profile.jpg"
                alt="Aman Devrani"
                width={384}
                height={384}
                className="relative w-full h-full rounded-full object-cover border-4 border-primary-500/50 shadow-2xl"
                priority
              />
              
              {/* Floating animation overlay */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-accent-500/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
