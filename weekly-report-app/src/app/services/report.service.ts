import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/reports';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
baseUrl: string = 'http://localhost:4000/api/reports';
constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Report>(this.baseUrl);
  }

  get(code): Observable<any> {
    return this.http.get(`${this.baseUrl}/${code}`);
  }

  create(data): Observable<any> {
    return this.http.post(this.baseUrl, data);
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