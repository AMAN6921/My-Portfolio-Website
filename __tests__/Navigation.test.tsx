import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/Navigation';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Navigation Component', () => {
  const mockSections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
  ];

  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = jest.fn();
    
    // Mock offsetTop
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      value: 100,
    });
  });

  it('renders navigation with all sections', () => {
    render(<Navigation sections={mockSections} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders logo/name button', () => {
    render(<Navigation sections={mockSections} />);
    expect(screen.getByText('Aman Devrani')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Navigation sections={mockSections} />);
    const menuButton = screen.getByLabelText(/open navigation menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    render(<Navigation sections={mockSections} />);
    const menuButton = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(menuButton);
    
    const closeButton = screen.getByLabelText(/close navigation menu/i);
    expect(closeButton).toBeInTheDocument();
  });

  it('closes mobile menu when close button is clicked', () => {
    render(<Navigation sections={mockSections} />);
    const menuButton = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(menuButton);
    
    const closeButton = screen.getByLabelText(/close navigation menu/i);
    fireEvent.click(closeButton);
    
    const openButton = screen.getByLabelText(/open navigation menu/i);
    expect(openButton).toBeInTheDocument();
  });

  it('scrolls to section when navigation link is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'projects';
    document.body.appendChild(mockElement);

    render(<Navigation sections={mockSections} />);
    const projectsLink = screen.getAllByText('Projects')[0];
    fireEvent.click(projectsLink);

    expect(window.scrollTo).toHaveBeenCalled();
    document.body.removeChild(mockElement);
  });

  it('uses default sections when none provided', () => {
    render(<Navigation />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Navigation sections={mockSections} />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('logo button navigates to hero section', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'hero';
    document.body.appendChild(mockElement);

    render(<Navigation sections={mockSections} />);
    const logoButton = screen.getByText('Aman Devrani');
    fireEvent.click(logoButton);

    expect(window.scrollTo).toHaveBeenCalled();
    document.body.removeChild(mockElement);
  });
});
