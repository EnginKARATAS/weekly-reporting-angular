import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  baseUrl: string = 'http://localhost:4000/sendmailtogm';
  constructor(private http: HttpClient) {}

  sentToGm(data): Observable<any> {
    return this.http.post(this.baseUrl,data);
  }
  sentToWorker(data): Observable<any> {
    return this.http.post(this.baseUrl,data);
  }
}
