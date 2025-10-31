'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  sections?: Array<{
    id: string;
    label: string;
  }>;
}

const defaultSections = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({ sections = defaultSections }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Update scroll state for backdrop blur effect
          setIsScrolled(window.scrollY > 20);

          // Calculate scroll progress
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;
          const scrollableHeight = documentHeight - windowHeight;
          const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
          setScrollProgress(progress);

          // Find active section based on scroll position
          const scrollPosition = window.scrollY + 150;

          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i].id);
            if (element && element.offsetTop <= scrollPosition) {
              setActiveSection(sections[i].id);
              break;
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header role="banner" className="sticky top-0 z-50">
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md shadow-lg shadow-primary-500/10 border-b border-primary-500/20 transition-all duration-300"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent hover:from-primary-300 hover:to-accent-300 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 rounded-lg px-2 font-outfit"
              aria-label="Go to home section"
            >
              Aman Devrani
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1" role="menubar">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 ${
                    activeSection === section.id
                      ? 'text-primary-300 bg-primary-500/20 border border-primary-500/30'
                      : 'text-dark-300 hover:text-primary-400 hover:bg-primary-500/10'
                  }`}
                  role="menuitem"
                  aria-label={`Navigate to ${section.label} section`}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button - Touch-friendly 44px minimum */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-dark-300 hover:bg-primary-500/20 transition-colors active:bg-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Scroll Progress Bar - Always Visible */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 shadow-lg shadow-primary-500/50"
            style={{ width: `${scrollProgress}%`, transformOrigin: 'left' }}
            transition={{ duration: 0.1 }}
          >
            {/* Animated glow effect at the end of progress bar */}
            {scrollProgress > 0 && (
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-primary-400"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-16 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            >
              <motion.div
                id="mobile-menu"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-dark-900 w-64 h-full shadow-xl border-r border-primary-500/20"
                onClick={(e) => e.stopPropagation()}
                role="menu"
                aria-label="Mobile navigation menu"
              >
                <nav className="flex flex-col p-4 space-y-2">
                  {sections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(section.id)}
                      className={`px-4 py-3 min-h-[44px] rounded-lg text-left font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 ${
                        activeSection === section.id
                          ? 'text-primary-300 bg-primary-500/20 border border-primary-500/30'
                          : 'text-dark-300 hover:text-primary-400 hover:bg-primary-500/10 active:bg-primary-500/20'
                      }`}
                      role="menuitem"
                      aria-label={`Navigate to ${section.label} section`}
                      aria-current={activeSection === section.id ? 'page' : undefined}
                    >
                      {section.label}
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
