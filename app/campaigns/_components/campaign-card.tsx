import Link from 'next/link';
import { Campaign } from './type';

const statusColor: Record<Campaign['status'], string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  PAUSED: 'bg-yellow-100 text-yellow-700',
  DELETED: 'bg-red-100 text-red-700',
  ARCHIVED: 'bg-gray-200 text-gray-600',
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const formatObjective = (obj: string) =>
  obj.replace('OUTCOME_', '').replace(/_/g, ' ').toLowerCase();

const CampaignsCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
          <p className="text-xs text-gray-500">ID: {campaign.id}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[campaign.status]}`}
        >
          {campaign.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="text-xs text-gray-500">Objective</p>
          <p className="capitalize">{formatObjective(campaign.objective)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Buying Type</p>
          <p>{campaign.buying_type}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Budget Remaining</p>
          <p>{Number(campaign.budget_remaining).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Last Updated</p>
          <p>{formatDate(campaign.updated_time)}</p>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-400">
        Created on {formatDate(campaign.created_time)}
      </div>
    </Link>
  );
};

export default CampaignsCard;
