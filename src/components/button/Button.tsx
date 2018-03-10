import { useOptionalRef } from '@/hooks';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';
import clsx from 'clsx';
import type { ForwardedRef, ReactElement } from 'react';
import React, { forwardRef } from 'react';
import { Icon } from '..';
import type { OmittedAriaProps, StyleProps } from '../../utils';
import { makeElementClassNameFactory, makeRootClassName } from '../../utils';
import type { IconData } from '../icon/Icon';

// types

export type ButtonProps = StyleProps &
  Omit<AriaButtonProps<'button'>, OmittedAriaProps> & {
    /**
     * The size of the button.
     * @default "medium"
     */
    size?: 'xs' | 'small' | 'medium';

    /**
     * Whether the button is a submit button.
     * @default false
     */
    isSubmit?: boolean;

    /**
     * Whether the button is selected.
     * @default false
     */
    isSelected?: boolean;

    /**
     * Whether the button has de-emphasized (ghost) styles.
     * @default false
     */
    isGhost?: boolean;

    /**
     * Whether the button is a dropdown trigger.
     * @default false
     */
    isDropdown?: boolean;

    /**
     * Whether the button should have an outline style.
     */
    isOutline?: boolean;

    /**
     * The button's visual appearance.
     * @default "default"
     */
    variant?: 'default' | 'primary' | 'success' | 'danger' | 'dark' | 'light';

    /** The button's icon. */
    icon?: IconData;

    /** The button's label. */
    children?: string;

    /**
     * You probably do not want to use this, but instead `onPress`. Because of
     * [this issue](https://github.com/adobe/react-spectrum/issues/963) `onPress`
     * does not expose `preventDefault` on the `PressEvent` created through
     * onPress. This is a mitigation of that ommission in case the click event
     * should not propagate.
     *
     * NOTE: we prefer `onPress` over `onClick usually because `onClick` happens
     * after the full click is processed rather than on mouse down, and it does
     * not support keyboard bounded events.
     */
    rawOnClick?: (
      ...params: Parameters<React.MouseEventHandler<HTMLButtonElement>>
    ) => NonNullable<ReturnType<React.MouseEventHandler<HTMLButtonElement>>>;
  };

// config

const ROOT = makeRootClassName('Button');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  variant: 'default',
  color: 'gray',
  size: 'medium',
  isSubmit: false,
  isOutline: false,
  isSelected: false,
  isGhost: false,
  // dirty onClick type fix
  rawOnClick: undefined,
} as const;

// main

function ButtonComponent(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);

  // behavior
  // --------

  // remove onHackyClick from props to be appended later
  // eslint-disable-next-line prefer-destructuring
  const rawOnClick = p.rawOnClick;
  delete p.rawOnClick;

  const { buttonProps, isPressed } = useButton(p, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();
  const behaviorProps = mergeProps(
    buttonProps,
    hoverProps,
    focusProps,
    ...(rawOnClick ? [{ onClick: rawOnClick }] : [{}])
  );

  // rendering
  // ---------

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      ref={domRef}
      type={p.isSubmit ? 'submit' : 'button'}
      {...behaviorProps}
      className={clsx([
        `${ROOT} variant-${p.variant} color-${p.color} size-${p.size}`,
        {
          'is-selected': p.isSelected,
          'is-ghost': p.isGhost,
          'is-icon-button': !p.children,
          'has-icon': p.icon,
          'is-disabled': p.isDisabled,
          'is-pressed': isPressed,
          'is-hovered': isHovered,
          'is-focused': isFocusVisible,
          'is-outline': p.isOutline,
          'is-dropdown': p.isDropdown,
        },
        p.className,
      ])}
    >
      {p.icon && <Icon className={el`icon`} content={p.icon} size="custom" />}
      {p.children && <span className={el`label`}>{p.children}</span>}
      {p.isDropdown && (
        <Icon content={p.icon} size="custom" className={el`dropdown-icon`} />
      )}
    </button>
  );
}

/**
 * A control that allows users to perform an action or to navigate to another page.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ButtonComponent
);

export default Button;
