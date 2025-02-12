import { useDebounce } from '@toss/react';
import { useRouter } from 'next/navigation';

const DEBOUNCE_DELAY_MS = 500;

export function useDebouncedSearch() {
  const router = useRouter();

  return useDebounce((q: string) => {
    if (q.trim() === '') {
      router.push('/?tab=new');
    } else {
      router.push(`/?q=${q}`);
    }
  }, DEBOUNCE_DELAY_MS);
}
