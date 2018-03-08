import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useLink } from '@react-aria/link';
import { mergeProps } from '@react-aria/utils';
import type { AriaLinkProps } from '@react-types/link';
import clsx from 'clsx';
import type { ForwardedRef, ReactElement } from 'react';
import React, { forwardRef } from 'react';
import { useOptionalRef } from '@/hooks';
import {
  makeElementClassNameFactory,
  makeRootClassName,
  StyleProps,
} from '../../utils';

export type LinkProps = StyleProps &
  AriaLinkProps & {
    /**
     * Whether the link is to an external page
     * @default false
     */
    isExternal?: boolean;

    /**
     * The visual style variant of the link.
     * @default "default"
     */
    variant?:
      | 'default'
      | 'monochrome'
      | 'white'
      | 'information'
      | 'warning'
      | 'danger';

    /**
     * Whether the link is disabled.
     * @default false
     */
    isDisabled?: boolean;

    /**
     * The size of the link text
     * @default 'medium'
     */
    size?: 'xs' | 'small' | 'medium' | 'large';

    /** The link's target URL. */
    href?: string;

    /** The target window for the link. */
    target?: string;

    /**
     * The relationship between the linked resource and the current page.
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel).
     */
    rel?: string;

    /** The link's label. */
    children: string;
  };

// config

const ROOT = makeRootClassName('Link');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  isExternal: false,
  isDisabled: false,
  variant: 'default',
  size: 'medium',
} as const;

// main

function LinkComponent(
  props: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);

  const { linkProps, isPressed } = useLink({ ...p, elementType: 'a' }, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled: p.isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();
  const behaviorProps = mergeProps(linkProps, hoverProps, focusProps);

  return (
    <a
      ref={domRef}
      href={p.href}
      // by default, external links are opened on a new tab
      target={p.target ?? ((p.isExternal && '_blank') || undefined)}
      // by default, no referrer nor opener is made available, for security purposes
      rel={p.rel ?? 'noreferrer'}
      {...behaviorProps}
      className={clsx([
        `${ROOT} variant-${p.variant} size-${p.size}`,
        {
          'is-disabled': p.isDisabled,
          'is-hovered': isHovered,
          'is-pressed': isPressed,
          'is-focused': isFocusVisible,
        },
        p.className,
      ])}
    >
      <span className={el`label`}>{p.children}</span>
    </a>
  );
}

/** Links allow users to navigate to other pages, internal or external to the current app. */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(LinkComponent);

export default Link;
