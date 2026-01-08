export type CampaignStatus = 'ACTIVE' | 'PAUSED' | 'DELETED' | 'ARCHIVED';

export type BuyingType = 'AUCTION' | 'RESERVED';

export type CampaignObjective =
  | 'OUTCOME_APP_PROMOTION'
  | 'OUTCOME_ENGAGEMENT'
  | 'OUTCOME_AWARENESS'
  | 'OUTCOME_TRAFFIC'
  | 'OUTCOME_LEAD_GENERATION'
  | 'OUTCOME_CONVERSIONS';

export type FacebookPagingCursors = {
  cursors?: {
    before?: string;
    after?: string;
  };
};

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  effective_status: CampaignStatus;
  objective: CampaignObjective;
  buying_type: BuyingType;
  budget_remaining: string;
  special_ad_categories: string[];
  created_time: string;
  updated_time: string;
};

export interface CampaignsResponse {
  data: Campaign[];
  paging?: FacebookPagingCursors;
}
