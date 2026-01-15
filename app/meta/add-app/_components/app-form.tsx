'use client';

import { AppDataResponse } from '@/app/_components/types';
import { updateByTag } from '@/app/_components/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createApp } from './actions';
import { forms_fields } from './constants';
import { app_form_schema, AppFormData } from './types';

const AppForm = ({ token }: { token: AppDataResponse['token'] }) => {
  const { push } = useRouter();
  const { control, handleSubmit } = useForm<AppFormData>({
    defaultValues: {
      appName: token.appName || '',
      fbAccountId: token.fbAccountId || '',
      instaAccountId: token.instaAccountId || '',
      token: token.token || '',
    },
    resolver: zodResolver(app_form_schema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createApp,
    onSuccess: (data) => {
      updateByTag('app-data');
      toast.success(data.message || 'App created successfully!');
    },
    onError: (error: AxiosError) => {
      const backendError = error.response?.data as { message: string };
      toast.error(backendError.message || 'An error occurred while creating the app.');
    },
  });

  const onSubmit = async (data: AppFormData) => {
    mutate(data);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="max-w-lg rounded-md border p-10">
        <p className="mb-10 text-center text-2xl font-semibold">Add Your App</p>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {forms_fields.map((fieldConfig) => (
            <Controller
              key={fieldConfig.name}
              name={fieldConfig.name}
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-3">
                  <label htmlFor={fieldConfig.name} className="text-sm font-medium">
                    {fieldConfig.label}
                  </label>
                  <Input
                    {...field}
                    type={fieldConfig.type}
                    placeholder={`Enter ${fieldConfig.label}`}
                    className="mt-1"
                  />
                  {fieldState.error && (
                    <p className="text-xs text-red-500">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          ))}
          <Button type="submit" className="mt-6 w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppForm;
