'use client';

import { motion } from 'framer-motion';
import { Project } from '@/data/types';
import { Github, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
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

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 active:translate-y-0 transition-all duration-300 overflow-hidden"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="p-5 sm:p-6">
        {/* Header with title and duration */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
          <h3 id={`project-title-${project.id}`} className="text-xl sm:text-2xl font-bold text-gray-900 flex-1">
            {project.title}
          </h3>
          <time className="text-xs sm:text-sm text-gray-500 sm:whitespace-nowrap" dateTime={project.duration}>
            {project.duration}
          </time>
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
              role="listitem"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* Impact/Results */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
          <span className="font-semibold text-green-600">Impact:</span>{' '}
          {project.impact}
        </p>

        {/* Accuracy metric if available */}
        {project.accuracy && (
          <div className="mb-4 inline-block">
            <span className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-lg border border-green-200" role="status" aria-label={`Project accuracy: ${project.accuracy}`}>
              Accuracy: {project.accuracy}
            </span>
          </div>
        )}

        {/* Links - Touch-friendly with 44px minimum */}
        <div className="flex flex-wrap gap-3 mt-6">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-gray-800 text-white rounded-lg hover:bg-gray-900 active:bg-black transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
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
              className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
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
