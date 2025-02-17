'use client';

import { Suspense, SuspenseProps } from 'react';
import { ErrorBoundary, ErrorBoundaryPropsWithRender } from 'react-error-boundary';
import { Loading } from './loading';
import { Rejected } from './rejected';

export interface AsyncBoundaryProps extends Omit<ErrorBoundaryPropsWithRender, 'fallbackRender'> {
  pendingFallback?: SuspenseProps['fallback'];
  rejectedFallback?: ErrorBoundaryPropsWithRender['fallbackRender'];
}

const AsyncBoundary = ({
  pendingFallback = <Loading />,
  rejectedFallback = ({ error, resetErrorBoundary }) => (
    <Rejected
      error={error}
      onReset={resetErrorBoundary}
    />
  ),
  children,
  ...errorBoundaryProps
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary
      fallbackRender={rejectedFallback}
      {...errorBoundaryProps}
    >
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export { AsyncBoundary };
