export type CreditApplicationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface CreditApplicationListItem {
  id: string;
  applicantName: string;
  businessName: string;
  documentNumber: string;
  requestedAmount: number;
  status: CreditApplicationStatus;
  score: number;
  assignedAnalyst: string | null;
  createdAt: string;
}

export interface CreditApplicationStatusHistoryItem {
  changedAt: string;
  fromStatus: CreditApplicationStatus | null;
  toStatus: CreditApplicationStatus;
  changedBy: string;
  note?: string;
}

export interface CreditApplicationDetail extends CreditApplicationListItem {
  termMonths: number;
  scoreReason: string;
  monthlyRevenue: number;
  businessName: string;
  lastUpdatedAt: string;
  statusHistory: CreditApplicationStatusHistoryItem[];
}

export interface CreditApplicationFilters {
  status: CreditApplicationStatus | 'all';
}
