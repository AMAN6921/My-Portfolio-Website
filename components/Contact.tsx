'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

interface ContactProps {
  email: string;
  github: string;
  linkedin: string;
}

export default function Contact({ email, github, linkedin }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      color: 'text-dark-200',
      bgColor: 'bg-gradient-to-br from-dark-800/30 to-dark-700/30',
      hoverColor: 'hover:from-dark-700/40 hover:to-dark-600/40',
      action: handleCopyEmail,
      showCopy: true,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: github.replace('https://github.com/', '@'),
      href: github,
      color: 'text-dark-200',
      bgColor: 'bg-gradient-to-br from-dark-800/30 to-dark-700/30',
      hoverColor: 'hover:from-dark-700/40 hover:to-dark-600/40',
      external: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: linkedin,
      color: 'text-dark-200',
      bgColor: 'bg-gradient-to-br from-dark-800/30 to-dark-700/30',
      hoverColor: 'hover:from-dark-700/40 hover:to-dark-600/40',
      external: true,
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <AnimatedBackground variant="orbs" />
      <motion.div className="max-w-4xl w-full" style={{ opacity, scale }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.h2 
            id="contact-heading" 
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-3 sm:mb-4 font-outfit cursor-default"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Let&apos;s Connect
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto px-4 font-work">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to collaborate. 
            Feel free to reach out through any of the channels below!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6" aria-label="Contact methods">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                initial={{ opacity: 0, y: 50, x: index === 0 ? -30 : index === 2 ? 30 : 0 }}
                animate={isVisible ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                href={method.href}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
                className={`${method.bgColor} ${method.hoverColor} rounded-xl p-5 sm:p-6 min-h-[140px] transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 border border-primary-500/30 hover:border-primary-400/50 group relative focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950 backdrop-blur-sm`}
                onClick={(e) => {
                  if (method.action) {
                    e.preventDefault();
                    method.action();
                  }
                }}
                aria-label={method.external ? `${method.label}: ${method.value} (opens in new tab)` : `${method.label}: ${method.value}`}
              >
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <motion.div 
                    className={`${method.color} p-3 sm:p-4 rounded-full bg-dark-800/70 shadow-sm`} 
                    aria-hidden="true"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={28} className="sm:w-8 sm:h-8" />
                  </motion.div>
                  <div className="min-w-0 w-full">
                    <motion.h3 
                      className="font-semibold text-dark-100 text-base sm:text-lg mb-1 cursor-default"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {method.label}
                    </motion.h3>
                    <p className={`${method.color} text-xs sm:text-sm font-medium break-all px-2`}>
                      {method.value}
                    </p>
                  </div>
                  {method.showCopy && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCopyEmail();
                      }}
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-dark-800/70 hover:bg-dark-700/70 active:bg-dark-600/70 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950"
                      aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
                    >
                      {copied ? (
                        <Check size={18} className="text-green-600" aria-hidden="true" />
                      ) : (
                        <Copy size={18} className="text-gray-600" aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>


      </motion.div>
    </section>
  );
}
