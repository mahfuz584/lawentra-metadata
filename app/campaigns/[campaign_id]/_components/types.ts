import { CampaignStatus, FacebookPagingCursors } from '../../_components/type';

export type Params = {
  params: Promise<{ campaign_id: string }>;
};

export type CampaignInsight = {
  impressions: string;
  clicks: string;
  spend: string;
  ctr: string;
  cpc: string;
  reach: string;
  frequency: string;
  date_start: string;
  date_stop: string;
};

export type CampaignInsightsResponse = {
  data: CampaignInsight[];
  paging: FacebookPagingCursors;
};

export type Adsets = {
  id: string;
  name: string;
  status: CampaignStatus;
  effective_status: CampaignStatus;
  budget_remaining: string;
  created_time: string;
  updated_time: string;
};

export type AdsetsResponse = {
  data: Adsets[];
  paging: FacebookPagingCursors;
};

export type Ad = {
  id: string;
  name: string;
  status: CampaignStatus;
  effective_status: CampaignStatus;
  creative?: {
    id: string;
    object_story_spec?: {
      page_id?: string;
      instagram_user_id?: string;
    };
    thumbnail_url?: string;
  };
};

export type AdResponse = {
  data: Ad[];
  paging: FacebookPagingCursors;
};

export type FetchParams = {
  campaign_id: string;
};
