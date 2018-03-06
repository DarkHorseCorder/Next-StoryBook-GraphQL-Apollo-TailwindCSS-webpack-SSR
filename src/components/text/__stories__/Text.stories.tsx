import { Story } from '@storybook/react';
import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { Text, TextProps } from '..';
import {
  addCustomControls,
  enableAddons,
} from '../../../utils/storybook-shared';

export default {
  title: 'Components/Text',
  component: Text,
};

// helpers

function DemoText(props: Omit<TextProps, 'children'> & { className?: string }) {
  const { className } = props;
  return (
    <Text {...props} className={clsx(className, 'text-dark')}>
      Etiam porta sem malesuada magna mollis euismod.
    </Text>
  );
}

// playground

const PlaygroundTemplate: Story<TextProps> = (props) => (
  <div className="flex justify-center">
    <Text {...props} />
  </div>
);

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  children: "If everything seems under control, you're not going fast enough.",
};
Playground.argTypes = {
  children: {
    control: { type: 'text' },
  },
};
enableAddons(Playground, ['controls', 'a11y']);
addCustomControls(Playground, ['as'], {
  asAllowedElements: [
    'p',
    'span',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'marquee',
  ],
});

// variants

export const Variants = (): ReactElement => (
  <div className="grid grid-cols-5 gap-[1rem] w-[950px]">
    <Text className="col-span-full py-[2rem]" type="body-md" isHeavy>
      Headings
    </Text>
    <Text type="body-md">Heading 1</Text>
    <DemoText className="col-span-4" type="h1" />
    <Text type="body-md">Heading 2</Text>
    <DemoText className="col-span-4" type="h2" />
    <Text type="body-md">Heading 3</Text>
    <DemoText className="col-span-4" type="h3" />
    <Text type="body-md">Heading 4</Text>
    <DemoText className="col-span-4" type="h4" />
    <Text type="body-md">Heading 5</Text>
    <DemoText className="col-span-4" type="h5" />
    <Text type="body-md">Heading 6</Text>
    <DemoText className="col-span-4" type="h6" />
    <Text className="col-span-full py-[2rem]" type="body-md" isHeavy>
      Body
    </Text>
    <Text type="body-md">Body Large</Text>
    <div className="col-span-4">
      <Text type="h4">Regular</Text>
      <DemoText type="body-lg" />
      <Text className="mt-[1.5rem]" type="h4">
        Heavy
      </Text>
      <DemoText type="body-lg" isHeavy />
    </div>
    <Text type="body-md">Body Medium</Text>
    <div className="col-span-4">
      <Text type="h4">Regular</Text>
      <DemoText type="body-md" />
      <Text className="mt-[1.5rem]" type="h4">
        Heavy
      </Text>
      <DemoText type="body-md" isHeavy />
    </div>
    <Text type="body-md">Body Small</Text>
    <div className="col-span-4">
      <Text type="h4">Regular</Text>
      <DemoText type="body-sm" />
      <Text className="mt-[1.5rem]" type="h4">
        Heavy
      </Text>
      <DemoText type="body-sm" isHeavy />
    </div>
  </div>
);
