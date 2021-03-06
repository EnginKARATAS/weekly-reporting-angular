import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Row } from '../models/row';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class RowService {
  enviroment;
  baseUrl: string = `${environment.apiUrl}/api/rows`;
  secondUrl: string = `${environment.apiUrl}/api/rows`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<Row>(this.baseUrl);
  }

  get(report_id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${report_id}`);
  }

  clientGet(report_id, worker_id): Observable<any> {
    return this.http.post(this.secondUrl, { report_id, worker_id });
  }

  addRow(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteRowByCode(code): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${code}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
