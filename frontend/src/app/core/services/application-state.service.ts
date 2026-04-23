import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import {
  CreditApplicationDetail,
  CreditApplicationFilters,
  CreditApplicationListItem,
  CreditApplicationStatus,
} from '../models/credit-application.model';
import { ApplicationsApiService } from './applications-api.service';

@Injectable({ providedIn: 'root' })
export class ApplicationStateService {
  private readonly api = inject(ApplicationsApiService);

  private readonly filtersSubject = new BehaviorSubject<CreditApplicationFilters>({ status: 'all' });
  private readonly applicationsSubject = new BehaviorSubject<CreditApplicationListItem[]>([]);
  private readonly selectedApplicationSubject = new BehaviorSubject<CreditApplicationDetail | null>(null);
  private readonly requestedApplicationIdSubject = new BehaviorSubject<string | null>(null);
  private readonly listLoadingSubject = new BehaviorSubject<boolean>(false);
  private readonly detailLoadingSubject = new BehaviorSubject<boolean>(false);
  private readonly actionLoadingSubject = new BehaviorSubject<boolean>(false);
  private readonly listErrorSubject = new BehaviorSubject<string>('');
  private readonly detailErrorSubject = new BehaviorSubject<string>('');

  readonly filters$ = this.filtersSubject.asObservable();
  readonly applications$ = this.applicationsSubject.asObservable();
  readonly selectedApplication$ = this.selectedApplicationSubject.asObservable();
  readonly requestedApplicationId$ = this.requestedApplicationIdSubject.asObservable();
  readonly isListLoading$ = this.listLoadingSubject.asObservable();
  readonly isDetailLoading$ = this.detailLoadingSubject.asObservable();
  readonly isActionLoading$ = this.actionLoadingSubject.asObservable();
  readonly listError$ = this.listErrorSubject.asObservable();
  readonly detailError$ = this.detailErrorSubject.asObservable();

  loadApplications(): void {
    this.listLoadingSubject.next(true);
    this.listErrorSubject.next('');

    this.api.list(this.filtersSubject.value)
      .pipe(finalize(() => this.listLoadingSubject.next(false)))
      .subscribe({
        next: (applications) => this.applicationsSubject.next(applications),
        error: () => this.listErrorSubject.next('Could not load credit applications.'),
      });
  }

  setStatusFilter(status: CreditApplicationStatus | 'all'): void {
    this.filtersSubject.next({
      ...this.filtersSubject.value,
      status,
    });

    this.loadApplications();
  }

  selectApplication(applicationId: string): void {
    this.requestedApplicationIdSubject.next(applicationId);
    this.detailLoadingSubject.next(true);
    this.detailErrorSubject.next('');

    this.api.getById(applicationId)
      .pipe(finalize(() => this.detailLoadingSubject.next(false)))
      .subscribe({
        next: (application) => this.selectedApplicationSubject.next(application),
        error: () => this.detailErrorSubject.next('Could not load the application detail.'),
      });
  }

  updateStatus(applicationId: string, status: CreditApplicationStatus): void {
    this.actionLoadingSubject.next(true);
    this.detailErrorSubject.next('');

    this.api.updateStatus(applicationId, status)
      .pipe(finalize(() => this.actionLoadingSubject.next(false)))
      .subscribe({
        next: (application) => this.selectedApplicationSubject.next(application),
        error: () => this.detailErrorSubject.next('Could not update the application status.'),
      });
  }

  currentSelection(): CreditApplicationDetail | null {
    return this.selectedApplicationSubject.value;
  }

  currentRequestedApplicationId(): string | null {
    return this.requestedApplicationIdSubject.value;
  }

  previousApplicationId(currentId: string): string | null {
    const applications = this.applicationsSubject.value;
    const currentIndex = applications.findIndex((application) => application.id === currentId);

    if (currentIndex <= 0) {
      return null;
    }

    return applications[currentIndex - 1].id;
  }

  nextApplicationId(currentId: string): string | null {
    const applications = this.applicationsSubject.value;
    const currentIndex = applications.findIndex((application) => application.id === currentId);

    if (currentIndex === -1 || currentIndex >= applications.length - 1) {
      return null;
    }

    return applications[currentIndex + 1].id;
  }
}
