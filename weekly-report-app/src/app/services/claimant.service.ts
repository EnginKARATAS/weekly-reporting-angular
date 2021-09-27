import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimantService {
  baseUrl: string = 'http://localhost:4000/api/claimants'

  constructor(private http : HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
