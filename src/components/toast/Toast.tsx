import React, { forwardRef } from 'react';
import type { ForwardedRef, ReactElement } from 'react';
import clsx from 'clsx';
import { Icon } from '../icon';
import { Button } from '../button';
import { Link } from '../link';
import type { LinkProps } from '../link';
import {
  createCircleChecked,
  createCloseSmall,
  createRingWarning,
} from '../../assets/icons';
import { makeRootClassName, makeElementClassNameFactory } from '../../utils';
import { useOptionalRef } from '@/hooks';

export type ToastActionProps = Omit<LinkProps, 'variant' | 'children'> & {
  /** The action's label */
  label: string;

  /**
   * Whether the action should dismiss the toast
   */
  isDismissAction?: boolean;
};

export type ToastProps = {
  /** The title of the toast. */
  title: string;

  /**
   * Whether the toast should show a success or error icon.
   * @default "default"
   */
  variant?: 'default' | 'success' | 'error';

  /**
   * Whether to show a dismiss button for the toast.
   * @default false
   */
  isDismissible?: boolean;

  /**
   * A description for the toast body.
   */
  description?: string;

  /**
   * Optional actions to display on the toast.
   */
  actions?: ToastActionProps[];

  /**
   * Handler called when dismiss button is pressed.
   */
  onDismiss?: () => void;
};

// config

const ROOT = makeRootClassName('Toast');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  variant: 'default',
  isDismissible: false,
} as const;

const SUCCESS_ICON = createCircleChecked;
const ERROR_ICON = createRingWarning;
const DISMISS_ICON = createCloseSmall;

// utils

const getIcon = (variant: ToastProps['variant']) => {
  switch (variant) {
    case 'success':
      return SUCCESS_ICON;
    case 'error':
      return ERROR_ICON;
    default:
      throw new Error('Unknown variant');
  }
};

// main

function ToastComponent(
  props: ToastProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);

  const hasIcon = p.variant === 'success' || p.variant === 'error';
  const isInline = p.actions?.length === 1;

  return (
    <div
      ref={domRef}
      className={clsx(`${ROOT} variant-${p.variant}`, {
        'has-description': p.description,
        'has-icon': hasIcon,
        'has-actions': p.actions?.length,
        'has-single-action': p.actions?.length === 1,
        'is-inline': isInline,
      })}
    >
      {hasIcon && <Icon content={getIcon(p.variant)} className={el`icon`} />}
      <div className={el`content`}>
        <p className={el`title`}>{p.title}</p>
        {p.description && <p className={el`description`}>{p.description}</p>}
        {p.actions && (
          <div className={el`actions`}>
            {p.actions.map(({ label, ...linkProps }) => (
              <Link key={label} {...linkProps}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
      {p.isDismissible && (
        <Button
          onPress={() => p.onDismiss?.()}
          className={el`dismiss-button`}
          isGhost
          icon={DISMISS_ICON}
          size="xs"
        />
      )}
    </div>
  );
}

/**
 * A notification that displays relevant information. It can contain up to two actions and
 * can be dismissed.
 */
const Toast = forwardRef<HTMLDivElement, ToastProps>(ToastComponent);

export default Toast;
