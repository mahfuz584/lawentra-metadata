import { fetchCampaigns } from './fetch';

const CampaignDataWrapper = async () => {
  const data = await fetchCampaigns();

  // if (!data || !success) return <p>Something Went Wrong</p>;
  // console.log()

  return <>{/* <CampaignsList campaigns={data.data} /> */}</>;
};

export default CampaignDataWrapper;
