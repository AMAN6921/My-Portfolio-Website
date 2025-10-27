'use client';

import { motion } from 'framer-motion';
import { Certification } from '@/data/types';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
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

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-white py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="certifications-heading"
    >
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 id="certifications-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Certifications
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Professional certifications and credentials
          </p>
        </motion.div>

        <div className="space-y-5 sm:space-y-6" role="list" aria-label="Professional certifications">
          {certifications.map((certification, index) => {
            const hasCredentialLink = !!certification.credentialLink;

            return (
              <motion.article
                key={certification.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gray-50 rounded-lg p-5 sm:p-6 min-h-[100px] border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 ${
                  hasCredentialLink ? 'cursor-pointer hover:-translate-y-1 active:translate-y-0 focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2' : ''
                }`}
                onClick={() => {
                  if (certification.credentialLink) {
                    window.open(certification.credentialLink, '_blank', 'noopener,noreferrer');
                  }
                }}
                role="listitem"
                aria-labelledby={`certification-name-${certification.id}`}
                tabIndex={hasCredentialLink ? 0 : undefined}
                onKeyDown={(e) => {
                  if (hasCredentialLink && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    window.open(certification.credentialLink!, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 text-blue-600 bg-blue-100 p-2 sm:p-3 rounded-lg" aria-hidden="true">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2">
                      <h3 id={`certification-name-${certification.id}`} className="text-lg sm:text-xl font-semibold text-gray-900">
                        {certification.name}
                      </h3>
                      {hasCredentialLink && (
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1 hover:text-blue-600 transition-colors" aria-hidden="true" />
                      )}
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">
                      {certification.issuer}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <time dateTime={certification.date}>{certification.date}</time>
                    </div>
                    
                    {hasCredentialLink && (
                      <>
                        <div className="mt-3">
                          <span className="text-xs sm:text-sm text-blue-600 font-medium hover:text-blue-700" aria-hidden="true">
                            View Credential →
                          </span>
                        </div>
                        <span className="sr-only">Click to view credential (opens in new tab)</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
