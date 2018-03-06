import React from 'react';
import { SnackbarKey, useSnackbar } from 'notistack';
import type { ToastActionProps, ToastProps } from './Toast';
import Toast from './Toast';

type ToastMessage = string;
type ToastOptions = {
  variant?: ToastProps['variant'];
  description?: ToastProps['description'];
  isDismissible?: ToastProps['isDismissible'];
  actions?: ToastActionProps[];
};
type ToastKey = SnackbarKey;
type UseToastActions = {
  sendToast: (message: ToastMessage, options?: ToastOptions) => ToastKey;
  dismissToast: (key?: ToastKey) => void;
};

export default function useToast(): UseToastActions {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function sendToast(message: ToastMessage, options: ToastOptions = {}) {
    const getToastProps = (key: ToastKey): ToastProps => ({
      title: message,
      description: options.description,
      variant: options.variant,
      isDismissible: options.isDismissible,
      actions: options?.actions?.map((action) => {
        if (action.isDismissAction)
          return {
            ...action,
            href: '#',
            onPress: (event, ...args) => {
              action?.onPress?.(event, ...args);
              closeSnackbar(key);
            },
          };
        return action;
      }),
    });
    return enqueueSnackbar(message, {
      content: (key) => (
        <Toast {...getToastProps(key)} onDismiss={() => closeSnackbar(key)} />
      ),
    });
  }

  return { sendToast, dismissToast: closeSnackbar };
}
