import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimantService {
  baseUrl: string = `${environment.apiUrl}/api/claimants`

  constructor(private http : HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
