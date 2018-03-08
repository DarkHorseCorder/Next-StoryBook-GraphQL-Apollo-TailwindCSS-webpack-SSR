/* eslint-disable react/destructuring-assignment */
import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import * as Radix from '@radix-ui/react-dialog';
import type { DialogProps, DialogContentProps } from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { Button } from '../button';
import { createClose } from '../../assets/icons';
import { makeRootClassName, makeElementClassNameFactory } from '../../utils';
import type { IconData } from '../icon';
import type { ButtonProps } from '../button';
import type { StyleProps } from '../../utils';

export type ModalRootProps = DialogProps &
  StyleProps & {
    /** Expects children: `Trigger` and `Content`. */
    children: ReactNode;
  };

export type ModalTriggerProps = {
  /** The component that should cause the dialog to open on press. */
  children: ReactNode;
};

export type ModalContentProps = StyleProps &
  DialogContentProps & {
    /**
     * The size of the dialog.
     * @default "medium"
     */
    size?: 'medium' | 'small';

    /** The content of the modal. Accepts `Header`, `Footer` or any other components. */
    children: ReactNode;
  };

export type ModalHeaderProps = StyleProps & {
  /** The title of the modal. */
  title: string;

  /**
   * Whether to show a close button for the modal in the top left.
   * @default false
   */
  hasCloseButton?: boolean;

  /** A subtitle for the  modal. */
  subtitle?: string;

  /**
   * Optional actions to display on the right side of the modal header.
   * Accepts `Action` components.
   */
  children?: ReactElement<ModalHeaderActionProps>[];
};

export type ModalHeaderActionProps = {
  /** The header action's icon. */
  icon?: IconData;

  // TODO: not sure why this is necessary, but it is
  onPress?: ButtonProps['onPress'];
};

export type ModalFooterProps = StyleProps & {
  /** Primary and secondary buttons in the footer. Accepts `FooterButton` components. */
  children: ReactElement<ModalFooterButtonProps>[];
};

export type ModalFooterButtonProps = Pick<ButtonProps, 'children'> & {
  /**
   * Whether the button is the primary one.
   * @default false
   */
  isPrimary?: boolean;

  /**
   * Whether the button closes the dialog on press.
   * @default false
   */
  isCloseButton?: boolean;

  // TODO: not sure why this is necessary, but it is
  onPress?: ButtonProps['onPress'];
};

// config
// ------

const ROOT = makeRootClassName('Modal');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_CONTENT_PROPS = {
  size: 'medium',
} as const;

const DEFAULT_HEADER_PROPS = {
  hasCloseButton: false,
} as const;

const DEFAULT_FOOTER_BUTTON_PROPS = {
  isPrimary: false,
  isCloseButton: false,
} as const;

const CLOSE_ICON = createClose;

// components

function Root(p: ModalRootProps): ReactElement {
  const { children, ...otherProps } = p;

  return (
    <Radix.Root {...otherProps}>
      <Radix.Overlay asChild>
        <div className={el`overlay`} />
      </Radix.Overlay>
      {children}
    </Radix.Root>
  );
}

function Trigger({ children }: ModalTriggerProps): ReactElement {
  return <Radix.Trigger asChild>{children}</Radix.Trigger>;
}

function Content(props: ModalContentProps): ReactElement {
  const p = { ...DEFAULT_CONTENT_PROPS, ...props };
  const { children, className, size, ...otherProps } = p;

  return (
    <Radix.Content
      {...otherProps}
      className={clsx(ROOT, className, `size-${size}`)}
    >
      {p.children}
    </Radix.Content>
  );
}

function CloseButton(props: ButtonProps) {
  return (
    <Button
      aria-label="Close Modal"
      size="small"
      isGhost
      className={el`header-close-button`}
      icon={CLOSE_ICON}
      {...props}
    />
  );
}

function Header(props: ModalHeaderProps): ReactElement {
  const p = { ...DEFAULT_HEADER_PROPS, ...props };

  return (
    <div className={clsx(el`header`, p.className)}>
      {p.hasCloseButton && (
        <Radix.Close asChild>
          <CloseButton />
        </Radix.Close>
      )}
      <div className={el`header-titles`}>
        {p.subtitle && <p className={el`header-subtitle`}>{p.subtitle}</p>}
        <p className={el`header-title`}>{p.title}</p>
      </div>
      {p.children && <div className={el`header-actions`}>{p.children}</div>}
    </div>
  );
}

function Action(p: ModalHeaderActionProps): ReactElement {
  return (
    <Button
      isGhost
      size="small"
      onPress={p.onPress}
      icon={p.icon}
      className={el`header-action`}
    />
  );
}

function Footer(p: ModalFooterProps): ReactElement {
  return <div className={clsx(el`footer`, p.className)}>{p.children}</div>;
}

function FooterButton(props: ModalFooterButtonProps): ReactElement {
  const p = { ...DEFAULT_FOOTER_BUTTON_PROPS, ...props };

  return p.isCloseButton ? (
    <Radix.Close asChild>
      <Button variant={p.isPrimary ? 'primary' : 'default'}>
        {p.children}
      </Button>
    </Radix.Close>
  ) : (
    <Button variant={p.isPrimary ? 'primary' : 'default'} onPress={p.onPress}>
      {p.children}
    </Button>
  );
}

export default { Root, Trigger, Content, Header, Action, Footer, FooterButton };
