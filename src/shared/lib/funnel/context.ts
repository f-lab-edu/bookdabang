import { createContext, useContext } from 'react';
import { isNil } from 'es-toolkit';
import { Funnel } from './model';

export const FunnelContext = createContext<Funnel | null>(null);

export function useFunnelContext() {
  const funnel = useContext(FunnelContext);
  if (isNil(funnel)) throw new Error('FunnelContext is not provided!');
  return funnel;
}
