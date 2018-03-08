import { createCheck, createChevronDown } from '@/assets/icons';
import {
  makeElementClassNameFactory,
  makeRootClassName,
  StyleProps,
} from '@/utils';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, ReactElement, ReactNode } from 'react';
import { Icon } from '..';

export type OptionProps<T> = {
  /**
   * The value of the option.
   * Used by the select parent's renderValue to render the option
   * when selected and used in the state of the select.
   */
  value: T;

  /**
   * The content of the option.
   */
  children: ReactNode;
  /** Whether the options is disabled. */
  isDisabled?: boolean;
};

export type SelectProps<T> = StyleProps & {
  /** Whether the select should be disabled. @default false */
  isDisabled?: boolean;

  /** The size of the select dropdown. @default 'medium' */
  size?: 'medium' | 'small';

  /**
   * The option elements to populate the select menu with.
   */
  children: ReactElement<OptionProps<T>>[];

  /**
   * Handler to call when an option is selected.
   */
  onChange: (value: T) => void;

  /**
   * The input value. Providing null will select no
   * options. If the value is an object, it must have reference
   * equality with the option's value to be selected. If the value
   * is not an object, the string representation must match with the
   * string representation of the option to be selected.
   */
  value: T;

  /**
   * Handler to render the selected value.
   */
  renderValue: (value: T) => ReactNode;

  /** Message to put in the input when no option is selected @default 'Select...'*/
  placeholder?: string;

  /** The label of the select input */
  label?: string;
};

const ROOT = makeRootClassName('Select');
const el = makeElementClassNameFactory(ROOT);

const DROPDOWN_ICON = createChevronDown;
const SELECTED_ICON = createCheck;

const DEFAULT_PROPS = {
  placeholder: 'Select...',
  size: 'medium',
  isDisabled: false,
} as const;

export function Option<T>(props: OptionProps<T>): ReactElement {
  return <></>;
}

function Select<T>(props: SelectProps<T>): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };

  // @TODO create optional uncontrolled state

  return (
    <Listbox
      as="div"
      className={clsx(`${ROOT} size-${p.size}`, {
        'is-disabled': p.isDisabled,
      })}
      value={p.value}
      onChange={p.onChange}
      disabled={p.isDisabled}
    >
      {({ disabled }) => (
        <>
          {p.label && (
            <label className={el`label`}>
              {p.label}
              <div className={el`label-required-indicator`} />
            </label>
          )}
          <Listbox.Button as="div" className={clsx(el`input-wrapper`)}>
            <div className={el`text`}>
              {!p.value && (
                <span className={el`placeholder`}>{p.placeholder}</span>
              )}
              {p.value && p.renderValue(p.value)}
            </div>
            <Icon content={DROPDOWN_ICON} className={el`dropdown-icon`} />
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-in"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-75 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={el`menu`}>
              {React.Children.map(p.children, ({ props }, idx) => (
                <Listbox.Option
                  key={idx}
                  value={props.value}
                  disabled={props.isDisabled}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={clsx(el`option`, {
                        'is-selected': selected,
                        'is-active': active,
                        'is-disabled': props.isDisabled,
                      })}
                    >
                      {props.children}
                      {selected && (
                        <Icon
                          content={SELECTED_ICON}
                          className={el`selected-icon`}
                        />
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}

//@TODO switch to radix rather than headlessui it's when ready
export default Select;
