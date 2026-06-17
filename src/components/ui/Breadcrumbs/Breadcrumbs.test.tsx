import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { House } from '@phosphor-icons/react';
import { Breadcrumbs } from './Breadcrumbs';

const trail = [
  { label: 'Home', href: '/' },
  { label: 'Documents', href: '/docs' },
  { label: 'New item' },
];

describe('Breadcrumbs', () => {
  it('renders a labeled navigation landmark', () => {
    render(<Breadcrumbs items={trail} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('marks the last item as the current page (non-link)', () => {
    render(<Breadcrumbs items={trail} />);
    const current = screen.getByText('New item');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.tagName).toBe('SPAN');
  });

  it('renders previous items as links with their href', () => {
    render(<Breadcrumbs items={trail} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Documents' })).toHaveAttribute('href', '/docs');
  });

  it('collapses trails longer than 4 to first + … + last', () => {
    const long = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D', href: '/d' },
      { label: 'E', href: '/e' },
      { label: 'F' },
    ];
    render(<Breadcrumbs items={long} />);
    expect(screen.getByText('…')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('F')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByText('C')).not.toBeInTheDocument();
  });

  it('renders a single current item with no links', () => {
    render(<Breadcrumbs items={[{ label: 'Dashboard' }]} />);
    expect(screen.getByText('Dashboard')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('warns when icons are mixed (icons are all-or-nothing)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/', icon: House },
          { label: 'Documents' },
        ]}
      />,
    );
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('does not warn when icons are consistent (all or none)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/', icon: House },
          { label: 'Documents', icon: House },
        ]}
      />,
    );
    render(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Documents' }]} />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
