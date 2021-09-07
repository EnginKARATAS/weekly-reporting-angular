import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/models/reports';
import { ReportResponseModel } from 'src/app/models/reportsResponseModel';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-gmadmin',
  templateUrl: './gmadmin.component.html',
  styleUrls: ['./gmadmin.component.css'],
})
export class GmadminComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];

  report: Report;
  dataLoaded: boolean = false;
  currentReportId: number = 0;
  _listFilter = '';
  showMessage = '';

  searchForm = new FormGroup({
    searchVal: new FormControl(''),
  });

  ngOnInit(): void {
    this.retrieveReports();
    // this.showMessage = this.cookieService.get('Test');
  }
  constructor(
    private reportService: ReportService,
    private router: Router,
    private toastrService: ToastrService // private cookieService: CookieService
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

  searchByCode() {
    let searchVal = this.searchForm.value.searchVal;
    console.log(
      '🚀 ~ file: gmadmin.component.ts ~ line 61 ~ GmadminComponent ~ searchByCode ~ searchVal',
      searchVal
    );

    if (searchVal > 100) {
      this.reportService.getByCode(searchVal).subscribe((data) => {
        if (data.resCode == 200) {
          if (data.action) {
            let action = data.action[0];
            console.log(
              '🚀 ~ file: gmadmin.component.ts ~ line 73 ~ GmadminComponent ~ this.reportService.getByCode ~ action',
              action
            );
            if (action) {
              this.filteredReports = this.reports;
              this.reports = [];
              this.reports.push(action);
              this.toastrService.success(data.message);
            }
          }
        }
        if (data.resCode == 400) {
          this.toastrService.info(data.message);
        }
      });
    } else {
      this.toastrService.info('Aksiyonun kodu sadece sayı içermelidir!');
      this.reports = this.filteredReports;
    }
  }

  //think
  productResponseModel: ReportResponseModel = {
    data: this.reports,
    message: '',
    success: true,
  };

  setCurrentCategory(currentReportId: number) {
    this.currentReportId = currentReportId;
  }

  overColor(reportId: number) {
    if (reportId == this.currentReportId) {
      return 'text-primary';
    } else return 'text-secondary';
  }

  deleteReport(report_id: number) {
    this.reportService.delete(report_id).subscribe((data) => {
      this.toastrService.success(report_id + 'Silinmiştir');
      this.router.navigate(['/gmadmin']);
    });
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
