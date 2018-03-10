import clsx from 'clsx';
import React, { ReactElement, forwardRef, ForwardedRef } from 'react';
import type { ButtonProps } from '@react-types/button';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import {
  makeElementClassNameFactory,
  makeRootClassName,
  StyleProps,
  TooltipComponentProps,
  TooltipForwardProps,
  useTooltipComponentProps,
  useTooltipForwardProps
} from '@/utils';
import { useOptionalRef } from '@/hooks';
import { Icon } from '../icon';
import { OptionalTooltip } from '../tooltip/Tooltip';
import { createClose, createRingCross } from '@/assets/icons';

export type DismissButtonProps = StyleProps &
  Pick<TooltipComponentProps, 'tooltipSide'> &
  Omit<TooltipForwardProps, 'onKeyDown' | 'onBlur'> & {
  /**
     * The size of the button.
     * @default "md"
     */
   size?: 'xs' | 'sm' | 'md' | 'lg' | 'custom';

  /**
   * Either a simple x icon or an x in a circle
   * @default "default"
   */
  variant?: 'default' | 'circled';

  /**
   * Optional tooltip
   */
  tooltip?: string;

  /**
   * Called when a user presses the button
   */
  onPress?: ButtonProps['onPress'];
};

const ROOT = makeRootClassName('DismissButton');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  variant: 'default',
  size: 'md'
} as const;

function DismissButtonComponent(
  props: DismissButtonProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement { 
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref)

  const tooltipProps = useTooltipComponentProps(p);
  const tooltipForwardProps = useTooltipForwardProps(p);
  const { buttonProps, isPressed } = useButton(p, domRef);
  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();

  const behaviorProps = mergeProps(
    buttonProps, hoverProps, focusProps, tooltipForwardProps
  )

  const getIconForVariant = () => {
    return (
      <Icon
        content={p.variant === 'default' ? createClose : createRingCross}
        className={el`icon`}
        size='custom'
      />
    )
  }

  return (
    <OptionalTooltip {...tooltipProps} content={p.tooltip} isInstant>
      <button
        {...behaviorProps}
        className={clsx(
          `${ROOT} size-${p.size}`,
          {
            'is-hovered': isHovered,
            'is-pressed': isPressed,
            'is-focus-visible': isFocusVisible,
          },
          p.className
        )}
      >
        {getIconForVariant()}
      </button>
    </OptionalTooltip>
  ); 
};

const DismissButton = forwardRef<HTMLElement, DismissButtonProps>(DismissButtonComponent);

export default DismissButton;