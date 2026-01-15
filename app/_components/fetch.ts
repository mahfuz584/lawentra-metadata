import { cacheLife, cacheTag } from 'next/cache';
import { AppDataResponse } from './types';

export const fetchAppData = async (): Promise<AppDataResponse> => {
  'use cache';
  cacheLife('days');
  cacheTag('app-data');

  const response = await fetch('https://adsocial-api.codixel.site/api/v1/media-access-token');
  return await response.json();
};

// export const varifyToken = async ({ access_token }: { access_token: string }) => {
//   'use cache';
//   cacheLife('minutes');
//   cacheTag('app-data');

//   const url = `https://graph.facebook.com/debug_token?input_token=${access_token}&app_token=2050360739109934`;

//   const response = await fetch(url);
//   console.log(url);
//   return await response.json();
// };
