import { enableAddons } from '@/utils/storybook-shared';
import { Story } from '@storybook/react';
import React, { forwardRef, ReactElement } from 'react';
import Tooltip, { TooltipProps } from '../Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};

/// utils
// -----

type HoverProps = {
  content: string;
};

const HoverArea = forwardRef<HTMLDivElement, { content: string }>(
  function HoverArea({ content, ...props }, ref) {
    return (
      <div
        ref={ref}
        className="p-[2rem] min-w-[4rem] h-[3rem] border flex items-center justify-center text-body-lg"
        {...props}
      >
        {content}
      </div>
    );
  }
);

// Playground
// ----------

const PlaygroundTemplate: Story<TooltipProps> = (props) => (
  <Tooltip {...props}>
    <HoverArea content="Hover to show a tooltip!" />
  </Tooltip>
);

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  content: "I'm a tooltip",
};
enableAddons(Playground, ['controls']);

// Examples
// --------

function TooltipBySide(props: Omit<TooltipProps, 'children'>) {
  return (
    <div className="grid grid-cols-4 gap-5">
      <Tooltip {...props} side="left">
        <HoverArea content="left" />
      </Tooltip>
      <Tooltip {...props} side="top">
        <HoverArea content="top" />
      </Tooltip>
      <Tooltip {...props} side="right">
        <HoverArea content="right" />
      </Tooltip>
      <Tooltip {...props} side="bottom">
        <HoverArea content="bottom" />
      </Tooltip>
    </div>
  );
}

export const Examples = (): ReactElement => (
  <div className="space-y-2">
    <h2 className="text-h3">Short</h2>
    <TooltipBySide content="hi" />
    <h2 className="text-h3">Normal</h2>
    <TooltipBySide content="Normal tooltip" />
    <h2 className="text-h3">Long</h2>
    <TooltipBySide content="This is a super long, long, longgggggggggggggggggggggggggggg tooltip and you can see that it just expands as long as it needs to be, no harm no foul really" />
  </div>
);
