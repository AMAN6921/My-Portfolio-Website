// Type definitions for portfolio data

export interface Project {
  id: string;
  title: string;
  tech: string[];
  duration: string;
  description: string;
  impact: string;
  accuracy?: string;
  link?: string;
  githubLink?: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface ExperienceItem {
  position: string;
  organization: string;
  duration: string;
  location: string;
  description: string[];
  highlights: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialLink?: string;
}
