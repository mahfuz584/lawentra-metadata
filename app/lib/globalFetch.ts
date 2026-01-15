import { ApiResponseType, GlobalFetchTypes, MetaError } from './types';

export const globalFetch = async <T extends object>({
  endPoint,
  accessToken,
  queryParams,
}: GlobalFetchTypes): Promise<ApiResponseType<T>> => {
  const BASE_URL = 'https://graph.facebook.com/v24.0';

  const url = new URL(`${BASE_URL}/${endPoint}`);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  url.searchParams.set('access_token', accessToken);

  console.log(url.toString());

  const res = await fetch(url.toString());
  const json = (await res.json()) as T | MetaError;

  if ('error' in json) {
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
