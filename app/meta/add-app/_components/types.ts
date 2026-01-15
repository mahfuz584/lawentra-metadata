import z from 'zod';

export const app_form_schema = z.object({
  appName: z
    .string()
    .min(1, 'App Name is required')
    .max(100, 'App Name must be at most 100 characters'),
  fbAccountId: z.string().min(1, 'Facebook Ad Account Id is required'),
  instaAccountId: z.string().min(1, 'Instagram Business Account Id is required'),
  token: z.string().min(1, 'Access Token is required'),
});

export type AppFormData = z.infer<typeof app_form_schema>;

type CreateAppSuccessResponse = {
  success: true;
  token: {
    success: true;
    token: {
      id: 'ee85ca69-9a55-457f-9b32-2e3ecf98274e';
      appName: 'dwadwa';
      fbAccountId: 'waddwad';
      instaAccountId: 'dwawadwa';
      token: 'dwwadaw';
      createdAt: '2026-01-15T10:30:27.197Z';
      updatedAt: '2026-01-15T10:31:12.466Z';
    };
    message: 'Media access token updated successfully';
  };
  message: string;
};

type CreateAppErrorResponse = {
  message: string;
  success: false;
};

export type CreateAppResponse = CreateAppSuccessResponse | CreateAppErrorResponse;
