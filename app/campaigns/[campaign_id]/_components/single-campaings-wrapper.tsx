import { fetchCampaignBundle } from './fetch';
import { Params } from './types';

const SingleCampaignWrapper = async ({ params }: Params) => {
  const { campaign_id } = await params;
  const { ads, adsets, insights, errors } = await fetchCampaignBundle({ campaign_id });
  console.log({
    ads,
    adsets,
    insights,
    errors,
  });

  return <div></div>;
};

export default SingleCampaignWrapper;
