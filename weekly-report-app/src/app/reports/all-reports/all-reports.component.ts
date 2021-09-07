import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Report } from 'src/app/models/reports';
import { ReportResponseModel } from 'src/app/models/reportsResponseModel';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css'],
})
export class AllReportsComponent implements OnInit {
  reports: Report[] = [];
  dataLoaded: boolean = false;
  currentReportId: number = 0;
  _listFilter = '';
  worker_name: string = '';
  worker_surname: string = '';
  id: number;
  message: string = '';
  gmId: number = 0;

  constructor(
    private reportService: ReportService,
    private cookieService: CookieService
  ) {}

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

  ngOnInit(): void {
    this.worker_name = this.cookieService.get('name');
    this.worker_surname = this.cookieService.get('surname');
    this.id = parseInt(this.cookieService.get('id'));
    this.gmId = parseInt(this.cookieService.get('gmid'));

    if (this.id || this.gmId) {
      this.retrieveReports();
    } else this.message = 'İlk Önce Giriş Yapmalısınız!';
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
    this.reportService.get(this.id).subscribe(data => {
      console.log("🚀 ~ file: all-reports.component.ts ~ line 74 ~ AllReportsComponent ~ this.reportService.get ~ data", data)
      this.reports = data;
      this.dataLoaded = true;
    });
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
