import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/reports';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl: string = 'http://localhost:4000/auth';
constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl,{username, password});
  }

  get(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
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
