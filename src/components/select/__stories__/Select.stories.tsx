import { enableAddons } from '@/utils';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import type { SelectProps } from '../Select';
import Select, { Option } from '../Select';

export default {
  title: 'Components/Select',
  component: Select,
};

function SelectWithOptions<T>(props: SelectProps<T>) {
  return (
    <Select {...props}>
      <Option value="North Dakota">North Dakota</Option>
      <Option value="Ohio">Ohio</Option>
      <Option value="Oklahoma">Oklahoma</Option>
      <Option value="Oregon">Oregon</Option>
      <Option value="Pennsylvania">Pennsylvania</Option>
    </Select>
  );
}

// playground

const PlaygroundTemplate: Story<SelectProps<string>> = (props) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex justify-center">
      <SelectWithOptions
        {...props}
        value={selected}
        onChange={setSelected}
        renderValue={(val) => val}
      />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {};
enableAddons(Playground, ['controls', 'actions', 'a11y', 'backgrounds']);
