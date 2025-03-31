import { useEffect, useMemo, useState } from 'react';
import { isNotNil } from 'es-toolkit';

interface UseMediaQueryProps {
  minWidth?: number;
  maxWidth?: number;
}

export function useMediaQuery({ minWidth, maxWidth }: UseMediaQueryProps) {
  const [matches, setMatches] = useState(false);

  const query = useMemo(() => {
    if (isNotNil(minWidth) && isNotNil(maxWidth)) return `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
    if (isNotNil(minWidth)) return `(min-width: ${minWidth}px)`;
    if (isNotNil(maxWidth)) return `(max-width: ${maxWidth}px)`;
    return '';
  }, [minWidth, maxWidth]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
