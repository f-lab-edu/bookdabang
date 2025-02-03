import ky from 'ky';
import { isServer } from '@tanstack/react-query';
import { ALADIN_API_KEY, ALADIN_API_URL } from '@/shared/config/aladin';

export const aladinApi = ky.create({
  prefixUrl: isServer ? ALADIN_API_URL : '/aladin-api',
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
