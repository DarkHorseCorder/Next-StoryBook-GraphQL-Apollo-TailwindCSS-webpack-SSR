import { createClose } from '@/assets/icons';
import {
  makeElementClassNameFactory,
  makeRootClassName,
  OmittedAriaProps,
  StyleProps,
} from '@/utils';
import { useOptionalRef } from '@/hooks';
import { ForwardRefComponent } from '@radix-ui/react-polymorphic';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { AriaButtonProps } from '@react-types/button';
import clsx from 'clsx';
import React, { ForwardedRef, PropsWithChildren, ReactElement, useRef } from 'react';
import { Icon } from '..';

export type BadgeProps = PropsWithChildren<StyleProps> &
  Omit<
    AriaButtonProps<'button'>,
    OmittedAriaProps | 'href' | 'rel' | 'target'
  > & {
    /**
     * The size of the badge.
     * @default "medium"
     */
    size?: 'small' | 'medium';

    /**
     * The badge style variant.
     * @default "default"
     */
    variant?: 'default' | 'primary' | 'close' | 'open' | 'update';

    /**
     * Whether the badge is visually outlined.
     * @default 'false'
     */
    isOutline?: boolean;

    /**
     * Whether the badge can be dismissed.
     * @default false
     */
    isDismissible?: boolean;

    /** The badge's icon (svg path). */
    icon?: string;

    /** Handler that is called when the badge is dismissed. */
    onDismiss?: () => void;
  };

const ROOT = makeRootClassName('Badge');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  size: 'medium',
  variant: 'default',
  isOutlined: false,
  isDismissible: false,
} as const;

const DISMISS_ICON = createClose;

const PolymorphicBadge = React.forwardRef(function PolymorphicBadge(
  { as: Comp = 'div', ...props },
  forwardedRef
) {
  return <Comp {...props} ref={forwardedRef} />;
}) as ForwardRefComponent<'div', unknown>;

function DismissButton(p: AriaButtonProps<'button'>) {
  const domRef = useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(p, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const behaviorProps = mergeProps(buttonProps, hoverProps);

  return (
    <button
      {...behaviorProps}
      tabIndex={0}
      className={clsx(el`dismiss-button`, {
        'is-hovered': isHovered,
        'is-pressed': isPressed,
      })}
    >
      <Icon
        className={el`dismiss-button-icon`}
        content={DISMISS_ICON}
        size="custom"
      />
    </button>
  );
}

function Badge(
  props: BadgeProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLDivElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);

  const isInteractive = !!p.onPress;
  const { buttonProps, isPressed } = useButton(p, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const interactiveProps = isInteractive ? [buttonProps, hoverProps] : [];
  const behaviorProps = mergeProps(...interactiveProps);

  return (
    <PolymorphicBadge
      as={isInteractive ? 'button' : 'div'}
      {...behaviorProps}
      className={clsx([
        `${ROOT} size-${p.size} variant-${p.variant}`,
        {
          'has-icon': p.icon,
          'has-trailing-icon': p.isDismissible,
          'is-hovered': isHovered,
          'is-pressed': isPressed,
          'is-outline': p.isOutline,
        },
        p.className,
      ])}
    >
      {p.icon && <Icon className={el`icon`} content={p.icon} size="custom" />}
      {p.children}
      {p.isDismissible && <DismissButton onPress={p.onDismiss} />}
    </PolymorphicBadge>
  );
}

export default Badge;
