import clsx from 'clsx';
import React, { PropsWithChildren, ReactElement } from 'react';
import {
  makeElementClassNameFactory,
  makeRootClassName,
  StyleProps,
} from '@/utils';

export type SidebarProps = PropsWithChildren<StyleProps> & {
  /**
   * Logo component
   */
  logo?: ReactElement;

  /**
   * Sidebar size
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the sidebar has collapsed visual style (icon only for items)
   * @default false
   */
  isCollapsed?: boolean;

  /**
   * Whether the sidebar should display in dark mode
   * @default: false
   */
  isDarkMode?: boolean;
};

const ROOT = makeRootClassName('Sidebar');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {
  size: 'medium',
  isCollapsed: false,
  isDarkMode: false,
} as const;

function Sidebar(props: SidebarProps): ReactElement { 
  const p = { ...DEFAULT_PROPS, ...props };

  return (
    <aside
      className={clsx(
        `${ROOT} size-${p.size}`,
        { 'is-dark': p.isDarkMode, 'is-collapsed': p.isCollapsed },
        p.className)
      }
    >
      {p.logo && <div className={el`logo`}>{p.logo}</div>}
      {p.children}
    </aside>
  );
};

export default Sidebar;