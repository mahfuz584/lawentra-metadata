'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createApp } from '../meta/add-app/_components/actions';
import { FacebookAuthModalProps, FormDataType, formSchema } from './types';
import { updateByTag } from './utils';

const FacebookAuthModal = ({ open, setOpen, hasError }: FacebookAuthModalProps) => {
  const [show, setShow] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: { token: '' },
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

  const onSubmit = async (data: FormDataType) => {
    setServerError(null);
    mutate(data);
    if (!hasError) {
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && setOpen(false)}>
      <DialogContent className="sm:max-w-lg" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Facebook Access Token Verification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="token">Paste Your Access Token</Label>
            <div className="relative">
              <Input
                id="token"
                type={show ? 'text' : 'password'}
                placeholder="Enter access token"
                className="pr-10"
                {...register('token')}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-2 flex items-center"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.token && <p className="text-destructive text-sm">{errors.token.message}</p>}
          </div>

          {serverError && <p className="text-destructive text-sm">{serverError}</p>}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FacebookAuthModal;
