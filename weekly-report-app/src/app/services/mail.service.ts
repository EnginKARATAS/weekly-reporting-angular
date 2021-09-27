import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  baseUrl: string = 'http://10.41.150.82:4000/sendmailtogm';
  secondUrl: string = 'http://10.41.150.82:4000/sendmailtoworker';
  constructor(private http: HttpClient) {}

  sentToGm(data): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  sentToWorker(data): Observable<any> {
    return this.http.post(this.secondUrl, data);
  }
}
