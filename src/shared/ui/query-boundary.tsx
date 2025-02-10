'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { AsyncBoundary, AsyncBoundaryProps } from './async-boundary';

type QueryBoundaryProps = Omit<AsyncBoundaryProps, 'onReset'>;

const QueryBoundary = (props: QueryBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <AsyncBoundary
          {...props}
          onReset={reset}
        />
      )}
    </QueryErrorResetBoundary>
  );
};

export { QueryBoundary };
