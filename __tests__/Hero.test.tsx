import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '@/components/Hero';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Hero Component', () => {
  const mockProps = {
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

  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders hero section with correct name', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders professional title', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders location badge', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  it('renders education badge', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('B.S. Computer Science')).toBeInTheDocument();
  });

  it('renders current role badge', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });

  it('renders professional summary', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('Passionate developer with experience in web technologies.')).toBeInTheDocument();
  });

  it('renders all CTA buttons', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText('View My Projects')).toBeInTheDocument();
    expect(screen.getByText('Download Resume')).toBeInTheDocument();
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('renders social links with correct hrefs', () => {
    render(<Hero {...mockProps} />);
    
    const emailLink = screen.getByLabelText(/send email/i);
    expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com');
    
    const githubLink = screen.getByLabelText(/visit github/i);
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
    
    const linkedinLink = screen.getByLabelText(/visit linkedin/i);
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
  });

  it('opens external links in new tab', () => {
    render(<Hero {...mockProps} />);
    
    const githubLink = screen.getByLabelText(/visit github/i);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('resume download link has correct href', () => {
    render(<Hero {...mockProps} />);
    const resumeLink = screen.getByText('Download Resume');
    expect(resumeLink).toHaveAttribute('href', '/resume.pdf');
    expect(resumeLink).toHaveAttribute('download');
  });

  it('scrolls to projects section when "View My Projects" is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'projects';
    document.body.appendChild(mockElement);

    render(<Hero {...mockProps} />);
    const projectsButton = screen.getByText('View My Projects');
    fireEvent.click(projectsButton);

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    document.body.removeChild(mockElement);
  });

  it('scrolls to contact section when "Contact Me" is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'contact';
    document.body.appendChild(mockElement);

    render(<Hero {...mockProps} />);
    const contactButton = screen.getByText('Contact Me');
    fireEvent.click(contactButton);

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    document.body.removeChild(mockElement);
  });
});
