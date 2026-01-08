import { secret_access_token, secret_app_id } from './env';

export const tokenVerifier = async () => {
  const app_token = secret_app_id;
  const access_token = secret_access_token;

  const url = `https://graph.facebook.com/v24.0/debug_token?input_token=${access_token}&access_token=${app_token}`;

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
  });

  console.log(res);
};
