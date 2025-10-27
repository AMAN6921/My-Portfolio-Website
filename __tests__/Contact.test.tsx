import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '@/components/Contact';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

describe('Contact Component', () => {
  const mockProps = {
    email: 'test@example.com',
    github: 'https://github.com/testuser',
    linkedin: 'https://linkedin.com/in/testuser',
  };

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    });
  });

  it('renders section heading', () => {
    render(<Contact {...mockProps} />);
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<Contact {...mockProps} />);
    expect(screen.getByText(/always open to discussing new projects/i)).toBeInTheDocument();
  });

  it('renders email contact method', () => {
    render(<Contact {...mockProps} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders GitHub contact method', () => {
    render(<Contact {...mockProps} />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
  });

  it('renders LinkedIn contact method', () => {
    render(<Contact {...mockProps} />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Connect on LinkedIn')).toBeInTheDocument();
  });

  it('email link has correct mailto href', () => {
    render(<Contact {...mockProps} />);
    const emailLink = screen.getByLabelText(/email: test@example.com/i);
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('GitHub link opens in new tab', () => {
    render(<Contact {...mockProps} />);
    const githubLink = screen.getByLabelText(/github.*opens in new tab/i);
    expect(githubLink).toHaveAttribute('href', 'https://github.com/testuser');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('LinkedIn link opens in new tab', () => {
    render(<Contact {...mockProps} />);
    const linkedinLink = screen.getByLabelText(/linkedin.*opens in new tab/i);
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/testuser');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('copies email to clipboard when copy button is clicked', async () => {
    render(<Contact {...mockProps} />);
    const copyButton = screen.getByLabelText(/copy email to clipboard/i);
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('shows check icon after copying email', async () => {
    render(<Contact {...mockProps} />);
    const copyButton = screen.getByLabelText(/copy email to clipboard/i);
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/email copied to clipboard/i)).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Contact {...mockProps} />);
    const section = screen.getByRole('region', { name: /let's connect/i });
    expect(section).toBeInTheDocument();
  });

  it('renders closing message', () => {
    render(<Contact {...mockProps} />);
    expect(screen.getByText(/looking forward to hearing from you/i)).toBeInTheDocument();
  });
});
