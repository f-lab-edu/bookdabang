'use client';

import { Suspense, SuspenseProps } from 'react';
import { ErrorBoundary, ErrorBoundaryPropsWithRender } from 'react-error-boundary';

export interface AsyncBoundaryProps extends Omit<ErrorBoundaryPropsWithRender, 'fallbackRender'> {
  pendingFallback: SuspenseProps['fallback'];
  rejectedFallback: ErrorBoundaryPropsWithRender['fallbackRender'];
}

const AsyncBoundary = ({ pendingFallback, rejectedFallback, children, ...errorBoundaryProps }: AsyncBoundaryProps) => {
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
