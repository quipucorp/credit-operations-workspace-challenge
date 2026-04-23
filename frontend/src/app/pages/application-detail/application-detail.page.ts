import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnalystsApiService } from '../../core/services/analysts-api.service';
import { ApplicationStateService } from '../../core/services/application-state.service';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { ScoreSummaryComponent } from '../../components/score-summary/score-summary.component';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonicModule,
    CurrencyPipe,
    DatePipe,
    StatusBadgeComponent,
    ScoreSummaryComponent,
  ],
  templateUrl: './application-detail.page.html',
  styleUrl: './application-detail.page.scss',
})
export class ApplicationDetailPage implements OnInit {
  readonly state = inject(ApplicationStateService);
  readonly analystsApi = inject(AnalystsApiService);

  readonly analystIdControl = new FormControl('', { nonNullable: true });

  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly analysts$ = this.analystsApi.list();

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const applicationId = params.get('id');

      if (!applicationId) {
        return;
      }

      this.state.selectApplication(applicationId);
    });

    this.state.selectedApplication$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((application) => {
      this.analystIdControl.setValue(application?.assignedAnalyst ?? '', { emitEvent: false });
    });
  }

  updateStatus(nextStatus: 'pending' | 'in_review' | 'approved' | 'rejected'): void {
    const selectedApplication = this.state.currentSelection();

    if (!selectedApplication) {
      return;
    }

    this.state.updateStatus(selectedApplication.id, nextStatus);
  }

  saveAssignment(): void {
    const selectedApplication = this.state.currentSelection();

    if (!selectedApplication || !this.analystIdControl.value) {
      return;
    }

    // TODO challenge:
    // Wire this flow end to end so the assignment persists and both list and detail stay in sync.
  }

  goToPrevious(): void {
    const requestedApplicationId = this.state.currentRequestedApplicationId();

    if (!requestedApplicationId) {
      return;
    }

    const previousId = this.state.previousApplicationId(requestedApplicationId);

    if (!previousId) {
      return;
    }

    void this.router.navigate(['/applications', previousId]);
  }

  goToNext(): void {
    const requestedApplicationId = this.state.currentRequestedApplicationId();

    if (!requestedApplicationId) {
      return;
    }

    const nextId = this.state.nextApplicationId(requestedApplicationId);

    if (!nextId) {
      return;
    }

    void this.router.navigate(['/applications', nextId]);
  }
}
