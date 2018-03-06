import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { ReactElement } from 'react';
import { enableAddons } from '../../../utils';
import Text from '../../text/Text';
import { TextArea } from '../TextArea';
import { TextAreaProps } from '../TextFieldBase';

export default {
  title: 'Components/TextArea',
  component: TextArea,
};

// playground

const PlaygroundTemplate: Story<TextAreaProps> = (props) => (
  <div className="flex justify-center">
    <TextArea {...props} onChange={action('change')} />
  </div>
);

export const Playground = PlaygroundTemplate.bind({});
Playground.argTypes = {
  label: { control: { type: 'text' } },
};
enableAddons(Playground, ['controls', 'actions', 'a11y']);
Playground.args = {
  placeholder: 'Add a comment...',
};

// Resize

export const Resize = (): ReactElement => (
  <div className="section flex-col">
    <Text type="h3">Manual resize</Text>
    <TextArea onChange={action('change')} />
    <Text type="h3">Autoresize</Text>
    <TextArea onChange={action('change')} autoresizes />
  </div>
);
