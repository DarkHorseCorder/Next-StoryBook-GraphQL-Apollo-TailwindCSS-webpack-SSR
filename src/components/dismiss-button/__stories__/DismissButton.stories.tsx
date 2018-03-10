import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import type { DismissButtonProps } from '../DismissButton';
import DismissButton from '../DismissButton';
import { enableAddons } from '@/utils/storybook-shared';
import { StyleProps } from '@/utils';

export default {
  title: 'Components/DismissButton',
  component: DismissButton,
};

// playground

const PlaygroundTemplate: Story<DismissButtonProps> = (props: DismissButtonProps) => {
  return (
    <div className="flex justify-center">
      <DismissButton {...props} />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  onPress: action('press')
};
enableAddons(Playground, ['controls', 'actions', 'a11y', 'backgrounds']);

const DismissButtonBySize = (
  { subject, size, className }: StyleProps & Pick<DismissButtonProps, 'size'> & { subject: string }
): ReactElement => {
  return (
    <div className='my-4'>
      <h2 className='text-body-lg-heavy my-2'>{subject}</h2>
      <div className='flex gap-x-4'>
        <DismissButton size={size} variant='default' className={className} onPress={action('press')} />
        <DismissButton size={size} variant='circled' className={className} onPress={action('press')} />
      </div>
    </div>
  )
}

export const Variant = (): ReactElement => (
  <div className='flex flex-col w-[200px]'>
    <DismissButtonBySize size='xs' subject='Extra small buttons' />
    <DismissButtonBySize size='sm' subject='Small buttons' />
    <DismissButtonBySize size='md' subject='Medium buttons' />
    <DismissButtonBySize size='lg' subject='Large buttons' />
    <DismissButtonBySize size='custom' subject='Custom buttons(20px)' className='w-5 h-5' />
  </div>
)