import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreditApplicationDetail,
  CreditApplicationFilters,
  CreditApplicationListItem,
  CreditApplicationStatus,
} from '../models/credit-application.model';

const API_BASE_URL = 'http://localhost:4000/api';

@Injectable({ providedIn: 'root' })
export class ApplicationsApiService {
  private readonly http = inject(HttpClient);

  list(filters: CreditApplicationFilters): Observable<CreditApplicationListItem[]> {
    let params = new HttpParams();

    if (filters.status !== 'all') {
      params = params.set('status', filters.status);
    }

    return this.http.get<CreditApplicationListItem[]>(`${API_BASE_URL}/applications`, { params });
  }

  getById(id: string): Observable<CreditApplicationDetail> {
    return this.http.get<CreditApplicationDetail>(`${API_BASE_URL}/applications/${id}`);
  }

  updateStatus(id: string, status: CreditApplicationStatus): Observable<CreditApplicationDetail> {
    return this.http.patch<CreditApplicationDetail>(`${API_BASE_URL}/applications/${id}/status`, { status });
  }

  assignAnalyst(id: string, analystId: string): Observable<CreditApplicationDetail> {
    return this.http.patch<CreditApplicationDetail>(`${API_BASE_URL}/applications/${id}/assign-analyst`, { analystId });
  }
}
