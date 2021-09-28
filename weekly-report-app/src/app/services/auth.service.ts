import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/reports';
import { environment } from 'src/enviroment';


@Injectable({
  providedIn: 'root'
})
export  class AuthService {
baseUrl: string = `${environment.apiUrl}/auth`;
gmbaseUrl: string = `${environment.apiUrl}/gmauth`;
constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl,{username, password});
  }
  gmlogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.gmbaseUrl,{username, password});
  }

  getToken(): string {
    return localStorage.getItem('token')
  }
    
}
