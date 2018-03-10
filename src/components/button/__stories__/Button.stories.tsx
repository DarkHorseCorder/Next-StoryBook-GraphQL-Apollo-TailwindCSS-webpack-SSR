import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import type { ButtonProps } from '..';
import { createPlaceholder } from '../../../assets/icons';
import { Button } from '..';
import {
  enableAddons,
  addCustomControls,
} from '../../../utils/storybook-shared';

export default {
  title: 'Components/Button',
  component: Button,
};

// playground

const PlaygroundTemplate: Story<ButtonProps> = (props) => {
  return (
    <div className="flex justify-center">
      <Button {...props} onPress={action('press')} />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  variant: 'default',
  children: 'Button',
};
enableAddons(Playground, ['controls', 'actions', 'a11y', 'backgrounds']);
addCustomControls(Playground, ['icons']);

// width

function ButtonsByWidth(props: ButtonProps) {
  return (
    <div className="space-y-2 w-[500px]">
      <h2 className="text-sm">Fit content (default)</h2>
      <Button {...props} icon={createPlaceholder} />
      <h2 className="text-sm">Fixed width</h2>
      <Button {...props} className="w-[240px]" icon={createPlaceholder} />
      <h2 className="text-sm">Full width</h2>
      <Button {...props} className="w-full" icon={createPlaceholder} />
      <h2 className="text-sm">Text overflow</h2>
      <Button {...props} className="w-[240px]">
        This is some really really really long button text
      </Button>
      <Button {...props} className="w-[240px]" icon={createPlaceholder}>
        This is some really really really long button text
      </Button>
      <Button
        {...props}
        className="w-[240px]"
        icon={createPlaceholder}
        isDropdown
      >
        This is some really really really long button text
      </Button>
    </div>
  );
}

const WidthExamplesTemplate: Story<ButtonProps> = (props: ButtonProps) => (
  <ButtonsByWidth {...props}>Button</ButtonsByWidth>
);

export const WidthExamples = WidthExamplesTemplate.bind({});
WidthExamples.argTypes = {
  icon: { table: { disable: true } },
  className: { table: { disable: true } },
};

function ButtonsByContent(props: ButtonProps) {
  const { children, ...propsWithoutChildren } = props;
  return (
    <>
      <Button {...props} />
      <Button {...props} icon={createPlaceholder} />
      <Button {...propsWithoutChildren} icon={createPlaceholder} />
    </>
  );
}

function ButtonRow({
  withDropdown,
  ...props
}: ButtonProps & { withDropdown?: boolean }) {
  return (
    <div className="flex gap-x-2">
      <ButtonsByContent {...props} />
      {withDropdown && <ButtonsByContent {...props} isDropdown />}
    </div>
  );
}

function ButtonsBySize({
  withGhost,
  ...props
}: ButtonProps & { withGhost?: boolean }) {
  const isLight = props.variant === 'light';

  return (
    <>
      <h2 className={clsx('text-sm', { 'text-white': isLight })}>Medium</h2>
      <ButtonRow {...props} withDropdown>
        Button
      </ButtonRow>
      <ButtonRow {...props} withDropdown isDisabled>
        Disabled
      </ButtonRow>
      {withGhost && (
        <>
          <ButtonRow {...props} withDropdown isGhost>
            Ghost
          </ButtonRow>
          <ButtonRow {...props} withDropdown isGhost isDisabled>
            Ghost Disabled
          </ButtonRow>
        </>
      )}
      <h2 className={clsx('text-sm', { 'text-white': isLight })}>Small</h2>
      <ButtonRow {...props} withDropdown size="small">
        Button
      </ButtonRow>
      <ButtonRow {...props} withDropdown size="small" isDisabled>
        Disabled
      </ButtonRow>
      {withGhost && (
        <>
          <ButtonRow {...props} withDropdown size="small" isGhost>
            Ghost
          </ButtonRow>
          <ButtonRow {...props} withDropdown size="small" isGhost isDisabled>
            Ghost Disabled
          </ButtonRow>
        </>
      )}
      <h2 className={clsx('text-sm', { 'text-white': isLight })}>
        Extra small
      </h2>
      <ButtonRow {...props} withDropdown size="xs">
        Button
      </ButtonRow>
      <ButtonRow {...props} withDropdown size="xs" isDisabled>
        Disabled
      </ButtonRow>
      {withGhost && (
        <>
          <ButtonRow {...props} withDropdown size="xs" isGhost>
            Ghost
          </ButtonRow>
          <ButtonRow {...props} withDropdown size="xs" isGhost isDisabled>
            Ghost Disabled
          </ButtonRow>
        </>
      )}
    </>
  );
}

function VariantTemplateWithGhost(props: ButtonProps) {
  const { variant } = props;
  const isLight = variant === 'light';

  return (
    <div className="space-y-3">
      <h1 className={clsx('text-lg', { 'text-white': isLight })}>Normal</h1>
      <ButtonsBySize {...props} withGhost>
        Button
      </ButtonsBySize>
      <h1 className={clsx('text-lg', { 'text-white': isLight })}>Selected</h1>
      <ButtonsBySize {...props} withGhost isSelected>
        Button
      </ButtonsBySize>
    </div>
  );
}

// variants
// --------

export const Default = (): ReactElement => (
  <VariantTemplateWithGhost variant="default" />
);
export const Primary = (): ReactElement => (
  <VariantTemplateWithGhost variant="primary" />
);
export const Success = (): ReactElement => (
  <VariantTemplateWithGhost variant="success" />
);
export const Danger = (): ReactElement => (
  <VariantTemplateWithGhost variant="danger" />
);
export const Dark = (): ReactElement => (
  <VariantTemplateWithGhost variant="dark" />
);
export const Light = (): ReactElement => (
  <VariantTemplateWithGhost variant="light" />
);

Light.parameters = { backgrounds: {} };
enableAddons(Light, ['backgrounds']);
Light.parameters.backgrounds = {
  ...Light.parameters.backgrounds,
  default: 'dark',
};
