'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, GraduationCap, Briefcase } from 'lucide-react';

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
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 py-20 pt-24"
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Name with gradient text effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 px-2"
        >
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {name}
          </span>
        </motion.h1>

        {/* Professional title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mb-6 px-2"
        >
          {title}
        </motion.p>

        {/* Badges: Location, Education, Current Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-8 px-2"
        >
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700">{education}</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
            <Briefcase className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700">{currentRole}</span>
          </div>
        </motion.div>

        {/* Professional summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed px-4"
        >
          {summary}
        </motion.p>

        {/* CTA Buttons - Touch-friendly with 44px minimum height */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 w-full sm:w-auto max-w-md sm:max-w-none mx-auto"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="px-6 sm:px-8 py-3 min-h-[44px] bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Navigate to projects section"
          >
            View My Projects
          </button>
          
          <a
            href="/resume.pdf"
            download
            className="px-6 sm:px-8 py-3 min-h-[44px] flex items-center justify-center bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 active:bg-blue-100 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Download resume PDF"
          >
            Download Resume
          </a>
          
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 sm:px-8 py-3 min-h-[44px] bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 active:bg-black transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
            aria-label="Navigate to contact section"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Social Links - Touch-friendly with 44px minimum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-4 sm:gap-6"
          aria-label="Social media links"
        >
          <a
            href={`mailto:${contacts.email}`}
            className="flex items-center gap-2 p-2 min-h-[44px] text-gray-600 hover:text-blue-600 active:text-blue-700 transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg"
            aria-label={`Send email to ${contacts.email}`}
          >
            <Mail className="w-6 h-6 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="text-sm hidden sm:inline">Email</span>
          </a>
          
          <a
            href={contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 min-h-[44px] text-gray-600 hover:text-blue-600 active:text-blue-700 transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg"
            aria-label="Visit GitHub profile (opens in new tab)"
          >
            <Github className="w-6 h-6 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="text-sm hidden sm:inline">GitHub</span>
          </a>
          
          <a
            href={contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 min-h-[44px] text-gray-600 hover:text-blue-600 active:text-blue-700 transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg"
            aria-label="Visit LinkedIn profile (opens in new tab)"
          >
            <Linkedin className="w-6 h-6 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="text-sm hidden sm:inline">LinkedIn</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
