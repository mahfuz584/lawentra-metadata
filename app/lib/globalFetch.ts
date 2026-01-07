import { secret_access_token, secret_app_id } from './env';
import { ApiResponseType, GlobalFetchTypes } from './types';

export const globalFetch = async <T>({
  endPoint,
  queryParams,
}: GlobalFetchTypes): Promise<ApiResponseType<T>> => {
  const BASE_URL = 'https://graph.facebook.com/v24.0';
  const ACCESS_TOKEN = secret_access_token;
  const SECRET_APP_ID = secret_app_id;

  if (!ACCESS_TOKEN || !SECRET_APP_ID) {
    return {
      success: false,
      data: null,
      message: 'Missing Facebook credentials',
    };
  }

  const url = new URL(`${BASE_URL}/${SECRET_APP_ID}/${endPoint}`);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  url.searchParams.set('access_token', ACCESS_TOKEN);

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text();
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
