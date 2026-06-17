import type { Meta, StoryObj } from '@storybook/react';
import { Foundations } from './Foundations';

const meta = {
  title: 'Foundations/Tokens',
  component: Foundations,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Foundations>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live colors (from the active theme) + the spacing / control-height / icon scales. */
export const Tokens: Story = {};
