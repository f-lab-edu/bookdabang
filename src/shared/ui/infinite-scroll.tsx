import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollProps {
  children: React.ReactNode;
  rootMargin?: string;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore?: () => void;
}

const InfiniteScroll = ({
  children,
  rootMargin = '0px 0px 300px 0px',
  isLoading,
  hasMore,
  onLoadMore,
}: InfiniteScrollProps) => {
  const { ref, inView } = useInView({
    rootMargin,
    skip: !hasMore,
  });

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      onLoadMore?.();
    }
  }, [hasMore, inView, isLoading, onLoadMore]);

  return (
    <>
      {children}
      <div
        ref={ref}
        aria-hidden="true"
      />
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </>
  );
};

export { InfiniteScroll };
