import { Component, OnInit } from '@angular/core';
import { Report } from '../models/reports';
import { HttpClient} from '@angular/common/http'
import { ReportResponseModel } from '../models/reportsResponseModel';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css']
})
export class AllReportsComponent implements OnInit {
  apiUrl = "nodejssv api"

  reports: Report[]=[]

  productResponseModel: ReportResponseModel = {
    data: this.reports,
    message: "",
    success: true,
  };

  constructor(private httpClient: HttpClient) { }

  getReports(){
    this.httpClient.get<ReportResponseModel>(this.apiUrl)
    .subscribe((response)=>{
      this.productResponseModel = response;
    })
  }

  ngOnInit(): void {
    this.getReports();
  }

}
