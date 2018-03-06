/* eslint-disable jsx-a11y/label-has-associated-control */
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { AriaTextFieldProps } from '@react-types/textfield';
import clsx from 'clsx';
import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactElement,
  RefObject,
  TextareaHTMLAttributes,
} from 'react';
import { createCheck, createRingWarning } from '../../assets/icons';
import {
  makeElementClassNameFactory,
  makeRootClassName,
  StyleProps,
} from '../../utils';
import { useOptionalRef } from '@/hooks';
import Icon from '../icon/Icon';

export interface TextFieldBaseProps extends TextAreaProps {
  /**
   * Whether the field element should be a `textarea` instead of an `input`.
   * @default false
   */
  isMultiLine?: boolean;

  /**
   * The size of the input.
   * @default "medium"
   */
  size?: 'large' | 'medium' | 'small' | 'custom';

  /** The class name for the input element. */
  inputClassName?: string;

  /** The props for the label element. */
  labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, 'id'>;

  /** The props for the input element. */
  inputProps: Omit<
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>,
    'id'
  >;

  /** The input element's ref. */
  inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement>;

  /**
   * The text field's icon (svg path).
   */
  iconPath?: string;

  /**
   * Additional children to be included in the input wrapper.
   * Useful for customization (searchfield, etc.)
   */
  wrapperChildren?: ReactElement | ReactElement[];
}

export interface TextFieldProps extends StyleProps, AriaTextFieldProps {
  /**
   * The size of the input.
   * @default "medium"
   */
  size?: 'large' | 'medium' | 'small' | 'custom';

  /**
   * The text field's icon (svg path).
   */
  iconPath?: string;

  /**
   * The text fields's visual appearance.
   * @default "default"
   */
  variant?: 'default' | 'light';

  /**
   * Set tabIndex to -1 to disable keyboard interaction.
   * Check MDN docs {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex} for more information.
   * @default 0
   */
  tabIndex?: number;
}

export interface TextAreaProps extends TextFieldProps {
  /**
   * Whether the textarea autoresizes based on content
   * or allows manual resizing.
   * @default false
   */
  autoresizes?: boolean;
}

// config

const ROOT = makeRootClassName('TextFieldBase');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  labelPosition: 'top',
  isRequired: false,
  isMultiLine: false,
  autoresizes: false,
  variant: 'default',
  tabIndex: 0,
};

const VALID_ICON_PATH = createCheck;
const INVALID_ICON_PATH = createRingWarning;

// helpers

const InputOrTextArea = React.forwardRef(function PolymorphicTextFieldBase(
  { as: Comp = 'input', ...props },
  forwardedRef
) {
  return <Comp {...props} ref={forwardedRef} />;
}) as Polymorphic.ForwardRefComponent<'input', unknown>;

function TextFieldBaseComponent(
  props: TextFieldBaseProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const elementType = p.isMultiLine ? 'textarea' : 'input';
  const { placeholder, ...inputProps } = p.inputProps;
  const domRef = useOptionalRef(ref);

  // behavior
  // --------

  const { focusProps, isFocusVisible, isFocused } = useFocusRing({
    isTextInput: true,
  });
  const { isHovered, hoverProps } = useHover({ isDisabled: p.isDisabled });
  const inputBehaviorProps = mergeProps(focusProps, hoverProps, inputProps, {
    placeholder: ' ', // this hack makes :placeholder-shown work
  });

  const validationIconPath =
    p.validationState === 'valid' ? VALID_ICON_PATH : INVALID_ICON_PATH;

  return (
    <div
      ref={domRef}
      className={clsx(
        `${ROOT} size-${p.size} variant-${p.variant}`,
        {
          'is-required': p.isRequired,
          'is-multiline': p.isMultiLine,
          'has-autoresize': p.autoresizes,
          'has-icon': p.iconPath,
          'is-valid': p.validationState === 'valid',
          'is-invalid': p.validationState === 'invalid',
          'is-disabled': p.isDisabled,
          'is-hovered': isHovered,
          'is-focused': isFocused,
          'is-focus-visible': isFocusVisible,
        },
        p.className
      )}
    >
      {p.label && (
        <label {...p.labelProps} className={el`label`}>
          <span>{p.label}</span>
          {p.isRequired && <div className={el`label-required-indicator`} />}
        </label>
      )}
      <div className={el`input-wrapper`}>
        <InputOrTextArea
          as={elementType}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore temp. workaround, see https://github.com/radix-ui/primitives/discussions/665 */
          ref={p.inputRef}
          {...inputBehaviorProps}
          aria-placeholder={placeholder}
          className={clsx(p.inputClassName, el`input`)}
          tabIndex={p.tabIndex}
        />
        {p.iconPath && <Icon content={p.iconPath} className={el`icon`} />}
        <div className={el`placeholder-wrapper`}>
          <p className={el`placeholder`}>{placeholder}</p>
        </div>
        {p.validationState && !p.isDisabled && (
          <div className={el`validation-icon-wrapper`}>
            <Icon
              size="custom"
              className={el`validation-icon`}
              content={validationIconPath}
            />
          </div>
        )}
        {p.wrapperChildren && p.wrapperChildren}
      </div>
    </div>
  );
}

export const TextFieldBase = forwardRef<HTMLDivElement, TextFieldBaseProps>(
  TextFieldBaseComponent
);

export default TextFieldBase;
