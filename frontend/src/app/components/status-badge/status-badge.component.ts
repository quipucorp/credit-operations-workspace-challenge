import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CreditApplicationStatus } from '../../core/models/credit-application.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="badge" [class]="status">{{ labelMap[status] }}</span>`,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      padding: 0 10px;
      border-radius: 999px;
      font-size: 0.82rem;
      text-transform: capitalize;
      border: 1px solid transparent;
    }

    .pending {
      background: #fff7d6;
      color: #8a5a00;
      border-color: #f0d58f;
    }

    .in_review {
      background: #e5f0ff;
      color: #1d4f91;
      border-color: #c1d8ff;
    }

    .approved {
      background: #e6f6ee;
      color: #0f6b4b;
      border-color: #bde2cf;
    }

    .rejected {
      background: #fde9e7;
      color: #a23b2d;
      border-color: #f4c2bb;
    }
  `],
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: CreditApplicationStatus;

  protected readonly labelMap: Record<CreditApplicationStatus, string> = {
    pending: 'Pendiente',
    in_review: 'En revisión',
    approved: 'Aprobado',
    rejected: 'Rechazado',
  };
}
