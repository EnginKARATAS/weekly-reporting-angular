import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  baseUrl: string = `${environment.apiUrl}/sendmailtogm`;
  secondUrl: string = `${environment.apiUrl}/sendmailtoworker`;
  constructor(private http: HttpClient) {}

  sentToGm(data): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  sentToWorker(data): Observable<any> {
    return this.http.post(this.secondUrl, data);
  }
}
