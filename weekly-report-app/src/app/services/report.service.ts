import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/reports';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseUrl: string = `${environment.apiUrl}/api/reports`;
  secondUrl: string = `${environment.apiUrl}/api/reports/isreportsended`;
  thirdUrl: string = `${environment.apiUrl}/api/sendreport`;
  fourthUrl: string = `${environment.apiUrl}/api/sendbackreport`;
  deleteUrl: string = `${environment.apiUrl}/deletereportbyid`;
  sixthUrl: string = `${environment.apiUrl}/api/reports/getByCode`;
  seventhUrl: string = `${environment.apiUrl}/api/reports/getByAction`;
  eighth: string = `${environment.apiUrl}/api/reports/getAllReports`;
  constructor(private http: HttpClient) {}

  getAll(gm_id): Observable<any> {
    return this.http.post<Report>(this.eighth,{gm_id});
  }

  getByCode(code): Observable<any> {
    return this.http.post(`${this.sixthUrl}`, {code});//need to send in json format!
  }

  getByAction(action): Observable<any> {
    return this.http.post(`${this.seventhUrl}`, {action});//need to send in json format!
  }


  get(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  sendingStatus(id): Observable<any> {
    return this.http.get(`${this.secondUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  sendReport(id): Observable<any> {
    //if report with id is exist. set is_report_sended = true
    return this.http.get(`${this.thirdUrl}/${id}`);
  }
  sendBackReport(id): Observable<any> {
    //if report with id is exist. set is_report_sended = true
    return this.http.get(`${this.fourthUrl}/${id}`);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(report_id): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${report_id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  // findByCode(code): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?code=${code}`);
  // }
}
