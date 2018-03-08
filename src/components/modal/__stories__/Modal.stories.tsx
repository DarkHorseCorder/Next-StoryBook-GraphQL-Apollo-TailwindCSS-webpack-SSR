import React, { ReactElement } from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ModalRootProps, ModalHeaderProps, ModalFooterProps } from '../Modal';
import { enableAddons } from '../../../utils/storybook-shared';
import { Button } from '../../button';
import { createBubble, createPlaceholder } from '../../../assets/icons';
import { Modal } from '..';

export default {
  title: 'Components/Modal',
  component: Modal,
};

// utils

function ExampleHeader(props: Omit<ModalHeaderProps, 'title'>) {
  return (
    <Modal.Header
      {...props}
      title="Modal title"
      subtitle="Modal subtitle"
      hasCloseButton
    >
      <Modal.Action
        icon={createPlaceholder}
        onPress={action('action 1 pressed')}
      />
      <Modal.Action
        icon={createPlaceholder}
        onPress={action('action 2 pressed')}
      />
      <Modal.Action
        icon={createPlaceholder}
        onPress={action('action 3 pressed')}
      />
    </Modal.Header>
  );
}

function ExampleFooter(props: Omit<ModalFooterProps, 'children'>) {
  return (
    <Modal.Footer {...props}>
      <Modal.FooterButton isCloseButton>Cancel</Modal.FooterButton>
      <Modal.FooterButton isPrimary onPress={action('submit pressed')}>
        Submit
      </Modal.FooterButton>
    </Modal.Footer>
  );
}

// example

export const Example: Story<ModalRootProps> = () => (
  <div className="flex justify-center">
    <Modal.Root>
      <Modal.Trigger>
        <Button variant="primary" icon={createBubble}>
          Open Modal
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        <ExampleHeader hasCloseButton />
        <p>This is a modal with a header and a footer.</p>
        <ExampleFooter />
      </Modal.Content>
    </Modal.Root>
  </div>
);
enableAddons(Example, ['a11y', 'actions']);

// headers

function ActionWithIcon() {
  return <Modal.Action icon={createPlaceholder} />;
}

const headerVariants = {
  Title: <Modal.Header title="Modal title" />,
  'Title + subtitle': (
    <Modal.Header title="Modal title" subtitle="Modal subtitle" />
  ),
  'Title + close button': <Modal.Header title="Modal title" hasCloseButton />,
  'Title + subtitle + close button': (
    <Modal.Header
      title="Modal title"
      subtitle="Modal subtitle"
      hasCloseButton
    />
  ),
  'Title + actions': (
    <Modal.Header title="Modal title">
      <ActionWithIcon />
      <ActionWithIcon />
      <ActionWithIcon />
    </Modal.Header>
  ),
  'Title + subtitle + actions': (
    <Modal.Header title="Modal title" subtitle="Modal subtitle">
      <ActionWithIcon />
      <ActionWithIcon />
      <ActionWithIcon />
    </Modal.Header>
  ),
  'Title + close button + actions': (
    <Modal.Header title="Modal title" hasCloseButton>
      <ActionWithIcon />
      <ActionWithIcon />
      <ActionWithIcon />
    </Modal.Header>
  ),
  'Title + subtitle + close button + actions': (
    <Modal.Header title="Modal title" subtitle="Modal subtitle" hasCloseButton>
      <ActionWithIcon />
      <ActionWithIcon />
      <ActionWithIcon />
    </Modal.Header>
  ),
};

export const HeaderExamples = (): ReactElement => (
  <div className="space-y-[1rem]">
    {Object.entries(headerVariants).map(([key, value]) => (
      <Modal.Root>
        <Modal.Trigger>
          <Button>{key}</Button>
        </Modal.Trigger>
        <Modal.Content>{value}</Modal.Content>
      </Modal.Root>
    ))}
  </div>
);

// Size examples
// -------------

export const SizeExamples = (): ReactElement => (
  <div className="space-y-[1rem]">
    <h4 className="text-h4">Medium width</h4>
    <Modal.Root>
      <Modal.Trigger>
        <Button>Medium</Button>
      </Modal.Trigger>
      <Modal.Content size="medium">
        <ExampleHeader />
        <p className="text-body-md">
          This is a medium sized Modal. See how it&apos;s bigger than the small
          one? That&apos;s pretty cool.
        </p>
        <ExampleFooter />
      </Modal.Content>
    </Modal.Root>
    <h4 className="text-h4">Small width</h4>
    <Modal.Root>
      <Modal.Trigger>
        <Button>Small</Button>
      </Modal.Trigger>
      <Modal.Content size="small">
        <Modal.Header
          title="Modal title"
          subtitle="Modal subtitle"
          hasCloseButton
        >
          <Modal.Action icon={createPlaceholder} />
          <Modal.Action icon={createPlaceholder} />
        </Modal.Header>
        <p className="text-body-md">
          This is a small sized Modal. See how it&apos;s smaller than the medium
          one? That&apos;s pretty cool.
        </p>
        <ExampleFooter />
      </Modal.Content>
    </Modal.Root>
  </div>
);
