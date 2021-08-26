import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isLoggedIn: boolean;
  gmisLoggedIn: boolean;
  worker_id: number;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toast: ToastrService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn').includes('true');
    this.gmisLoggedIn = this.cookieService.get('gmisLoggedIn').includes('true');
    this.worker_id = parseInt(this.cookieService.get('id'));
  }

  addReport() {
    const is_report_sended = false;
    const week_id = parseInt(prompt('Hafta Numarası girin')) ;
    const worker_id = this.worker_id;
    const claimant_id = 1;
    const report_commit_date = Date();
    const report_edit_date = report_commit_date;

    const report = {
      is_report_sended: is_report_sended,
      week_id: week_id,
      worker_id: worker_id,
      claimant_id: claimant_id,
      report_commit_date: report_commit_date,
      report_edit_date: report_edit_date
    };

    this.reportService.create(report).subscribe((data) => {});
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.toast.info('Çıkış Başarılı');
    this.router.navigate(['/login']);
  }
}
