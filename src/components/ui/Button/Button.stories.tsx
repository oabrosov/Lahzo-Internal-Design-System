import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, MagnifyingGlass, Plus } from '@phosphor-icons/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'success', 'error'],
    },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    block: { control: 'boolean' },
    children: { control: 'text' },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
  },
  args: { children: 'Button', variant: 'secondary', size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak any prop in the Controls panel. */
export const Playground: Story = {};

export const Variants: Story = {
  args: { children: undefined },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="success">
        Success
      </Button>
      <Button {...args} variant="error">
        Error
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  args: { variant: 'primary', children: undefined },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="xs">
        Extra small
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: { variant: 'secondary', children: undefined },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} leftIcon={MagnifyingGlass}>
        Search
      </Button>
      <Button {...args} rightIcon={ArrowRight}>
        Next
      </Button>
      <Button {...args} variant="ghost" square aria-label="Add item" leftIcon={Plus} />
    </div>
  ),
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Saving…' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Unavailable' },
};
