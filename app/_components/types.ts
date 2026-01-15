import { Dispatch, SetStateAction } from 'react';
import z from 'zod';

export const formSchema = z.object({
  token: z.string().min(1, 'Access token is required'),
});

export type FormDataType = z.infer<typeof formSchema>;

export type FacebookAuthModalProps = {
  open: boolean;
  hasError: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type AccessTokenResponse = {
  token: {
    id: string;
    token: string;
  } | null;
  message: string;
};

export type AppDataResponse = {
  success: boolean;
  message: string;
  token: {
    id: string;
    appName: string;
    fbAccountId: string;
    instaAccountId: string;
    token: string;
    createdAt: string;
    updatedAt: string;
  };
};
