import type { Meta, StoryObj } from '@storybook/react';
import { FileText, Folder, House } from '@phosphor-icons/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Documents', href: '/documents' },
      { label: 'New item' },
    ],
  },
};

export const WithIcon: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: House },
      { label: 'Documents', href: '/documents', icon: Folder },
      { label: 'New item', icon: FileText },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Workspace', href: '/w' },
      { label: 'Projects', href: '/w/p' },
      { label: 'Lahzo', href: '/w/p/lahzo' },
      { label: 'Components', href: '/w/p/lahzo/components' },
      { label: 'Breadcrumbs' },
    ],
  },
};

export const SingleItem: Story = {
  args: { items: [{ label: 'Dashboard' }] },
};
