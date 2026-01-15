'use client';
import { useState } from 'react';
import FacebookAuthModal from './facebook-auth-modal';

const FacebookAuthModalWrapper = ({ hasError }: { hasError: boolean }) => {
  const [open, setOpen] = useState(hasError);

  return <FacebookAuthModal open={open} setOpen={setOpen} hasError={hasError} />;
};

export default FacebookAuthModalWrapper;
