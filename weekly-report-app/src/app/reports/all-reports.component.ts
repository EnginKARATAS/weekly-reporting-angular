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
  apiUrl = 'http://localhost:4000/api/reports';

  reports: Report[] = [];

  //think
  productResponseModel: ReportResponseModel = {
    data: this.reports,
    message: '',
    success: true,
  };

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.reportService.getAll().subscribe(
      (data) => {
        this.reports = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // refreshList(): void {
  //   this.retrieveTutorials();
  //   this.currentTutorial = null;
  //   this.currentIndex = -1;
  // }

  // setActiveTutorial(report, index): void {
  //   this.currentTutorial = report;
  //   this.currentIndex = index;
  // }

  // removeAllTutorials(): void {
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
