export type CreditApplicationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface ApplicationStatusHistoryItem {
  changedAt: string;
  fromStatus: CreditApplicationStatus | null;
  toStatus: CreditApplicationStatus;
  changedBy: string;
  note?: string;
}

export interface CreditApplication {
  id: string;
  applicantName: string;
  businessName: string;
  documentNumber: string;
  requestedAmount: number;
  termMonths: number;
  monthlyRevenue: number;
  status: CreditApplicationStatus;
  score: number;
  scoreReason: string;
  assignedAnalyst: string | null;
  createdAt: string;
  lastUpdatedAt: string;
  statusHistory: ApplicationStatusHistoryItem[];
}
