import { render, screen } from '@testing-library/react';
import Skills from '@/components/Skills';
import { SkillCategory } from '@/data/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
  },
}));

// Mock react-icons
jest.mock('react-icons/si', () => ({
  SiReact: () => <svg data-testid="icon-react" />,
  SiTypescript: () => <svg data-testid="icon-typescript" />,
  SiPython: () => <svg data-testid="icon-python" />,
}));

describe('Skills Component', () => {
  const mockSkillCategories: SkillCategory[] = [
    {
      category: 'Languages',
      skills: [
        { name: 'Python', icon: 'SiPython' },
        { name: 'JavaScript', icon: 'SiJavascript' },
      ],
    },
    {
      category: 'Frameworks',
      skills: [
        { name: 'React', icon: 'SiReact' },
        { name: 'Next.js', icon: 'SiNextdotjs' },
      ],
    },
  ];

  it('renders section heading', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    expect(screen.getByText('Technologies and tools I work with')).toBeInTheDocument();
  });

  it('renders all skill categories', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
  });

  it('renders all skills in each category', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders correct number of skill categories', () => {
    const { container } = render(<Skills skillCategories={mockSkillCategories} />);
    const categories = container.querySelectorAll('article');
    expect(categories).toHaveLength(2);
  });

  it('renders skills without icons gracefully', () => {
    const categoriesWithoutIcons: SkillCategory[] = [
      {
        category: 'Tools',
        skills: [
          { name: 'Git' },
          { name: 'Docker' },
        ],
      },
    ];
    render(<Skills skillCategories={categoriesWithoutIcons} />);
    expect(screen.getByText('Git')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });

  it('renders empty categories array without crashing', () => {
    render(<Skills skillCategories={[]} />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    const section = screen.getByRole('region', { name: /technical skills/i });
    expect(section).toBeInTheDocument();
  });
});
