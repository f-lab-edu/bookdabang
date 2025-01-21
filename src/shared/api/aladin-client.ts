import ky from 'ky';
import { ALADIN_API_KEY, ALADIN_API_URL } from '@/shared/config/aladin';

export const aladinApi = ky.create({
  prefixUrl: ALADIN_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const url = new URL(request.url);
        url.searchParams.set('ttbkey', ALADIN_API_KEY);
        return new Request(url, request);
      },
    ],
  },
});
