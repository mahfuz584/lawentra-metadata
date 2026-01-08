import CampaignsList from './campaigns-list';
import { fetchCampaigns } from './fetch';

const CampaignDataWrapper = async () => {
  const { data, success } = await fetchCampaigns();

  if (!data || !success) return <p>Something Went Wrong</p>;

  return <CampaignsList campaigns={data.data} />;
};

export default CampaignDataWrapper;
