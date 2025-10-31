'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SkillCategory } from '@/data/types';
import * as SimpleIcons from 'react-icons/si';
import { useEffect, useRef, useState } from 'react';
import AnimatedBackground from './AnimatedBackground';

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
    return Icon ? <Icon className="w-full h-full" /> : null;
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-900 to-dark-950 py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <AnimatedBackground variant="waves" />
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-3 sm:mb-4 font-outfit cursor-default"
          >
            Skills
          </h2>
          <p className="text-base sm:text-lg text-dark-400 font-outfit">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => {
            // Assign different gradient colors to each category
            const gradients = [
              'from-primary-600/20 to-primary-500/20 border-primary-400/40 hover:border-primary-300/60',
              'from-accent-600/20 to-accent-500/20 border-accent-400/40 hover:border-accent-300/60',
              'from-primary-600/20 to-accent-600/20 border-primary-400/40 hover:border-accent-300/60'
            ];
            const textColors = ['text-primary-300', 'text-accent-300', 'text-primary-300'];
            const iconColors = ['text-primary-400', 'text-accent-400', 'text-primary-400'];

            const gradient = gradients[categoryIndex % 3];
            const textColor = textColors[categoryIndex % 3];
            const iconColor = iconColors[categoryIndex % 3];

            return (
              <motion.article
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: categoryIndex * 0.08,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                whileHover={{ y: -3, transition: { duration: 0.15, ease: "easeOut" } }}
                className={`bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-xl p-6 sm:p-8 md:p-10 border shadow-lg hover:shadow-xl hover:shadow-primary-500/20 transition-shadow duration-200`}
                aria-labelledby={`skill-category-${categoryIndex}`}
              >
                <h3
                  id={`skill-category-${categoryIndex}`}
                  className={`text-xl sm:text-2xl md:text-3xl font-bold ${textColor} mb-6 sm:mb-8 text-center cursor-default tracking-wide font-outfit`}
                >
                  {category.category}
                </h3>
                <ul className="grid grid-cols-2 gap-3 sm:gap-4" role="list" aria-label={`${category.category} skills`}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.08 + skillIndex * 0.02,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.15, ease: "easeOut" }
                      }}
                      className="flex items-center gap-3 bg-dark-800/70 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-3 sm:py-4 min-h-[56px] border border-dark-700/50 hover:border-primary-400/60 hover:shadow-md hover:shadow-primary-500/10 transition-all duration-150 cursor-default group will-change-transform"
                    >
                      <span
                        className={`${iconColor} flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7`}
                        aria-hidden="true"
                      >
                        {getIcon(skill.icon)}
                      </span>
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-dark-100 group-hover:text-white truncate transition-colors duration-200 font-outfit">
                        {skill.name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
