import { Suspense } from 'react';
import CampaignDataWrapper from './_components/campaign-data-wrapper';

const CampaignPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CampaignDataWrapper />
      dwwdadawdw
    </Suspense>
  );
};

export default CampaignPage;
