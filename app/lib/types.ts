type QueryParams = Record<string, string | number | boolean | undefined>;

export type ApiResponseType<T> = {
  success: boolean;
  data: null | T;
  message: string;
};

export type GlobalFetchTypes = {
  endPoint: string;
  queryParams: QueryParams;
};
