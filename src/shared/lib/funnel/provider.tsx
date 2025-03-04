import { ReactNode } from 'react';
import { FunnelContext } from './context';
import { Funnel } from './model';

export interface FunnelProviderProps {
  children: ReactNode;
  funnel: Funnel;
}

export function FunnelProvider({ children, funnel }: FunnelProviderProps) {
  return <FunnelContext.Provider value={funnel}>{children}</FunnelContext.Provider>;
}
