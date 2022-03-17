import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  gm_id;

  constructor(
    private reportService: ReportService,
    private router: Router,
    private cookieService: CookieService,
    private toastrService: ToastrService // private cookieService: CookieService
  ) {}

  searchForm = new FormGroup({
    searchVal: new FormControl(''),
  });
  search2Form = new FormGroup({
    search2Val: new FormControl(''),
  });

  ngOnInit(): void {
    this.gm_id = this.cookieService.get('gmid');
    this.retrieveReports();
    // this.showMessage = this.cookieService.get('Test');
  }

  public get filterText(): string {
    return this.filterText;
  }

  getSendedReports() {
    this.reportService.getSendedReports().subscribe((sended) => {
      // this.reports = this.reports.filter(report => report.is_report_sended == true)
      this.reports = sended.data;
      if (sended.resCode == 200) this.toastrService.success(sended.message);
      if (sended.resCode == 400) this.toastrService.error(sended.message);
    });
  }

  getNoSendedReports() {
    this.reportService.getNoSendedReports().subscribe((sended) => {
      // this.reports = this.reports.filter(report => report.is_report_sended == true)
      this.reports = sended.data;
      if (sended.resCode == 200) this.toastrService.success(sended.message);
      if (sended.resCode == 400) this.toastrService.error(sended.message);
    });
  }

  searchByAction() {
    let searchVal = this.search2Form.value.search2Val;
    if (searchVal.length > 0 && searchVal.length < 500) {
      this.reportService.getByAction(searchVal).subscribe((data) => {
        if (data.resCode == 200) {
          if (data.action) {
            let action = data.action[0];
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
      this.toastrService.info('Aksiyonun kodu Boş bırakılmamalıdır!');
      this.reports = this.filteredReports;
    }
  }

  searchByCode() {
    let searchVal = this.searchForm.value.searchVal;
    if (searchVal > 100) {
      this.reportService.getByCode(searchVal).subscribe((data) => {
        if (data.resCode == 200) {
          if (data.action) {
            let action = data.action[0];
            if (action == undefined) {
            } else {
              if (action) {
                this.filteredReports = this.reports;
                this.reports = [];
                this.reports.push(action);
                this.toastrService.success(data.message);
              }
            }
          }
        }
        if (data.resCode == 400) {
          this.toastrService.info(data.message);
        }
      });
    } else {
      this.toastrService.info('Kodlar sadece sayı içermektedir. Lütfen ');
      this.reports = this.filteredReports;
    }
  }

  setCurrentCategory(currentReportId: number) {
    this.currentReportId = currentReportId;
  }

  overColor(reportId: number) {
    if (reportId == this.currentReportId) {
      return 'text-info';
    } else return 'text-dark';
  }

  deleteReport(report_id: number) {
    this.reportService.delete(report_id).subscribe((data) => {
      this.toastrService.success(report_id + 'Silinmiştir');
      this.router.navigate(['/gmadmin']);
    });
  }

  retrieveReports(): void {
    this.reportService.getAll(this.gm_id).subscribe(
      (data) => {
        this.reports = data;
        this.dataLoaded = true;
      },
      (error) => {}
    );
  }
}
