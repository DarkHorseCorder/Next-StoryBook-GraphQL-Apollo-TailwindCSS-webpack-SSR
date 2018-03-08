import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import type { StatCardProps } from '../StatCard';
import StatCard from '../StatCard';
import { enableAddons } from '@/utils/storybook-shared';
import { createPlaceholder } from '@/assets/icons';

export default {
  title: 'Components/StatCard',
  component: StatCard,
};

// playground

const PlaygroundTemplate: Story<StatCardProps> = (props: StatCardProps) => {
  return (
    <div className="flex justify-center">
      <StatCard {...props} />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  icon: createPlaceholder,
  title: '+ $200M',
  description: '45% this week',
  trend: [1, 8, 30, 45, 50],
  onPress: () => {},
  badgeLabel: '+10'
};
enableAddons(Playground, ['controls', 'actions', 'a11y', 'backgrounds']);

export const WidthExamples = (): ReactElement => {
  return (
    <div className='space-y-2 w-[500px]'>
      <h2 className='text-body-lg-heavy'>Default (medium - 240px)</h2>
      <StatCard 
        icon={createPlaceholder}
        title='+$200000K'
        description='45% this week'
        trend={[1, 8, 30, 45, 50]}
        variant='positive'
        badgeLabel='+10%'
      />
      <h2 className='text-body-lg-heavy'>Fixed width (320px)</h2>
      <StatCard 
        icon={createPlaceholder}
        title='+$200M'
        description='45% this week'
        trend={[1, 8, 30, 45, 50]}
        variant='positive'
        badgeLabel='+10%'
        className='!w-[320px]'
      />
      <h2 className='text-body-lg-heavy'>Full width</h2>
      <StatCard 
        icon={createPlaceholder}
        title='+$200M'
        description='45% this week'
        trend={[1, 8, 30, 45, 50]}
        variant='positive'
        badgeLabel='+10%'
        className='!w-full'
      />
      <h2 className='text-body-lg-heavy'>Text overflow</h2>
      <StatCard
        title='+$200M'
        description='45% this week, +5% over last week'
      />
      <StatCard
        title='+$200M'
        description='45% this week, +5% over last week'
        icon={createPlaceholder} />
      <StatCard
        title='+$200M +$200M +$200M'
        description='45% this week, +5% over last week'
        icon={createPlaceholder}
        trend={[1, 8, 30, 45, 50]}
        variant='positive'
      />
      <StatCard
        title='+$200M'
        description='45% this week, +5% over last week'
        icon={createPlaceholder}
        trend={[1, 8, 30, 45, 50]}
        variant='positive'
        className='!w-full'
      />
    </div>
  )
}

function StatCardByContent(props: StatCardProps & { subject: string }) {

  return (
    <div>
      <h2 className='text-body-lg-heavy mt-6 mb-2'>{props.subject}</h2>
      <div className='flex gap-2 flex-wrap'>
        <StatCard title='+$200M' size={props.size} variant={props.variant} />
        <StatCard
          title='+$200M'
          description='45% this week'
          size={props.size}
          variant={props.variant}
        />
        <StatCard
          title='+$200M'
          badgeLabel='+40%'
          size={props.size}
          variant={props.variant}
        />
        <StatCard
          title='+$200M'
          description='45% this week'
          trend={[1, 8, 30, 45, 50]}
          size={props.size}
          variant={props.variant}
        />
        <StatCard
          icon={createPlaceholder}
          title='+$200M'
          description='45% this week'
          trend={[1, 8, 30, 45, 50]}
          size={props.size}
          variant={props.variant}
        />
        <StatCard
          icon={createPlaceholder}
          title='+$200M'
          description='45% this week'
          trend={[1, 8, 30, 45, 50]}
          badgeLabel='+40%'
          size={props.size}
          variant={props.variant}
        />
        <StatCard
          icon={createPlaceholder}
          title='+$200M'
          description='45% this week'
          trend={[1, 8, 30, 45, 50]}
          badgeLabel='+40%'
          onPress={action('press')}
          size={props.size}
          variant={props.variant}
        />
        <StatCard
          icon={createPlaceholder}
          title='+$200M'
          description='45% this week'
          trend={[1, 8, 30, 45, 50]}
          badgeLabel='+40%'
          onPress={action('press')}
          tooltip='This is a tooltip'
          size={props.size}
          variant={props.variant}
        />
      </div>
    </div>
  )
}

function StatCardByVariant(props: StatCardProps) {
  return (
    <div className='flex flex-col w-[800px]'>
      <StatCardByContent {...props} variant='default' subject='Variant = default' />
      <StatCardByContent {...props} variant='positive' subject='Variant = positive' />
      <StatCardByContent {...props} variant='negative' subject='Variant = negative' />
    </div>
  )
}

export const Small = (): ReactElement => {
  return (
    <StatCardByVariant title='' size='small' />
  )
}

export const Medium = (): ReactElement => {
  return (
    <StatCardByVariant title='' size='medium' />
  )
}

export const Large = (): ReactElement => {
  return (
    <StatCardByVariant title='' size='large' />
  )
}

const defaultBackground = [
  { name: 'dark background', value: '#EEE', default: true }
];
Small.parameters = { backgrounds: defaultBackground };
enableAddons(Small, ['backgrounds']);

Medium.parameters = { backgrounds: defaultBackground };
enableAddons(Medium, ['backgrounds']);

Large.parameters = { backgrounds: defaultBackground };
enableAddons(Large, ['backgrounds']);
