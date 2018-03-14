import { createPerson } from '@/assets/icons';
import {
  makeElementClassNameFactory,
  makeRootClassName,
  OmittedAriaProps,
  StyleProps,
  TooltipComponentProps,
  TooltipForwardProps,
  useTooltipComponentProps,
  useTooltipForwardProps,
} from '@/utils';
import { useOptionalRef } from '@/hooks';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { AriaButtonProps } from '@react-types/button';
import clsx from 'clsx';
import React, { ForwardedRef, forwardRef, ReactElement, useMemo } from 'react';
import { Icon } from '..';
import { OptionalTooltip } from '../tooltip/Tooltip';

export type AvatarData = {
  /** The image url of the user or entity. */
  image?: string;

  /** The full name of the user or entity. */
  name?: string;

  /** The initials of the user or entity. */
  initials?: string;
};

export type AvatarBehaviorProps = Omit<
  AriaButtonProps<'button'>,
  OmittedAriaProps
> & {
  /**
   * Whether the avatar should behave like a button.
   * @default false
   */
  isButton?: boolean;
};

export type AvatarProps = StyleProps &
  AvatarData &
  AvatarBehaviorProps &
  Pick<TooltipComponentProps, 'tooltipSide'> &
  Omit<TooltipForwardProps, 'onKeyDown' | 'onBlur'> & {
    /**
     * The avatar size.
     * @default "medium"
     */
    size?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | '2xl';
  };

const ROOT = makeRootClassName('Avatar');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  size: 'medium',
  isButton: false,
} as const;

const USER_ICON_PATH = createPerson;
const FALLBACK_RENDER_DELAY = 1000;

// helpers

type ContentType = 'image' | 'initials' | 'fallback';
function getContentType(image?: string, initials?: string): ContentType {
  if (image) return 'image';
  if (initials) return 'initials';
  return 'fallback';
}

function useInitials(
  size: NonNullable<AvatarProps['size']>,
  initials?: string,
  name?: string
) {
  return useMemo(() => {
    let finalInitials: string = initials?.substr(0, 2) ?? '';
    if (!initials) {
      if (!name) return {};

      const matchResult = name?.matchAll(/(\S)\S*/g);
      const matches = [...(Array.from(matchResult) ?? [])].map((r) => r[1]);

      if (!matches) return {};

      finalInitials = `${matches[0]}${matches[1] || ''}`;
    }

    const fullInitials = finalInitials;

    if (size === 'medium' || size === 'small' || size === 'xs')
      finalInitials = finalInitials[0].toUpperCase();
    else finalInitials = finalInitials.toUpperCase();

    return { initials: finalInitials, fullInitials };
  }, [size, initials, name]);
}

// main

function AvatarComponent(
  props: AvatarProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const domRef = useOptionalRef(ref);
  const tooltipProps = useTooltipComponentProps(p);

  const isInteractive = p.onPress || p.isButton;
  const isDisabled = !isInteractive || p.isDisabled;
  const tooltipForwardProps = useTooltipForwardProps(p);
  const { buttonProps, isPressed } = useButton({ ...p, isDisabled }, domRef);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();
  const interactiveProps = isInteractive ? [buttonProps, hoverProps] : [];
  const behaviorProps = mergeProps(
    tooltipForwardProps,
    focusProps,
    ...interactiveProps
  );

  // rendering

  const { initials, fullInitials } = useInitials(p.size, p.initials, p.name);
  const contentType = getContentType(p.image, initials);

  function renderInitials() {
    return <>{initials && <p className={el`initials`}>{initials}</p>}</>;
  }

  function renderIcon() {
    return <Icon className={el`icon`} content={USER_ICON_PATH} size="custom" />;
  }

  function renderImage() {
    return (
      <>
        <RadixAvatar.Image src={p.image} className={el`image`} />
        <RadixAvatar.Fallback delayMs={FALLBACK_RENDER_DELAY}>
          {initials ? renderInitials() : renderIcon()}
        </RadixAvatar.Fallback>
      </>
    );
  }

  function renderContent(type: ContentType) {
    switch (type) {
      case 'image':
        return renderImage();
      case 'initials':
        return renderInitials();
      case 'fallback':
        return renderIcon();
      default:
        throw new Error('Unknown content type');
    }
  }

  return (
    <OptionalTooltip {...tooltipProps} content={p.name} isInstant>
      <RadixAvatar.Root
        ref={domRef}
        tabIndex={0}
        {...behaviorProps}
        className={clsx(
          `${ROOT} size-${p.size}`,
          {
            'is-hovered': isHovered,
            'is-pressed': isPressed,
            'is-focus-visible': isFocusVisible,
          },
          p.className
        )}
      >
        {isInteractive && <div className={el`overlay`} />}
        {renderContent(contentType)}
        <div className={el`ring`} />
      </RadixAvatar.Root>
    </OptionalTooltip>
  );
}

export const Avatar = forwardRef<HTMLElement, AvatarProps>(AvatarComponent);

export default Avatar;
