import { Component, OnInit } from '@angular/core';
import { Report } from '../models/reports';
import { ReportResponseModel } from '../models/reportsResponseModel';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-gmadmin',
  templateUrl: './gmadmin.component.html',
  styleUrls: ['./gmadmin.component.css'],
})
export class GmadminComponent implements OnInit {
  reports: Report[] = [];
  dataLoaded: boolean = false;
  currentReportId: number = 0;
  _listFilter = '';

  constructor(
    private reportService: ReportService
  ) // private cookieService: CookieService
  {}

  // get listFilter(): string {
  //   return this._listFilter;
  // }
  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.filteredProducts = this.performFilter(value);
  // }
  // filteredProducts: Report[] = [];
  // products: Report[] = [];

  // performFilter(filterBy: string): Report[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.products.filter((product: Report) =>
  //     product.worker_surname.toLocaleLowerCase().includes(filterBy));
  // }

  public get filterText(): string {
    return this.filterText;
  }

  //think
  productResponseModel: ReportResponseModel = {
    data: this.reports,
    message: '',
    success: true,
  };
  showMessage = '';
  ngOnInit(): void {
    this.retrieveReports();
    // this.showMessage = this.cookieService.get('Test');
  }

  setCurrentCategory(currentReportId: number) {
    this.currentReportId = currentReportId;
  }

  overColor(reportId: number) {
    if (reportId == this.currentReportId) {
      return 'text-primary';
    } else return 'text-secondary';
  }

  retrieveReports(): void {
    this.reportService.getAll().subscribe(
      (data) => {
        this.reports = data;
        console.log(data);
        this.dataLoaded = true;
        console.log(this.reports);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // change(): string{
  //   return "btn btn-dark"
  // }

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
