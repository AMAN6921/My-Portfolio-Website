import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/data/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
  },
}));

describe('ProjectCard Component', () => {
  const mockProject: Project = {
    id: 'test-project',
    title: 'Test Project',
    tech: ['React', 'TypeScript', 'Node.js'],
    duration: 'Jan 2024 – Mar 2024',
    description: 'A test project for unit testing',
    impact: 'Improved testing coverage by 100%',
    accuracy: '95%',
    link: 'https://example.com/demo',
    githubLink: 'https://github.com/test/project',
  };

  it('renders project title', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project duration', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText('Jan 2024 – Mar 2024')).toBeInTheDocument();
  });

  it('renders all tech stack badges', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument();
  });

  it('renders project impact', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText(/Improved testing coverage by 100%/)).toBeInTheDocument();
  });

  it('renders accuracy metric when provided', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText(/Accuracy: 95%/)).toBeInTheDocument();
  });

  it('does not render accuracy metric when not provided', () => {
    const projectWithoutAccuracy = { ...mockProject, accuracy: undefined };
    render(<ProjectCard project={projectWithoutAccuracy} index={0} />);
    expect(screen.queryByText(/Accuracy:/)).not.toBeInTheDocument();
  });

  it('renders GitHub link with correct attributes', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    const githubLink = screen.getByLabelText(/view test project source code/i);
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders live demo link with correct attributes', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    const demoLink = screen.getByLabelText(/view test project live demo/i);
    expect(demoLink).toHaveAttribute('href', 'https://example.com/demo');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render GitHub link when not provided', () => {
    const projectWithoutGithub = { ...mockProject, githubLink: undefined };
    render(<ProjectCard project={projectWithoutGithub} index={0} />);
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
  });

  it('does not render live demo link when not provided', () => {
    const projectWithoutDemo = { ...mockProject, link: undefined };
    render(<ProjectCard project={projectWithoutDemo} index={0} />);
    expect(screen.queryByText('Live Demo')).not.toBeInTheDocument();
  });

  it('renders with different index for staggered animation', () => {
    const { container } = render(<ProjectCard project={mockProject} index={2} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
