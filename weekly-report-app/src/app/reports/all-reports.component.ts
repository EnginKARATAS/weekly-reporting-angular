import { Component, OnInit } from '@angular/core';
import { Report } from '../models/reports';
import { HttpClient } from '@angular/common/http';
import { ReportResponseModel } from '../models/reportsResponseModel';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css'],
})
export class AllReportsComponent implements OnInit {
  apiUrl = 'http://localhost:3000/api/reports';

  reports: Report[] = [];

  productResponseModel: ReportResponseModel = {
    data: this.reports,
    message: '',
    success: true,
  };

  constructor(private httpClient: HttpClient) {}

  getReports() {
    this.httpClient
      .get<ReportResponseModel>(this.apiUrl)
      .subscribe((response) => {
        this.reports = response.data;
        console.log('%call-reports.component.ts line:30 object', 'color: #007acc;', response);
      });
  }

  ngOnInit(): void {
    this.getReports();
    console.log('%c Weekly Report!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%;');
   }
}
