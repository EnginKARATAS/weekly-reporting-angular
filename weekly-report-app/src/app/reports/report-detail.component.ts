import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Claimants } from '../models/claimants';
import { Row } from '../models/row';
import { ClaimantService } from '../services/claimant.service';
import { MailService } from '../services/mail.service';
import { ReportService } from '../services/report.service';
import { RowService } from '../services/row.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css'],
})
export class ReportDetailComponent implements OnInit {
  rows: Row[] = [];
  reportId: number;
  reportSendStatus: boolean = true;
  gmLoginStatus: boolean = false;
  week_id: number;
  constructor(
    private reportService: ReportService,
    private rowService: RowService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private claimantService: ClaimantService,
    private cookieService: CookieService,
    private router: Router,
    private mailService: MailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['report_id']) {
        this.getRows(params['report_id']);
        this.reportId = params['report_id'];
      }
    });
    this.checkGmLogin();
    this.createRowForm();
    this.checkReportSended();
  }

  checkGmLogin() {
    if (this.cookieService.get('gmisLoggedIn').includes('true')) {
      this.gmLoginStatus = true;
    } else this.gmLoginStatus = false;
  }
  checkReportSended(): void {
    this.reportService.sendingStatus(this.reportId).subscribe((data) => {
      this.reportSendStatus = data[0].is_report_sended;
    });
  }

  sendWorkerWeeklyReport(): void {
    this.reportService.sendReport(this.reportId).subscribe((data) => {
      this.reportSendStatus = data[0].is_report_sended;
    });
    this.sendMailToGm();

    // window.location.reload();
    this.toastrService.success('Rapor başarıyla gönderildi.');
    this.router.navigate(['/all-reports']);
  }

  sendMailToGm() {
    let general_manager_email = 'enginkaratas99@gmail.com';
    let worker_name = this.cookieService.get('name') + this.cookieService.get('surname');
    let week_id = (this.week_id)? this.week_id:"yapılan işler eklenmeden gönderildi. "
    let subject = `<${week_id}>.Hafta<${worker_name}>`;
    let html = `<h3><${week_id}>.Hafta<${worker_name}></h3>
    ${week_id}. Hafta raporu ${worker_name} tarafından gönderildi.<br>Raporu hemen görüntülemek için<a href="http://localhost:4200/report-detail/${this.reportId}">tıklayınız</a>`;

    let mailPacket = {
      general_manager_email: general_manager_email,
      subject: subject,
      html: html,
    };
    this.mailService.sentToGm(mailPacket).subscribe((data) => {
      console.log(data);
      console.log(
        '🚀 ~ file: report-detail.component.ts ~ line 85 ~ ReportDetailComponent ~ this.mailService.create ~ data',
        data
      );
    });
  }

  sendMailToWorker() {
    let worker_email = 'enginkaratas99@gmail.com';
    let worker_name = this.cookieService.get('name') + this.cookieService.get('surname');
    let week_id = (this.week_id)? this.week_id:"yapılan işler eklenmeden gönderildi. "
    let subject = `<${week_id}>.Hafta<${worker_name}>`;
    let html = `<h3><${week_id}>.Hafta<${worker_name}></h3>
    ${week_id}. Hafta raporu ${worker_name} tarafından gönderildi.<br>Raporu hemen görüntülemek için<a href="http://localhost:4200/report-detail/${this.reportId}">tıklayınız</a>`;

    let mailPacket = {
      worker_email: worker_email,
      subject: subject,
      html: html,
    };
    this.mailService.sentToGm(mailPacket).subscribe((data) => {
      console.log(data);
      console.log(
        '🚀 ~ file: report-detail.component.ts ~ line 85 ~ ReportDetailComponent ~ this.mailService.create ~ data',
        data
      );
    });
  }


  getRows(report_id: any) {
    this.rowService.get(report_id).subscribe((response) => {
      this.rows = response; //sadece rowları değil yanında week idyi de getirir
      this.week_id = response[0].week_id;
    });
  }

  // claimants: Claimants[] = [];

  rowForm: FormGroup;

  createRowForm() {
    this.rowForm = this.formBuilder.group({
      report_id: ['', Validators.required],
      matter: ['', Validators.required],
      status: ['', Validators.required],
      is_timeout: ['', Validators.required],
      weekly_time_spent: ['', Validators.required],
      scheduled_completion_date: ['', Validators.required],
      finish_date: ['', Validators.required],
      actions: ['', Validators.required],
      comments: ['', Validators.required],
      claimants: ['', Validators.required],
      start_date: ['', Validators.required],
    });
  }

  // getClaimants(): void {
  //   this.claimantService.getAll().subscribe((data) => {
  //     this.claimants = data;
  //   });
  // }

  addRow(): void {
    this.toastrService.info('Satır başarılı bir şekilde eklendi');

    this.rowForm.value.report_id = this.reportId;

    this.rowService.addRow(this.rowForm.value).subscribe((data) => {});

    // if (this.rowForm.valid) {
    //   console.log("valid")
    // }

    window.location.reload();
  }

  revisionRequest(rowId: number) {
    console.log(
      '🚀 ~ file: report-detail.component.ts ~ line 113 ~ ReportDetailComponent ~ revisionRequest ~ rowId',
      rowId
    );
  }
}
