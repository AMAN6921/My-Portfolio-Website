'use client';

import { motion } from 'framer-motion';
import { Achievement } from '@/data/types';
import { Code2, Users, Award, GraduationCap, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
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

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Code2,
      Users,
      Award,
      GraduationCap,
    };
    const Icon = icons[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : <Award className="w-8 h-8" />;
  };

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-950 to-dark-900 py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="achievements-heading"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 id="achievements-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-3 sm:mb-4 font-outfit">
            Achievements
          </h2>
          <p className="text-base sm:text-lg text-dark-400 font-outfit">
            Notable accomplishments and recognitions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" role="list" aria-label="Achievements">
          {achievements.map((achievement, index) => {
            const IconComponent = getIcon(achievement.icon);
            const isClickable = !!achievement.link;

            return (
              <motion.article
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-lg p-5 sm:p-6 min-h-[180px] flex flex-col border border-primary-500/30 hover:border-primary-400/50 hover:shadow-xl hover:shadow-primary-500/20 transition-all duration-200 ${
                  isClickable ? 'cursor-pointer hover:-translate-y-2 active:translate-y-0 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-dark-950' : 'hover:-translate-y-1'
                }`}
                onClick={() => {
                  if (achievement.link) {
                    window.open(achievement.link, '_blank', 'noopener,noreferrer');
                  }
                }}
                role="listitem"
                aria-labelledby={`achievement-title-${achievement.id}`}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    window.open(achievement.link!, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4 h-full">
                  <div className="flex-shrink-0 text-primary-400 bg-primary-500/20 p-2 sm:p-3 rounded-lg self-start" aria-hidden="true">
                    {IconComponent}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 id={`achievement-title-${achievement.id}`} className="text-base sm:text-lg font-semibold text-primary-300 font-outfit">
                        {achievement.title}
                      </h3>
                      {achievement.link && (
                        <ExternalLink className="w-4 h-4 text-dark-400 flex-shrink-0 mt-1" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-dark-200 leading-relaxed font-work flex-grow">
                      {achievement.description}
                    </p>
                    {achievement.link && (
                      <span className="sr-only">Click to view details (opens in new tab)</span>
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
