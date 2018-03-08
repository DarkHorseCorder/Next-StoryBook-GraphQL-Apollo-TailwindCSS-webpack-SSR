import clsx from 'clsx';
import React, { ReactElement, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
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
import Icon, { IconData } from '../icon/Icon';
import type { ButtonProps } from '../button';
import Badge from '../badge/Badge';
import { OptionalTooltip } from '../tooltip/Tooltip';
import Text from '../text/Text'


export type SidebarItemProps = PropsWithChildren<StyleProps> & 
  Pick<TooltipComponentProps, 'tooltipSide'> &
  Omit<TooltipForwardProps, 'onKeyDown' | 'onBlur'> & {
  /**
   * Item icon
   */
  icon: IconData;

  /**
   * Icon viewbox size
   * @default 20
   */
  _iconViewbox?: number;

  /**
   * Whether to show selected styles for this item.
   * @default false
   */
  isSelected?: boolean;

  /**
   * The label for a badge on the item
   */
  badge?: string;

  /**
   * Optional tooltip
   */
  tooltip?: string;

  /**
   * Link
   */
  href?: string;

  /**
   * Press handler
   */
  onPress?: ButtonProps['onPress'];
};

const ROOT = makeRootClassName('Sidebar');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  _iconViewbox: 20,
  isSelected: false,
  badge: '',
} as const;

function SidebarItemComponent(
  props: SidebarItemProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement { 
  const p = { ...DEFAULT_PROPS, ...props };
  const tooltipProps = useTooltipComponentProps(p);
  const tooltipForwardProps = useTooltipForwardProps(p);

  const domRef = useOptionalRef(ref)
  const isInteractive = !!p.onPress
  const { buttonProps, isPressed } = useButton(p, domRef)
  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();

  const behaviorProps = isInteractive ? mergeProps(
    buttonProps, hoverProps, focusProps, tooltipForwardProps
  ) : tooltipForwardProps;

  return (
    <OptionalTooltip {...tooltipProps} content={p.tooltip} isInstant>
      <div
        {...behaviorProps}
        className={clsx(
          el`item`,
          {
            'is-hovered': isHovered,
            'is-pressed': isPressed,
            'is-focus-visible': isFocusVisible,
            'is-selected': p.isSelected,
            'is-interactive': isInteractive
          },
          p.className
        )}
      >
        <Icon
          content={p.icon}
          size='custom'
          className={el`item-icon`}
          viewBoxWidth={p._iconViewbox}
          viewBoxHeight={p._iconViewbox}
        />
        <Text className={el`item-label`}>
          {p.children}
        </Text>
        {p.badge && <Badge variant='primary' isOutline className={el`item-badge`}>{p.badge}</Badge>}
        {isInteractive && <div className={el`overlay`} />}
      </div>
    </OptionalTooltip>
  ); 
};

export const SidebarSectionSpacer = () => <div className={el`item-padder`} />

const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(SidebarItemComponent);

export default SidebarItem;