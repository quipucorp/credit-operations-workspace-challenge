import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApplicationStateService } from '../../core/services/application-state.service';
import { CreditApplicationStatus } from '../../core/models/credit-application.model';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [CommonModule, RouterLink, IonicModule, CurrencyPipe, DatePipe, StatusBadgeComponent],
  templateUrl: './applications-list.page.html',
  styleUrl: './applications-list.page.scss',
})
export class ApplicationsListPage implements OnInit {
  readonly state = inject(ApplicationStateService);

  readonly statusOptions: Array<CreditApplicationStatus | 'all'> = ['all', 'pending', 'in_review', 'approved', 'rejected'];

  ngOnInit(): void {
    this.state.loadApplications();
  }

  ionViewWillEnter(): void {
    // TODO challenge:
    // Revisit how the list should behave when the user comes back from the detail page.
  }

  trackById(_: number, item: { id: string }) {
    return item.id;
  }

  onStatusFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.state.setStatusFilter(target.value as CreditApplicationStatus | 'all');
  }
}
