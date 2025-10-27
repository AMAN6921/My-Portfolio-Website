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
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({ sections = defaultSections }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state for backdrop blur effect
      setIsScrolled(window.scrollY > 20);

      // Find active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header role="banner">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
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
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg px-2"
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
                  className={`px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                    activeSection === section.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
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
              className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
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

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-16 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            >
              <motion.div
                id="mobile-menu"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-white w-64 h-full shadow-xl"
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
                      className={`px-4 py-3 min-h-[44px] rounded-lg text-left font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                        activeSection === section.id
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100'
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
      </motion.nav>
    </header>
  );
}
