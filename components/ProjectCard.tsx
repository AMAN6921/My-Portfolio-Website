'use client';

import { motion } from 'framer-motion';
import { Project } from '@/data/types';
import { Github, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible?: boolean;
}

export default function ProjectCard({ project, index, isVisible: parentVisible }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const visible = isVisible || parentVisible;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut"
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm rounded-lg border border-primary-500/30 shadow-lg shadow-primary-500/10 hover:shadow-xl hover:shadow-primary-500/20 hover:border-primary-400/50 transition-all duration-300 overflow-hidden"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="p-5 sm:p-6">
        {/* Header with title */}
        <div className="mb-4">
          <motion.h3 
            id={`project-title-${project.id}`} 
            className="text-xl sm:text-2xl font-bold text-primary-300 cursor-default"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {project.title}
          </motion.h3>
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
          {project.tech.map((tech, techIndex) => {
            // Assign different gradient colors to tech badges
            const gradients = [
              'bg-gradient-to-r from-primary-500/30 to-primary-600/30 border-primary-400/50 text-primary-200 hover:from-primary-500/40 hover:to-primary-600/40 hover:border-primary-300/70',
              'bg-gradient-to-r from-accent-500/30 to-accent-600/30 border-accent-400/50 text-accent-200 hover:from-accent-500/40 hover:to-accent-600/40 hover:border-accent-300/70',
              'bg-gradient-to-r from-primary-500/30 to-accent-500/30 border-primary-400/50 text-primary-200 hover:from-primary-500/40 hover:to-accent-500/40 hover:border-accent-300/70',
              'bg-gradient-to-r from-accent-600/30 to-primary-600/30 border-accent-400/50 text-accent-200 hover:from-accent-600/40 hover:to-primary-600/40 hover:border-primary-300/70'
            ];
            
            const gradient = gradients[techIndex % 4];
            
            return (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.5, y: -10 }}
                animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.15 + techIndex * 0.05,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                className={`px-3 sm:px-4 py-1.5 ${gradient} backdrop-blur-sm text-xs font-bold rounded-full border shadow-sm hover:shadow-md transition-all duration-200 cursor-default tracking-wide font-outfit`}
                role="listitem"
              >
                {tech}
              </motion.span>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-dark-200 mb-3 leading-relaxed font-work min-h-[60px]">
          {project.description}
        </p>

        {/* Impact/Results */}
        <p className="text-sm sm:text-base text-dark-300 mb-4 leading-relaxed font-work min-h-[48px]">
          <span className="font-semibold text-accent-400">Impact:</span>{' '}
          {project.impact}
        </p>

        {/* Accuracy metric if available, or spacer to maintain alignment */}
        <div className="mb-4 min-h-[56px] flex items-start">
          {project.accuracy && (
            <span className="px-4 py-2 bg-accent-500/20 text-accent-300 font-semibold rounded-lg border border-accent-500/40" role="status" aria-label={`Project accuracy: ${project.accuracy}`}>
              Accuracy: {project.accuracy}
            </span>
          )}
        </div>

        {/* Links - Touch-friendly with 44px minimum */}
        <div className="flex flex-wrap gap-3 mt-6">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 min-h-[44px] min-w-[120px] bg-dark-800 text-white rounded-lg hover:bg-dark-900 active:bg-dark-950 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-dark-700 focus:ring-offset-2"
              aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
          )}
          
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={`View ${project.title} live demo (opens in new tab)`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
