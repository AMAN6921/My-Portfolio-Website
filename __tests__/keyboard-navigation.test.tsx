import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Keyboard Navigation Tests', () => {
  describe('Hero Component', () => {
    const heroProps = {
      name: 'John Doe',
      title: 'Software Engineer',
      location: 'San Francisco, CA',
      education: 'B.S. Computer Science',
      currentRole: 'Full Stack Developer',
      summary: 'Passionate developer',
      contacts: {
        email: 'john@example.com',
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
      },
    };

    it('all interactive elements are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Hero {...heroProps} />);

      // Tab through interactive elements
      await user.tab();
      expect(screen.getByText('View My Projects')).toHaveFocus();

      await user.tab();
      expect(screen.getByText('Download Resume')).toHaveFocus();

      await user.tab();
      expect(screen.getByText('Contact Me')).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/send email/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/visit github/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/visit linkedin/i)).toHaveFocus();
    });

    it('buttons can be activated with Enter key', async () => {
      const user = userEvent.setup();
      const mockElement = document.createElement('div');
      mockElement.id = 'projects';
      document.body.appendChild(mockElement);
      Element.prototype.scrollIntoView = jest.fn();

      render(<Hero {...heroProps} />);

      const projectsButton = screen.getByText('View My Projects');
      projectsButton.focus();
      await user.keyboard('{Enter}');

      expect(mockElement.scrollIntoView).toHaveBeenCalled();
      document.body.removeChild(mockElement);
    });
  });

  describe('Navigation Component', () => {
    const mockSections = [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
    ];

    it('navigation links are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Navigation sections={mockSections} />);

      await user.tab();
      expect(screen.getByText('Aman Devrani')).toHaveFocus();

      await user.tab();
      const homeButton = screen.getAllByText('Home')[0];
      expect(homeButton).toHaveFocus();

      await user.tab();
      const aboutButton = screen.getAllByText('About')[0];
      expect(aboutButton).toHaveFocus();
    });

    it('mobile menu button is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Navigation sections={mockSections} />);

      // Tab to mobile menu button
      const menuButton = screen.getByLabelText(/open navigation menu/i);
      menuButton.focus();
      expect(menuButton).toHaveFocus();

      // Activate with Enter
      await user.keyboard('{Enter}');
      expect(screen.getByLabelText(/close navigation menu/i)).toBeInTheDocument();
    });
  });

  describe('Contact Component', () => {
    const contactProps = {
      email: 'test@example.com',
      github: 'https://github.com/testuser',
      linkedin: 'https://linkedin.com/in/testuser',
    };

    it('all contact links are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Contact {...contactProps} />);

      // Tab through contact methods
      await user.tab();
      const emailLink = screen.getByLabelText(/email: test@example.com/i);
      expect(emailLink).toHaveFocus();

      await user.tab();
      const copyButton = screen.getByLabelText(/copy email to clipboard/i);
      expect(copyButton).toHaveFocus();

      await user.tab();
      const githubLink = screen.getByLabelText(/github.*opens in new tab/i);
      expect(githubLink).toHaveFocus();

      await user.tab();
      const linkedinLink = screen.getByLabelText(/linkedin.*opens in new tab/i);
      expect(linkedinLink).toHaveFocus();
    });

    it('copy button can be activated with keyboard', async () => {
      const user = userEvent.setup();
      const mockWriteText = jest.fn(() => Promise.resolve());
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: mockWriteText,
        },
        writable: true,
        configurable: true,
      });

      render(<Contact {...contactProps} />);

      const copyButton = screen.getByLabelText(/copy email to clipboard/i);
      copyButton.focus();
      await user.keyboard('{Enter}');

      expect(mockWriteText).toHaveBeenCalledWith('test@example.com');
    });
  });
});
