import React, { ReactElement } from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import type { TextFieldProps } from '../TextFieldBase';
import { TextField } from '../TextField';
import { enableAddons } from '../../../utils/storybook-shared';
import { createSearch } from '../../../assets/icons';

export default {
  title: 'Components/TextField',
  component: TextField,
};

// playground

const PlaygroundTemplate: Story<TextFieldProps> = (props) => (
  <div className="flex justify-center">
    <TextField {...props} onChange={action('change')} />
  </div>
);

export const Playground = PlaygroundTemplate.bind({});
Playground.argTypes = {
  label: { control: { type: 'text' } },
};
enableAddons(Playground, ['controls', 'actions', 'a11y']);
Playground.args = {
  size: 'medium',
  placeholder: 'Search...',
  label: 'Search',
  isRequired: true,
  validationState: 'invalid',
};

// variants

const examplesProps: Partial<TextFieldProps> = {
  className: 'textfield medium-width',
  placeholder: 'placeholder',
};
export const Examples = (): ReactElement => (
  <div className="section flex-col">
    <TextField {...examplesProps} placeholder="Simple input" />
    <TextField
      {...examplesProps}
      iconPath={createSearch}
      placeholder="With icon"
    />
    <TextField
      {...examplesProps}
      iconPath={createSearch}
      placeholder="Populated"
      defaultValue="Populated"
    />
    <TextField
      {...examplesProps}
      iconPath={createSearch}
      placeholder="With label"
      label="Label"
    />
    <TextField {...examplesProps} label="Label (no placeholder)" />
    <TextField
      {...examplesProps}
      validationState="valid"
      placeholder="Valid input"
      defaultValue="Valid input"
    />
    <TextField
      {...examplesProps}
      validationState="invalid"
      placeholder="Invalid input"
      defaultValue="Invalid input"
    />
  </div>
);

export const Sizes = (): ReactElement => (
  <div className="section flex-col">
    <TextField {...examplesProps} size="large" />
    <TextField {...examplesProps} size="medium" />
    <TextField {...examplesProps} size="small" />
  </div>
);

const LightTemplate: Story<TextFieldProps> = (props) => (
  <TextField {...props} variant="light" />
);

export const Light = LightTemplate.bind({});
// Light.argTypes = {
//   label: { control: { type: 'text' } },
// };
enableAddons(Light, ['backgrounds', 'actions', 'controls', 'a11y']);
Light.args = {
  size: 'medium',
  placeholder: 'Search...',
  label: 'Search',
  iconPath: createSearch,
  isRequired: true,
  validationState: 'invalid',
};

Light.parameters = {
  ...Light.parameters,
  backgrounds: {
    ...Light.parameters?.backgrounds,
    default: 'dark',
  },
};
