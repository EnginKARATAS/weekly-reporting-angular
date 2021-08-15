import { Component, OnInit } from '@angular/core';
import { Report } from '../models/reports';
import { ReportResponseModel } from '../models/reportsResponseModel';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css'],
})
export class AllReportsComponent implements OnInit {
  reports: Report[] = [];

  //think
  productResponseModel: ReportResponseModel = {
    data: this.reports,
    message: '',
    success: true,
  };

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.retrieveReports();
  }

  retrieveReports(): void {
    this.reportService.getAll().subscribe(
      (data) => {
        this.reports = data;
        console.log(data);
        console.log(this.reports);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // refreshList(): void {
  //   this.retrieveReports();
  //   this.currentReport = null;
  //   this.currentIndex = -1;
  // }

  // setActiveReport(report, index): void {
  //   this.currentReport = report;
  //   this.currentIndex = index;
  // }

  // removeAllReports(): void {
  //   this.reportService.deleteAll().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.refreshList();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // searchTitle(): void {
  //   this.reportService.findByTitle(this.title).subscribe(
  //     (data) => {
  //       this.reports = data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
