import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormResponse {
  id: string;
  title: string;
  description?: string;
  name: string;
  email: string;
  phone?: string;
  category?: string;
  message?: string;
  isActive: boolean;
  isApproved: boolean;
  isReviewed: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
  user?: { id: string };
}

export interface FormListResponse {
  data: FormResponse[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private readonly apiUrl = 'http://localhost:3000/form';

  constructor(private http: HttpClient) {}

  getAll(page = 1, limit = 10, search = ''): Observable<FormListResponse> {
    const params: Record<string, string> = {
      page: String(page),
      limit: String(limit),
    };
    return this.http.get<FormListResponse>(this.apiUrl, { params });
  }

  create(formData: any): Observable<FormResponse> {
    return this.http.post<FormResponse>(this.apiUrl, formData);
  }

  update(id: string | number, formData: any): Observable<FormResponse> {
    return this.http.put<FormResponse>(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
