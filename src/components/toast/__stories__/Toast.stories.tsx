import React, { ReactElement } from 'react';
import { Story } from '@storybook/react';
import type { ToastProps } from '..';
import { createSend } from '../../../assets/icons';
import { Button } from '../../button';
import { Toast, useToast } from '..';
import { enableAddons } from '../../../utils/storybook-shared';

export default {
  title: 'Components/Toast',
  component: Toast,
};

const PlaygroundTemplate: Story<ToastProps & { withActions: boolean }> = ({
  withActions = false,
  ...props
}): ReactElement => {
  const { sendToast } = useToast();
  const actions = withActions
    ? [{ label: 'Undo' }, { label: 'Dismiss', isDismissAction: true }]
    : undefined;

  return (
    <div className="flex justify-center">
      <div className="space-y-[1rem]">
        <Button
          icon={createSend}
          variant="primary"
          onPress={() =>
            sendToast(props.title, {
              variant: props.variant,
              actions,
              description: props.description,
              isDismissible: props.isDismissible,
            })
          }
        >
          Send toast
        </Button>
        <Toast {...props} actions={actions} />
      </div>
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  variant: 'success',
  isDismissible: true,
  title: 'Payment has been made',
  description: "We'll email you your bill.",
  withActions: true,
};
Playground.argTypes = {
  withActions: {
    control: { type: 'boolean' },
  },
};
enableAddons(Playground, ['controls', 'actions', 'a11y']);

// variants

function ToastByArrangement(props: ToastProps) {
  return (
    <div className="grid grid-cols-2 gap-x-[1rem] gap-y-[2rem]">
      <div>
        <Toast {...props} />
      </div>
      <div>
        <Toast {...props} isDismissible />
      </div>
      <div>
        <Toast {...props} isDismissible actions={[{ label: 'Action 1' }]} />
      </div>
      <div>
        <Toast
          {...props}
          isDismissible
          actions={[{ label: 'Action 1' }, { label: 'Action 2' }]}
        />
      </div>
      <div>
        <Toast {...props} description="Here's a description." isDismissible />
      </div>
      <div>
        <Toast
          {...props}
          description="Here's a description."
          isDismissible
          actions={[{ label: 'Action 1' }, { label: 'Action 2' }]}
        />
      </div>
    </div>
  );
}

function ToastByState(props: ToastProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-h4">Default</h3>
      <ToastByArrangement {...props} variant="default" />
      <h3 className="text-h4">Success</h3>
      <ToastByArrangement {...props} variant="success" />
      <h3 className="text-h4">Error</h3>
      <ToastByArrangement {...props} variant="error" />
    </div>
  );
}

function ToastByWidth() {
  return (
    <div>
      <h2 className="text-h3">Short toast</h2>
      <ToastByState title="Short title" />
      <h2 className="text-h3 mt-[2rem]">Long toast</h2>
      <ToastByState title="Long title that makes the notification expand in width" />
    </div>
  );
}

export const Variants = (): ReactElement => <ToastByWidth />;

// width

export const WidthExamples = (): ReactElement => (
  <div className="space-y-4">
    <h2 className="text-h3">Short title</h2>
    <Toast title="Hello, friend." variant="success" />
    <h2 className="text-h3">Long title</h2>
    <Toast title="This is a super duper long title. Eventually it just wraps onto the next line." />
    <h2 className="text-h3">Long description</h2>
    <Toast
      title="Title"
      description="This time the description is very long and it too, like all anything this long, eventually wraps."
    />
    <h2 className="text-h3">Long title and description</h2>
    <Toast
      title="Now they're both so long that they wrap and that's good!"
      description="According to all known laws of aviation, there is no way a bee should be able to fly."
    />
  </div>
);

// hook example

export const UseToastHook = (): ReactElement => {
  const { sendToast, dismissToast } = useToast();

  const sendSimpleToast = () =>
    sendToast('Hi! I am a toast notification :)', {
      actions: [{ label: 'Dismiss', isDismissAction: true }],
    });

  const sendSuccessToast = () =>
    sendToast('Toast successfully displayed', {
      variant: 'success',
      isDismissible: true,
      description:
        'Congratulations! You managed to press a button. You will now be promoted to CEO of the world. Please check your email for next steps.',
      actions: [
        {
          label: 'Share',
        },
        {
          label: 'Dismiss',
          isDismissAction: true,
        },
      ],
    });

  const sendErrorToast = () =>
    sendToast('Failed to display toast', {
      variant: 'error',
      isDismissible: true,
      description:
        "Wow, you really screwed this one up... All you had to do is press the other button but you just couldn't resist pressing this one.",
      actions: [
        {
          label: 'Quit your job',
        },
        {
          label: 'Dismiss',
          isDismissAction: true,
        },
      ],
    });

  return (
    <div className="space-y-4">
      <Button onPress={sendSimpleToast}>Open simple toast</Button>
      <Button onPress={sendSuccessToast}>Open success toast</Button>
      <Button onPress={sendErrorToast}>Open error toast</Button>
      <Button onPress={() => dismissToast()}>Dismiss toasts</Button>
    </div>
  );
};
