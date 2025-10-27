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
      className="py-16 sm:py-20 px-4 sm:px-6 bg-white"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 id="experience-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Experience
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            My professional journey and contributions
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-12" role="list" aria-label="Work experience timeline">
          {experiences.map((experience, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
              role="listitem"
              aria-labelledby={`experience-position-${index}`}
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" aria-hidden="true" />
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-6 w-4 h-4 bg-blue-600 rounded-full -ml-[7px] hidden md:block border-4 border-white shadow-lg" aria-hidden="true" />

              {/* Content Card */}
              <div className="md:ml-12 bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="mb-4">
                  <h3 id={`experience-position-${index}`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {experience.position}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
                      <span className="font-medium">{experience.organization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
                      <time dateTime={experience.duration}>{experience.duration}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="mb-4">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2" role="list">
                    {experience.description.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights */}
                {experience.highlights && experience.highlights.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-blue-600 flex-shrink-0" aria-hidden="true" />
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                        Highlights & Achievements
                      </h4>
                    </div>
                    <ul className="space-y-2" role="list">
                      {experience.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm sm:text-base text-gray-700"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
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
