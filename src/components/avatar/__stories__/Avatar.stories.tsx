import { enableAddons } from '@/utils/storybook-shared';
import { Story } from '@storybook/react';
import React from 'react';
import type { AvatarProps } from '../Avatar';
import Avatar from '../Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

// playground

const PlaygroundTemplate: Story<AvatarProps> = (props) => {
  return (
    <div className="flex justify-center">
      <Avatar {...props} />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  name: 'Joe Smith',
  image: '/images/avatar.svg',
};
enableAddons(Playground, ['controls', 'actions', 'a11y', 'backgrounds']);
