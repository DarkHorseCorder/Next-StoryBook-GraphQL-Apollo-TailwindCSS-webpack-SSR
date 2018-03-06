import { useTextField } from '@react-aria/textfield';
import { useControlledState } from '@react-stately/utils';
import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';
import { useOptionalRef } from '@/hooks';
import { TextAreaProps, TextFieldBase } from './TextFieldBase';

// config

const DEFAULT_PROPS = {
  size: 'medium',
  required: false,
  autoresizes: false,
} as const;

function TextAreaComponent(
  props: TextAreaProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // state

  const [inputValue, setInputValue] = useControlledState(
    p.value,
    p.defaultValue,
    (value) => {
      p.onChange?.(value ?? '');
    }
  );

  // behavior

  const behaviorProps = p;
  const { labelProps, inputProps } = useTextField(
    {
      ...p,
      onChange: setInputValue,
      inputElementType: 'textarea',
      type: p.type === 'button' ? 'text' : p.type, // fix tooltip
    },
    inputRef
  );

  // height resizing

  const onHeightChange = useCallback(() => {
    if (p.autoresizes) {
      // https://stephanwagner.me/auto-resizing-textarea-with-vanilla-javascript
      const input = inputRef.current;
      if (input) {
        const prevAlignment = input.style.alignSelf;
        input.style.alignSelf = 'start';
        input.style.height = 'auto';
        input.style.height = `${input.scrollHeight}px`;
        input.style.alignSelf = prevAlignment;
      }
    }
  }, [p.autoresizes, inputRef]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      onHeightChange();
    }
  }, [onHeightChange, inputValue, inputRef]);

  return (
    <TextFieldBase
      ref={domRef}
      {...behaviorProps}
      inputRef={inputRef}
      labelProps={labelProps}
      inputProps={inputProps}
      isMultiLine
      autoresizes={p.autoresizes}
    />
  );
}

/**
 * TextAreas are multiline text inputs, useful for cases where users have
 * a sizable amount of text to enter.
 */
export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  TextAreaComponent
);
export default TextArea;
