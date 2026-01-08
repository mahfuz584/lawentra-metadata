import { secret_access_token } from './env';
import { ApiResponseType, GlobalFetchTypes } from './types';

export const globalFetch = async <T>({
  endPoint,
  queryParams,
}: GlobalFetchTypes): Promise<ApiResponseType<T>> => {
  const BASE_URL = 'https://graph.facebook.com/v24.0';
  const ACCESS_TOKEN = secret_access_token;

  if (!ACCESS_TOKEN) {
    return {
      success: false,
      data: null,
      message: 'Missing Facebook credentials',
    };
  }

  const url = new URL(`${BASE_URL}/${endPoint}`);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  url.searchParams.set('access_token', ACCESS_TOKEN);

  const finalUrl = url.toString();

  const res = await fetch(finalUrl, {
    next: {
      revalidate: 60,
      tags: ['facebook-data'],
    },
  });

  console.log(finalUrl);

  if (!res.ok) {
    const text = await res.text();
    console.log(res);
    return {
      success: false,
      data: null,
      message: `Facebook API error ${res.status}: ${text}`,
    };
  }

  const json = (await res.json()) as T;

  return {
    success: true,
    message: 'Successfully Fetched Data',
    data: json,
  };
};
