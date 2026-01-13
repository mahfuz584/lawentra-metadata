import { secret_app_id } from '@/app/lib/env';
import { globalFetch } from '@/app/lib/globalFetch';
import { CampaignsResponse } from './type';

export const fetchCampaigns = () => {
  const fetchedCampigns = globalFetch<CampaignsResponse>({
    endPoint: `act_${secret_app_id}/campaigns`,
    queryParams: {
      fields:
        'id,name,status,effective_status,objective,buying_type,budget_remaining,special_ad_categories,created_time,updated_time',
    },
  });
  return fetchedCampigns;
};
