import { globalFetch } from '@/app/lib/globalFetch';
import { AdsetsResponse, CampaignInsightsResponse, FetchParams } from './types';

export const fetchCampaignInsight = async ({ campaign_id }: FetchParams) => {
  const fethedInsights = await globalFetch<CampaignInsightsResponse>({
    endPoint: `${campaign_id}/insights`,
    queryParams: {
      fields: 'impressions,clicks,spend,ctr,cpc,reach,frequency',
      date_preset: 'maximum',
    },
  });

  return fethedInsights;
};

export const fetchAdsets = async ({ campaign_id }: FetchParams) => {
  const fethedInsights = await globalFetch<AdsetsResponse>({
    endPoint: `${campaign_id}/adsets`,
    queryParams: {
      fields: 'id,name,status,effective_status,budget_remaining,created_time,updated_time',
    },
  });

  return fethedInsights;
};

export const fetchAds = async ({ campaign_id }: FetchParams) => {
  const fethedInsights = await globalFetch<AdsetsResponse>({
    endPoint: `${campaign_id}/ads`,
    queryParams: {
      fields: 'id,name,status,effective_status,creative{id,object_story_spec,thumbnail_url}',
    },
  });

  return fethedInsights;
};

export const fetchCampaignBundle = async ({ campaign_id }: FetchParams) => {
  const [insightsRes, adsetsRes, adsRes] = await Promise.allSettled([
    fetchCampaignInsight({ campaign_id }),
    fetchAdsets({ campaign_id }),
    fetchAds({ campaign_id }),
  ]);

  return {
    insights:
      insightsRes.status === 'fulfilled' && insightsRes.value.success
        ? insightsRes.value.data
        : null,

    adsets:
      adsetsRes.status === 'fulfilled' && adsetsRes.value.success ? adsetsRes.value.data : null,

    ads: adsRes.status === 'fulfilled' && adsRes.value.success ? adsRes.value.data : null,

    errors: {
      insights:
        insightsRes.status === 'rejected'
          ? insightsRes.reason
          : insightsRes.value.success
            ? null
            : insightsRes.value.message,

      adsets:
        adsetsRes.status === 'rejected'
          ? adsetsRes.reason
          : adsetsRes.value.success
            ? null
            : adsetsRes.value.message,

      ads:
        adsRes.status === 'rejected'
          ? adsRes.reason
          : adsRes.value.success
            ? null
            : adsRes.value.message,
    },
  };
};
