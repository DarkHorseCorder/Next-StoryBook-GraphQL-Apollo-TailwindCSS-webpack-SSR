import { useOptionalRef } from '@/hooks';
import clsx from 'clsx';
import type { ForwardedRef, ReactElement, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import type { StyleProps } from '../../utils';
import { makeRootClassName } from '../../utils';

// prop types

export type IconData = string | ReactNode;

export type IconProps = StyleProps & {
  /**
   * The icon's size.
   * @default "medium"
   */
  size?: 'medium' | 'small' | 'custom';

  /** The content to render. Can be an SVG path string or the svg content as react elements. */
  content: IconData;

  /**
   * Fine grain control of the icon's svg viewbox.
   * USE WITH CAUTION: You don't need to use these unless you are
   * rendering a non-square svg icon, but sometimes it's unavoidable.
   * @default 20
   */
  viewBoxWidth?: number;
  viewBoxHeight?: number;
};

// config

const ROOT = makeRootClassName('Icon');

const DEFAULT_PROPS = {
  size: 'medium',
  viewBoxWidth: 20,
  viewBoxHeight: 20,
};

// main

function IconComponent(
  props: IconProps,
  ref: ForwardedRef<SVGSVGElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);

  return (
    <svg
      ref={domRef}
      className={clsx(`${ROOT} size-${p.size}`, p.className)}
      viewBox={`0 0 ${p.viewBoxWidth} ${p.viewBoxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {typeof p.content === 'string' ? (
        // SVG path
        <path d={p.content} fillRule="evenodd" clipRule="evenodd" />
      ) : (
        // react elements
        p.content
      )}
    </svg>
  );
}

/**
 * A symbol that represents something, like an action or notice.
 */
const Icon = forwardRef<SVGSVGElement, IconProps>(IconComponent);

export default Icon;
