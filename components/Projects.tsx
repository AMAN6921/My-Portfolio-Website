'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Project } from '@/data/types';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
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
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 py-16 sm:py-20 px-4 sm:px-6"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            Showcasing my work in software development and machine learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8" role="list" aria-label="Featured projects">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
