import {
  makeElementClassNameFactory,
  makeRootClassName,
  StyleProps,
} from '@/utils';
import type { TooltipProps as RadixTooltipProps } from '@radix-ui/react-tooltip';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';
import { Text } from '..';

export type TooltipProps = StyleProps &
  RadixTooltipProps & {
    /**
     * The side the tooltip should show on
     * @default 'top'
     */
    side?: 'top' | 'right' | 'bottom' | 'left';

    /**
     * Whether to show the tooltip instantly, without a delay.
     * @default false
     */
    isInstant?: boolean;

    /** The target for the tooltip. */
    children: ReactNode;

    /** The content of the tooltip. */
    content?: string;
  };

const ROOT = makeRootClassName('Tooltip');
const el = makeElementClassNameFactory(ROOT);

const DELAY = 600;

const DEFAULT_PROPS = {
  side: 'top',
  isInstant: false,
} as const;

function Tooltip(props: TooltipProps): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <TooltipPrimitive.Root delayDuration={p.isInstant ? 0 : DELAY}>
      <TooltipPrimitive.Trigger asChild>{p.children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        side={p.side}
        align="center"
        sideOffset={4}
        className={clsx(ROOT, p.className)}
      >
        <Text type="h5">{p.content}</Text>
        {/* <TooltipPrimitive.Arrow width={10} height={6} className={el`arrow`} /> */}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
}

/** Allows one to wrap a component in a tooltip and only show the tooltip if the content prop is set. */
export function OptionalTooltip(props: TooltipProps): ReactElement {
  if (props.content) return <Tooltip {...props} />;
  return <>{props.children}</>;
}

export default Tooltip;
