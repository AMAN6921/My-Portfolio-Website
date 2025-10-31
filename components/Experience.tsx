'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Award } from 'lucide-react';
import { ExperienceItem } from '@/data/types';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
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
      id="experience"
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-dark-900 to-dark-950"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 id="experience-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-3 sm:mb-4 font-outfit">
            Experience
          </h2>
          <p className="text-base sm:text-lg text-dark-400 font-outfit">
            My professional journey and contributions
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12" role="list" aria-label="Work experience timeline">
          {experiences.map((experience, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, x: -100 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ 
                duration: 1, 
                delay: index * 0.2, 
                ease: "easeInOut",
                opacity: { duration: 0.8 }
              }}
              className="relative"
              role="listitem"
              aria-labelledby={`experience-position-${index}`}
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-500/30 hidden md:block" aria-hidden="true" />
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-6 w-4 h-4 bg-primary-500 rounded-full -ml-[7px] hidden md:block border-4 border-dark-950 shadow-lg shadow-primary-500/50" aria-hidden="true" />

              {/* Content Card */}
              <div className="md:ml-12 bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-primary-500/30 rounded-lg p-5 sm:p-6 shadow-lg shadow-primary-500/10 hover:shadow-xl hover:shadow-primary-500/20 hover:border-primary-400/50 transition-all duration-500 ease-out">
                {/* Header */}
                <div className="mb-4">
                  <h3 id={`experience-position-${index}`} className="text-xl sm:text-2xl font-bold text-primary-300 mb-3">
                    {experience.position}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-dark-300">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                      <span className="font-medium">{experience.organization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                      <time dateTime={experience.duration}>{experience.duration}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="mb-4">
                  <h4 className="text-base sm:text-lg font-semibold text-dark-100 mb-3 font-outfit">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2" role="list">
                    {experience.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-dark-200 font-work"
                      >
                        <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                {experience.highlights && experience.highlights.length > 0 && (
                  <div className="bg-accent-500/10 rounded-lg p-4 border border-accent-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-accent-400 flex-shrink-0" aria-hidden="true" />
                      <h4 className="text-base sm:text-lg font-semibold text-dark-100 font-outfit">
                        Highlights & Achievements
                      </h4>
                    </div>
                    <ul className="space-y-2" role="list">
                      {experience.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm sm:text-base text-dark-200 font-work"
                        >
                          <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                          <span className="font-medium">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
