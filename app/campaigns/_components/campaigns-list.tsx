import CampaignsCard from './campaign-card';
import { CampaignsResponse } from './type';

const CampaignsList = ({ campaigns }: { campaigns: CampaignsResponse['data'] }) => {
  return (
    <div className="container mx-auto mt-10 grid grid-cols-4 gap-3">
      {campaigns.map((campaign) => (
        <CampaignsCard campaign={campaign} key={campaign.id} />
      ))}
    </div>
  );
};

export default CampaignsList;
