import { enableAddons } from '@/utils/storybook-shared';
import { Story } from '@storybook/react';
import React from 'react';
import type { BadgeProps } from '../Badge';
import Badge from '../Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
};

// playground

const PlaygroundTemplate: Story<BadgeProps> = (props) => {
  return (
    <div className="flex justify-center">
      <Badge {...props}>Filter</Badge>
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  size: 'medium',
  variant: 'default',
  isDismissible: true,
};
enableAddons(Playground, ['controls', 'actions', 'a11y', 'backgrounds']);
