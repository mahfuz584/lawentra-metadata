import { Suspense } from 'react';
import CampaignDataWrapper from './_components/campaign-data-wrapper';

const CampaignPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CampaignDataWrapper />
    </Suspense>
  );
};

export default CampaignPage;
