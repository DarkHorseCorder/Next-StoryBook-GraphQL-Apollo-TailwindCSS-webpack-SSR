import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import React, { ReactElement, ReactNode } from 'react';
import { SSRProvider as ReactAriaProvider } from '@react-aria/ssr';
import { IdProvider as RadixProvider } from '@radix-ui/react-id';

export type ProviderProps = {
  children?: ReactNode;
};

// config

const NOTISTACK_OPTIONS: Omit<SnackbarProviderProps, 'children'> = {
  maxSnack: 3,
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'bottom',
  },
};

// toast provider

function ToastProvider(p: { children?: ReactNode }) {
  const { children } = p;

  return <SnackbarProvider {...NOTISTACK_OPTIONS}>{children}</SnackbarProvider>;
}

// main provider

function Provider(props: ProviderProps): ReactElement {
  const { children } = props;

  return (
    <RadixProvider>
      <ReactAriaProvider>
        <ToastProvider>{children}</ToastProvider>
      </ReactAriaProvider>
    </RadixProvider>
  );
}

export default Provider;
