import { TooltipProps } from '@/components/tooltip/Tooltip';

/**
 * Props to include on any component that is wrapped in an
 * OptionalTooltip
 */
export type TooltipComponentProps = {
  /**
   * In which side of the component the tooltip should be placed.
   * @default "bottom"
   */
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Whether to show the tooltip instantly, without a delay.
   * @default false
   */
  isTooltipInstant?: boolean;

  /** The content of the tooltip. */
  tooltipContent?: string;
};

/**
 * Props that need to be included on any component that needs to be
 * wrapped in a Tooltip for the tooltip to work.
 *
 * You can select which of these you want to include for the tooltip
 * to trigger.
 */
export type TooltipForwardProps = {
  /** Handler that is called when the mouse enters the element. */
  onMouseEnter?: React.MouseEventHandler;

  /** Handler that is called when the mouse leaves the element. */
  onMouseLeave?: React.MouseEventHandler;

  /** Handler that is called when the mouse is clicked over the element. */
  onMouseDown?: React.MouseEventHandler;

  /** Handler that is called when the element receives focus. */
  onFocus?: React.FocusEventHandler;

  /** Handler that is called when the element loses focus. */
  onBlur?: React.FocusEventHandler;

  /** Handler that is called when a key is being pressed. */
  onKeyDown?: React.KeyboardEventHandler;
};

/**
 * Conveinience hook to grab only the tooltip related props out of a set
 * of props.
 * @param props
 * @returns
 */
export function useTooltipForwardProps(
  props: TooltipForwardProps
): TooltipForwardProps {
  return {
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onMouseDown: props.onMouseDown,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onKeyDown: props.onKeyDown,
  };
}

/**
 * Conveinience hook to translate TooltipComponentProps into props that can
 * be spread onto the OptionalTooltip in the implementation.
 * @param props
 * @returns
 */
export function useTooltipComponentProps(
  props: TooltipComponentProps
): Omit<TooltipProps, 'children'> {
  return {
    content: props.tooltipContent,
    side: props.tooltipSide,
    isInstant: props.isTooltipInstant,
  };
}
