import { secret_access_token } from './env';
import { ApiResponseType, GlobalFetchTypes, MetaError } from './types';

export const globalFetch = async <T extends object>({
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

  const res = await fetch(url.toString());
  const json = (await res.json()) as T | MetaError;

  if ('error' in json) {
    if (json.error.code === 190 && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('facebook-auth-error', { detail: json.error }));
    }
    return {
      success: false,
      data: null,
      message: json.error.message,
      rawError: json.error,
    };
  }

  return {
    success: true,
    data: json,
    message: 'Success',
  };
};
