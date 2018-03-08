import React, { ReactElement } from 'react';
import { Story } from '@storybook/react';
import { Icon, IconProps } from '..';
import {
  addCustomControls,
  enableAddons,
} from '../../../utils/storybook-shared';
import * as pathIcons from '../../../assets/icons/paths';
import * as svgIcons from '../../../assets/icons/svgs';

const { createCopy } = pathIcons;
const { svgZoom } = svgIcons;

const EXAMPLE_PATH_ICON = createCopy;
const EXAMPLE_SVG_ICON = svgZoom;

export default {
  title: 'Components/Icon',
  component: Icon,
};

// playground

const PlaygroundTemplate: Story<IconProps> = (props) => (
  <div className="flex justify-center">
    <Icon {...props} />
  </div>
);
export const Playground = PlaygroundTemplate.bind({});
enableAddons(Playground, ['controls', 'a11y']);
addCustomControls(Playground, ['icons'], {
  iconsPropName: 'content',
  iconsRequired: true,
});

// sizes

export const Sizes = (): ReactElement => (
  <div className="space-y-4">
    <h3 className="text-h5">Small</h3>
    <div className="flex gap-2">
      <Icon content={EXAMPLE_PATH_ICON} size="small" />
      <Icon content={EXAMPLE_SVG_ICON} size="small" />
    </div>
    <h3 className="text-h5">Medium</h3>
    <div className="flex gap-2">
      <Icon content={EXAMPLE_PATH_ICON} size="medium" />
      <Icon content={EXAMPLE_SVG_ICON} size="medium" />
    </div>
    <h3 className="text-h5">Custom</h3>
    <div className="flex gap-2">
      <Icon
        content={EXAMPLE_PATH_ICON}
        size="custom"
        className="w-[6rem] h-[6rem]"
      />
      <Icon
        content={EXAMPLE_SVG_ICON}
        size="custom"
        className="w-[6rem] h-[6rem]"
      />
    </div>
  </div>
);

// colors

export const Colors = (): ReactElement => (
  <div className="flex gap-2">
    {[
      'text-blue-500',
      'text-red-500',
      'text-green-500',
      'text-orange-500',
      'text-purple-500',
    ].map((color) => (
      <Icon content={EXAMPLE_PATH_ICON} className={color} />
    ))}
  </div>
);

// path icons

export const PathIcons = (): ReactElement => (
  <div className="grid grid-cols-3 gap-[2rem]">
    {Object.entries(pathIcons)
      .sort(([nameA], [nameB]) => {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      })
      .map(([name, path]) => (
        <div className="flex flex-col items-center gap-[.5rem]">
          <Icon key={name} content={path} />
          <p className="text-h5 text-dark">
            {name
              .substr('create'.length)
              .replace(/([A-Z])/g, ' $1')
              .trim()
              .toLowerCase()}
          </p>
        </div>
      ))}
  </div>
);

// svg icons

export const SvgIcons = (): ReactElement => (
  <div className="grid grid-cols-3 gap-[2rem]">
    {Object.entries(svgIcons)
      .sort(([nameA], [nameB]) => {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      })
      .map(([name, path]) => (
        <div className="flex flex-col items-center gap-[.5rem]">
          <Icon key={name} content={path} />
          <p className="text-h5 text-dark">
            {name
              .substr('svg'.length)
              .replace(/([A-Z])/g, ' $1')
              .trim()
              .toLowerCase()}
          </p>
        </div>
      ))}
  </div>
);
