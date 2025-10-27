import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Skills from '@/components/Skills';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import { Project, SkillCategory } from '@/data/types';

expect.extend(toHaveNoViolations);

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Accessibility Tests', () => {
  describe('Hero Component', () => {
    const heroProps = {
      name: 'John Doe',
      title: 'Software Engineer',
      location: 'San Francisco, CA',
      education: 'B.S. Computer Science',
      currentRole: 'Full Stack Developer',
      summary: 'Passionate developer with experience in web technologies.',
      contacts: {
        email: 'john@example.com',
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
      },
    };

    it('should not have accessibility violations', async () => {
      const { container } = render(<Hero {...heroProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ProjectCard Component', () => {
    const mockProject: Project = {
      id: 'test-project',
      title: 'Test Project',
      tech: ['React', 'TypeScript'],
      duration: 'Jan 2024 – Mar 2024',
      description: 'A test project',
      impact: 'Improved testing',
      githubLink: 'https://github.com/test/project',
    };

    it('should not have accessibility violations', async () => {
      const { container } = render(<ProjectCard project={mockProject} index={0} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Skills Component', () => {
    const mockSkillCategories: SkillCategory[] = [
      {
        category: 'Languages',
        skills: [
          { name: 'Python', icon: 'SiPython' },
          { name: 'JavaScript', icon: 'SiJavascript' },
        ],
      },
    ];

    it('should not have accessibility violations', async () => {
      const { container } = render(<Skills skillCategories={mockSkillCategories} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Navigation Component', () => {
    const mockSections = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
    ];

    it('should not have accessibility violations', async () => {
      const { container } = render(<Navigation sections={mockSections} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Contact Component', () => {
    const contactProps = {
      email: 'test@example.com',
      github: 'https://github.com/testuser',
      linkedin: 'https://linkedin.com/in/testuser',
    };

    it('should not have accessibility violations', async () => {
      const { container } = render(<Contact {...contactProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
