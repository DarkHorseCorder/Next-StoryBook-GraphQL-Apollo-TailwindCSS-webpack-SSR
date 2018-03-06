import { useTextField } from '@react-aria/textfield';
import React, { ForwardedRef, forwardRef, ReactElement, useRef } from 'react';
import { useOptionalRef } from '@/hooks';
import { TextFieldBase, TextFieldProps } from './TextFieldBase';
// config

const DEFAULT_PROPS = {
  size: 'medium',
  required: false,
} as const;

// component

function TextFieldComponent(
  props: TextFieldProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);
  const inputRef = useRef<HTMLInputElement>(null);

  // behavior
  // --------

  const behaviorProps = p;
  const { labelProps, inputProps } = useTextField(
    {
      ...p,
      type: p.type === 'button' ? 'text' : p.type, // fix tooltip
    },
    inputRef
  );

  return (
    <TextFieldBase
      ref={domRef}
      {...behaviorProps}
      labelProps={labelProps}
      inputProps={inputProps}
      inputRef={inputRef}
    />
  );
}

/**
 * A text input.
 */
export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  TextFieldComponent
);

export default TextField;
