'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';

interface ContactProps {
  email: string;
  github: string;
  linkedin: string;
}

export default function Contact({ email, github, linkedin }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      action: handleCopyEmail,
      showCopy: true,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: github.replace('https://github.com/', '@'),
      href: github,
      color: 'text-gray-900',
      bgColor: 'bg-gray-50',
      hoverColor: 'hover:bg-gray-100',
      external: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: linkedin,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      external: true,
    },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                href={method.href}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
                className={`${method.bgColor} ${method.hoverColor} rounded-xl p-5 sm:p-6 min-h-[140px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 border border-gray-200 group relative focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2`}
                onClick={(e) => {
                  if (method.action) {
                    e.preventDefault();
                    method.action();
                  }
                }}
                aria-label={method.external ? `${method.label}: ${method.value} (opens in new tab)` : `${method.label}: ${method.value}`}
              >
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <div className={`${method.color} p-3 sm:p-4 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                    <Icon size={28} className="sm:w-8 sm:h-8" />
                  </div>
                  <div className="min-w-0 w-full">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                      {method.label}
                    </h3>
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
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <p className="text-sm sm:text-base text-gray-600">
            Looking forward to hearing from you! 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}
