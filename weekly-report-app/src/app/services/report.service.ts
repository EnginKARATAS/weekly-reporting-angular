import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/reports';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseUrl: string = 'http://localhost:4000/api/reports';
  secondUrl: string = 'http://localhost:4000/api/reports/isreportsended';
  thirdUrl: string = 'http://localhost:4000/api/sendreport';
  fourthUrl: string = 'http://localhost:4000/api/sendbackreport';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<Report>(this.baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  sendingStatus(id): Observable<any> {
    return this.http.get(`${this.secondUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  sendReport(id): Observable<any> {
    //if report with id is exist. set is_report_sended = true
    return this.http.get(`${this.thirdUrl}/${id}`);
  }
  sendBackReport(id): Observable<any> {
    //if report with id is exist. set is_report_sended = true
    return this.http.get(`${this.fourthUrl}/${id}`);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  // findByCode(code): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?code=${code}`);
  // }
}
