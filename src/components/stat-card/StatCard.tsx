import clsx from 'clsx';
import React, { ReactElement, ForwardedRef, forwardRef, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

import {
  makeElementClassNameFactory,
  makeRootClassName,
  StyleProps,
  TooltipComponentProps,
  useTooltipComponentProps,
  TooltipForwardProps,
  useTooltipForwardProps
} from '@/utils';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useOptionalRef } from '@/hooks';
import type { ButtonProps } from '../button';
import Icon, { IconData } from '../icon/Icon';
import { createTrendingDown, createTrendingUp } from '@/assets/icons';
import Badge from '../badge/Badge';
import { OptionalTooltip } from '../tooltip/Tooltip';
import Text from '../text/Text'

export type StatCardProps = StyleProps &
  Pick<TooltipComponentProps, 'tooltipSide'> &
  Omit<TooltipForwardProps, 'onKeyDown' | 'onBlur'> & {
    /**
     * The size of the stat card
     * @default "medium"
     */
    size?: 'small' | 'medium' | 'large' | 'custom';

    /**
     * Main stat of the card
     */
    title: string;

    /**
     * Description string of the card
     */
    description?: string;

    /**
     * Icon of the stat card positioned at the left-top
     */
    icon?: IconData | ReactElement

    /**
     * Optional badge of the card. If badgeLabel is available,
     * badge would be displayed at the right-top of the card.
     */
    badgeLabel?: string;

    /**
     * Whether the recent stat is positive or negative
     * @default "default"
     */
    variant?: 'positive' | 'negative' | 'default'

    /**
     * Recent trends that shows the latest trend. The value range
     * is [1, 100]
     */
    trend?: number[];

    /**
     * Press handler
     */
    onPress?: ButtonProps['onPress']

    /**
     * Optional tooltip
     */
    tooltip?: string;
  };

const ROOT = makeRootClassName('StatCard');
const el = makeElementClassNameFactory(ROOT);

const POSITIVE_VARIANT_ICON = createTrendingUp
const NEGATIVE_VARIANT_ICON = createTrendingDown

const TRENDING_STROKE_COLOR = "#8884d8"

const DEFAULT_PROPS = {
  size: 'medium',
  variant: 'default'
} as const;

function StatCardComponent(
  props: StatCardProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement {
  const p = { ...DEFAULT_PROPS, ...props };
  const tooltipProps = useTooltipComponentProps(p);
  const tooltipForwardProps = useTooltipForwardProps(p);

  const domRef = useOptionalRef(ref)
  const isInteractive = !!p.onPress
  const { buttonProps, isPressed } = useButton(p, domRef)
  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();

  const cardProps = isInteractive ? mergeProps(
    buttonProps, hoverProps, focusProps, tooltipForwardProps
  ) : tooltipForwardProps;

  // trends data for rechart to use
  const trends = useMemo(() => {
    if (p.trend) {
      return p.trend.map((value: number) => ({ v: value }))
    } else {
      return []
    }
  }, [p.trend]);

  const isBadgeExist = p.variant !== 'default' || !!p.badgeLabel
  const badge = useMemo(() => {
    if (isBadgeExist) {
      return (
        <Badge variant='primary' className={el`badge`} size='small'>
          {p.variant !== 'default' && (
            <Icon
              content={p.variant === 'positive' ? POSITIVE_VARIANT_ICON : NEGATIVE_VARIANT_ICON}
              className={el`variant-icon`}
            />
          )}
          {p.badgeLabel}
        </Badge>
      )
    } else {
      return null;
    }
  }, [p.variant, p.badgeLabel])

  const isOnlyTitleBadge = (
    isBadgeExist && !p.icon && (!p.trend || !p.trend.length) && !p.description
  );

  return (
    <OptionalTooltip {...tooltipProps} content={p.tooltip} isInstant>
      <div
        {...cardProps}
        className={clsx(
          `${ROOT} size-${p.size} variant-${p.variant}`,
          {
            'is-hovered': isHovered,
            'is-pressed': isPressed,
            'is-focus-visible': isFocusVisible,
            'is-interactive': isInteractive
          },
          p.className
        )}
      >
        {isOnlyTitleBadge ? (
          <section className={el`content`}>
            <div className={el`title-badge`}>
              <Text type='h5' className={el`title`}>{p.title}</Text>
              {badge}
            </div>
          </section>
        ) : (
          <>
            {/* icon, title and description */}
            <section className={el`content`}>
              {!!p.icon && <Icon className={el`icon`} content={p.icon} />}
              <div className={el`title-desc`}>
                <Text type='h5' className={el`title`}>{p.title}</Text>
                {!!p.description && (
                  <Text type='body-sm' className={el`desc`}>
                    {p.description}
                  </Text>
                )}
              </div>
            </section>

            {/* trend graph */}
            {trends.length > 0 && (
              <section className={isBadgeExist ? el`trend-end` : el`trend-center`}>
                <ResponsiveContainer width='60%' height='100%'>
                  <LineChart data={trends} width={200} height={160}>
                    <Line
                      type="monotone"
                      dot={false}
                      dataKey="v"
                      stroke={TRENDING_STROKE_COLOR}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </section>
            )}

            {/* badge at the right top corner */}
            {badge}
          </>
        )}

        {isInteractive && <div className={el`overlay`} />}
      </div>
    </OptionalTooltip>
  );
};

export const StatCard = forwardRef<HTMLElement, StatCardProps>(StatCardComponent);

export default StatCard;