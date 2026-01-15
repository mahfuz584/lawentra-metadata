import FacebookAuthModalWrapper from '@/app/_components/facebook-auth-modal-wrapper';
import { fetchAppData } from '@/app/_components/fetch';
import CampaignsList from './campaigns-list';
import { fetchCampaigns } from './fetch';

const CampaignDataWrapper = async () => {
  const { success, token } = await fetchAppData();
  console.log('🚀 ~ CampaignDataWrapper ~ token:', token);
  // const { token } = await fetchAccessToken();

  const { data: campaignsData, rawError } = await fetchCampaigns({
    access_token: token.token,
  });

  console.log({
    campaignsData,
    rawError,
  });

  const hasError = Boolean(rawError?.code === 190);

  if (hasError) {
    return <FacebookAuthModalWrapper hasError={hasError} />;
  }

  if (!campaignsData) return <p>Unable to fetch campaigns data. Please try again later.</p>;

  return <CampaignsList campaigns={campaignsData.data} />;
};

export default CampaignDataWrapper;
