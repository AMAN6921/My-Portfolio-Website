'use client';

import { motion } from 'framer-motion';
import { SkillCategory } from '@/data/types';
import * as SimpleIcons from 'react-icons/si';
import { useEffect, useRef, useState } from 'react';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export default function Skills({ skillCategories }: SkillsProps) {
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

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = (SimpleIcons as any)[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-white py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 id="skills-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.article
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gray-50 rounded-lg p-5 sm:p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              aria-labelledby={`skill-category-${categoryIndex}`}
            >
              <h3 id={`skill-category-${categoryIndex}`} className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">
                {category.category}
              </h3>
              <ul className="grid grid-cols-2 gap-2 sm:gap-3" role="list" aria-label={`${category.category} skills`}>
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2 bg-white rounded-md px-2 sm:px-3 py-2 min-h-[44px] border border-gray-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-default"
                  >
                    <span className="text-blue-600 flex-shrink-0" aria-hidden="true">
                      {getIcon(skill.icon)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
