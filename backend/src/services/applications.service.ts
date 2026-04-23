import { applicationsSeed } from '../data/applications.seed.js';
import { CreditApplication, CreditApplicationStatus } from '../models/application.js';

const detailDelayById: Record<string, number> = {
  'app-101': 1200,
  'app-102': 140,
  'app-103': 980,
  'app-104': 180,
};

export class ApplicationsService {
  private readonly applications: CreditApplication[] = structuredClone(applicationsSeed);

  list(status?: CreditApplicationStatus): CreditApplication[] {
    const filtered = status
      ? this.applications.filter((application) => application.status === status)
      : this.applications;

    return filtered.map((application) => ({ ...application }));
  }

  async findById(id: string): Promise<CreditApplication | null> {
    const application = this.applications.find((entry) => entry.id === id) ?? null;

    await this.sleep(detailDelayById[id] ?? 400);

    return application ? { ...application } : null;
  }

  updateStatus(id: string, nextStatus: CreditApplicationStatus): CreditApplication | null {
    const application = this.applications.find((entry) => entry.id === id) ?? null;

    if (!application) {
      return null;
    }

    const previousStatus = application.status;

    application.status = nextStatus;
    application.lastUpdatedAt = new Date().toISOString();
    application.statusHistory.push({
      changedAt: application.lastUpdatedAt,
      fromStatus: previousStatus,
      toStatus: nextStatus,
      changedBy: 'current-user',
    });

    return { ...application };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
