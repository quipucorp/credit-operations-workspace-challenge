import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Analyst } from '../models/analyst.model';

const API_BASE_URL = 'http://localhost:4000/api';

@Injectable({ providedIn: 'root' })
export class AnalystsApiService {
  private readonly http = inject(HttpClient);

  list(): Observable<Analyst[]> {
    return this.http.get<Analyst[]>(`${API_BASE_URL}/analysts`);
  }
}
