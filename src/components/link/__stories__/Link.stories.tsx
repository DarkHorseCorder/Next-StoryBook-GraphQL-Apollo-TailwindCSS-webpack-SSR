/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { Story } from '@storybook/react';
import type { LinkProps } from '..';
import { Link } from '..';
import { enableAddons } from '../../../utils/storybook-shared';

export default {
  title: 'Components/Link',
  component: Link,
};

// playground

const PlaygroundTemplate: Story<LinkProps> = (props) => (
  <div
    className={clsx('flex justify-center gap-x-4', {
      'bg-blue-900 rounded px-8 py-2': props.variant === 'white',
    })}
  >
    <Link {...props} />
  </div>
);

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  children: 'Link',
  href: 'https://createinc.co',
};
enableAddons(Playground, ['controls', 'a11y']);

// variants

const LinksByContent = (props: LinkProps) => (
  <div className="flex gap-x-4">
    <Link {...props}>Link</Link>
    <Link {...props} isExternal>
      Link
    </Link>
    <Link {...props} isDisabled>
      Disabled
    </Link>
    <Link {...props} isDisabled isExternal>
      Disabled
    </Link>
  </div>
);

export const Variants = (): ReactElement => (
  <div className="space-y-4">
    <h2 className="text-h4">Default</h2>
    <LinksByContent>Link</LinksByContent>
    <h2 className="text-h4">Monochrome</h2>
    <LinksByContent variant="monochrome">Link</LinksByContent>
    <div className="flex flex-col p-3 bg-blue-900 rounded-md gap-y-4">
      <h2 className="text-white text-h4">White</h2>
      <LinksByContent variant="white">Link</LinksByContent>
    </div>
    <h2 className="text-h4">Information</h2>
    <LinksByContent variant="information">Link</LinksByContent>
    <h2 className="text-h4">Warning</h2>
    <LinksByContent variant="warning">Link</LinksByContent>
    <h2 className="text-h4">Danger</h2>
    <LinksByContent variant="danger">Link</LinksByContent>
  </div>
);
