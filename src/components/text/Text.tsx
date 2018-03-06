import React, { forwardRef } from 'react';
import type { ReactNode, ForwardedRef, ReactElement } from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import clsx from 'clsx';
import { useOptionalRef } from '@/hooks';
import { makeRootClassName } from '../../utils';
import type { StyleProps } from '../../utils';

// prop types

type AllowedElements = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TextProps = StyleProps & {
  /**
   * The typography style to use.
   * @default "body-md"
   */
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body-lg'
    | 'body-md'
    | 'body-sm';

  /**
   * Whether to use heavy styles, for body typographies.
   * @default false
   */
  isHeavy?: boolean;

  /** Which element the text should be rendered as. */
  as?: AllowedElements;

  /** The text to render. */
  children?: ReactNode;
};

// config

const ROOT = makeRootClassName('Text');

const DEFAULT_PROPS = {
  type: 'body-md',
  isHeavy: false,
} as const;

const DEFAULT_ELEMENT = 'p';
const DEFAULT_ELEMENT_BY_TYPE: Record<
  NonNullable<TextProps['type']>,
  NonNullable<TextProps['as']>
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-lg': DEFAULT_ELEMENT,
  'body-md': DEFAULT_ELEMENT,
  'body-sm': DEFAULT_ELEMENT,
} as const;

// helpers

const PolymorphicText = React.forwardRef(function PolymorphicText(
  // eslint-disable-next-line react/prop-types
  { as: Comp = 'p', ...props },
  forwardedRef
) {
  return <Comp {...props} ref={forwardedRef} />;
}) as Polymorphic.ForwardRefComponent<'p', unknown>;

// main

function TextComponent(
  { ...props }: TextProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);

  const elementType = p.as ?? DEFAULT_ELEMENT_BY_TYPE[p.type];
  const type =
    p.type.startsWith('body-') && p.isHeavy ? `${p.type}-heavy` : p.type;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore temp. workaround, see https://github.com/radix-ui/primitives/discussions/665
    <PolymorphicText
      ref={domRef}
      as={elementType}
      className={clsx(`${ROOT} type-${type}`, p.className)}
    >
      {p.children}
    </PolymorphicText>
  );
}

/**
 * Styled text. Supports specifying the rendered element via the `as` prop.
 */
const Text = forwardRef<HTMLElement, TextProps>(TextComponent);

export default Text;
