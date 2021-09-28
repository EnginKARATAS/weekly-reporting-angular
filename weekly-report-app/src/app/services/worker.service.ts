import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  baseUrl: string = `${environment.apiUrl}/api/workers`;
  passwordUrl: string = `${environment.apiUrl}/setpassword`;
  thirdUrl: string = `${environment.apiUrl}/getWorkerByReport`;
  fourthUrl: string = `${environment.apiUrl}/sendResetEmail`
  
  constructor(private http: HttpClient) {}
  
  sendResetEmail(email): Observable<any> {
    return this.http.post(this.fourthUrl, {email});
  }

  getByReport(report_id): Observable<any>{
    return this.http.get(`${this.thirdUrl}/${report_id}`)
  } 

  get(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getWorkerWithCode(code: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/getbycode/${code}`)
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
