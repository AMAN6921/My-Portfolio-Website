'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  name: string;
  contacts: {
    email: string;
    github: string;
    linkedin: string;
  };
}

export default function Footer({ name, contacts }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-dark-900 to-dark-950 border-t border-primary-500/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Message Section */}
          <div>
            <motion.h3 
              className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-4 font-outfit"
              whileHover={{ scale: 1.05 }}
            >
              {name}
            </motion.h3>
            <div className="space-y-3">
              <p className="text-dark-300 text-sm font-work">
                💡 Got an idea? Let's collaborate!
              </p>
              <motion.a
                href={`mailto:${contacts.email}?subject=Let's Connect!`}
                whileHover={{ scale: 1.02, y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600/20 to-accent-600/20 backdrop-blur-sm border border-primary-500/30 rounded-lg hover:border-primary-400/50 transition-all duration-200 group"
              >
                <Mail className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-dark-200 group-hover:text-primary-300 font-work">
                  Send me a message
                </span>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary-300 mb-4 font-outfit">Quick Links</h4>
            <ul className="space-y-2">
              {['Projects', 'Skills', 'Experience', 'Achievements', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    className="text-dark-300 hover:text-primary-400 text-sm transition-colors duration-200 font-work"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-lg font-semibold text-primary-300 mb-4 font-outfit">Connect</h4>
            <div className="flex gap-4">
              <motion.a
                href={`mailto:${contacts.email}`}
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-3 bg-dark-800/50 rounded-lg border border-primary-500/30 hover:border-primary-400/50 transition-all duration-200 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-primary-400 group-hover:text-primary-300" />
              </motion.a>
              <motion.a
                href={contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-3 bg-dark-800/50 rounded-lg border border-primary-500/30 hover:border-primary-400/50 transition-all duration-200 group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-primary-400 group-hover:text-primary-300" />
              </motion.a>
              <motion.a
                href={contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="p-3 bg-dark-800/50 rounded-lg border border-primary-500/30 hover:border-primary-400/50 transition-all duration-200 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-primary-400 group-hover:text-primary-300" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-500/20 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-dark-400 text-sm font-work">
              © {currentYear} {name}. All rights reserved.
            </p>
            <p className="text-dark-500 text-xs mt-1 font-work">
              Designed & Built with <Heart className="w-3 h-3 inline text-red-500" /> by {name}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm">
            <motion.a
              href="/privacy"
              className="text-dark-400 hover:text-primary-400 transition-colors duration-200 font-work"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/terms"
              className="text-dark-400 hover:text-primary-400 transition-colors duration-200 font-work"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gradient-to-r from-primary-600/90 to-primary-700/90 rounded-full shadow-lg hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Trademark Notice */}
        <div className="mt-6 text-center">
          <p className="text-dark-500 text-xs font-work">
            ™ Aman Devrani's Portfolio. All trademarks and registered trademarks are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
