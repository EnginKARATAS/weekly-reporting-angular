import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  baseUrl: string = 'http://10.41.150.82:4000/api/workers';
  passwordUrl: string = 'http://10.41.150.82:4000/setpassword';
  thirdUrl: string = 'http://10.41.150.82:4000/getWorkerByReport';
  fourthUrl: string = 'http://10.41.150.82:4000/sendResetEmail'
  
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
