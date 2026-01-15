type QueryParams = Record<string, string | number | boolean | undefined>;

export type MetaError = {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
};

export type ApiResponseType<T> = {
  success: boolean;
  data: T | null;
  message: string;
  rawError?: MetaError['error'];
};

export type GlobalFetchTypes = {
  accessToken: string;
  endPoint: string;
  queryParams: QueryParams;
};
