import { createContext } from 'react';

const SSRContext = createContext({
  isMobile: false,
  isServer: false,
});

export default SSRContext;
