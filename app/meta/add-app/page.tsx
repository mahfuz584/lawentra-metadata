import { Suspense } from 'react';
import AppFormWrapper from './_components/app-form-wrapper';

const AddAppPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppFormWrapper />
    </Suspense>
  );
};

export default AddAppPage;
