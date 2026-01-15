import axios from 'axios';
import { AppFormData, CreateAppResponse } from './types';

export const createApp = async (payload: Partial<AppFormData>): Promise<CreateAppResponse> => {
  const response = await axios.post(
    'https://adsocial-api.codixel.site/api/v1/media-access-token/add',
    payload
  );
  return response.data;
};
