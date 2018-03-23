import React, { ReactElement } from 'react';
import SSRContext from './context';
import isServer from '../../utils/isServer';

export type ContextValue = {
  isMobile: boolean;
  isServer: boolean;
};

export default function SSRProvider({
  children,
  isMobile,
}: {
  children: ReactElement;
  isMobile?: boolean;
}): ReactElement {
  return (
    <SSRContext.Provider value={{ isMobile: !!isMobile, isServer: isServer() }}>
      {children}
    </SSRContext.Provider>
  );
}
