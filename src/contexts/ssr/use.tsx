import { useContext } from 'react';
import SSRContext from './context';
import { ContextValue } from './provider';

export default function useSSRContext(): ContextValue {
  return useContext(SSRContext);
}
