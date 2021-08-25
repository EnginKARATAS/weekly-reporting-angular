import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  baseUrl: string = 'http://localhost:4000/api/workers';
  passwordUrl: string = 'http://localhost:4000/setpassword';
  constructor(private http: HttpClient) {}

  get(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addWorker(data): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updatePassword(data): Observable<any> {
    return this.http.put(`${this.passwordUrl}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
