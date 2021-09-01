import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Row } from 'src/app/models/row';
import { ClaimantService } from 'src/app/services/claimant.service';
import { MailService } from 'src/app/services/mail.service';
import { ReportService } from 'src/app/services/report.service';
import { RowService } from 'src/app/services/row.service';
import { WorkerService } from 'src/app/services/worker.service';

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
  worker_name: string = '.';
  worker_surname: string = '.';
  worker_email: string = '.';

  checkBoxes: any[] = [];

  constructor(
    private reportService: ReportService,
    private rowService: RowService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private claimantService: ClaimantService,
    private cookieService: CookieService,
    private router: Router,
    private mailService: MailService,
    private workerService: WorkerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['report_id']) {
        console.log(params)
        this.getRows(params['report_id']);
        this.reportId = params['report_id'];
      }
    });
    this.checkLogin();
    this.createRowForm();
    this.checkReportSended();
  }

  CheckAllOptions() {
    if (this.checkBoxes.every((val) => val == true))
      for (let i = 0; i < this.checkBoxes.length; i++) {
        this.checkBoxes[i].checked = false;
      }
    else
      for (let i = 0; i < this.checkBoxes.length; i++) {
        this.checkBoxes[i].checked = true;
      }
  }
 
  setColor(matter: string): string {
    switch (parseInt(matter)) {
      case 1:
        return '#36b342';
      case 2:
        return '#84f928';
      case 3:
        return '#c9c950';
      case 4:
        return '#f2852e';
      case 5:
        return '#f43735';
      default:
        return 'black';
    }
  }

  checkLogin() {
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
    let worker_name =
      this.cookieService.get('name') + this.cookieService.get('surname');
    let week_id = this.week_id
      ? this.week_id
      : 'yapılan işler eklenmeden gönderildi. ';
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
    let worker_name =
      this.cookieService.get('name') + this.cookieService.get('surname');
    let week_id = this.week_id
      ? this.week_id
      : 'yapılan işler eklenmeden gönderildi. ';
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

  sendMailToWorker2(mailPacket) {
    this.mailService.sentToWorker(mailPacket).subscribe((data) => {
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
      response.forEach((row) => {
        this.checkBoxes.push({
          checked :row.checked_by_admin,
          code: row.code
        });
      });
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

  revisionRequest(checkBoxes) {
    let code = "" 
     checkBoxes.forEach(item => {
       if (item.checked == true) {
         code += item.code + ","
       }
     });
    if (
      confirm(
        'Kullanıcıdan raporun ' +
          code +
          ' kodlu satırlarını tekrardan düzenlemesi için e-posta gönderilecektir. Kullanıcının raporu gönderilmedi olarak işaretlenecektir. Onaylıyor musunuz?!'
      )
    ) {
      this.workerService.getWorkerWithCode(checkBoxes[0].code).subscribe((data) => {
        this.reportService.sendBackReport(this.reportId).subscribe((data) => {
          console.log(
            '🚀 ~ file: report-detail.component.ts ~ line 187 ~ ReportDetailComponent ~ this.reportService.sendReport ~ data',
            data
          );
          this.toastrService.info(
            `${this.reportId} numaralı rapor gönderilmedi olarak işaretlenmiştir`
          );
        });
        this.worker_name = data[0].worker_name;
        this.worker_surname = data[0].worker_surname;
        this.worker_email = data[0].worker_email;
        let mailPacket = {
          worker_email: this.worker_email,
          subject: `<${this.week_id}>.Rapor.Düzeltme Talebi`,
          html: `Sn. ${this.worker_name} ${this.worker_surname}, <br>${this.week_id}. hafta <strong>${code}</strong> kodlu satırını tekrar düzenlemelisiniz. <br> <b>raporunuz gönderilmedi olarak işaretlendi</b>
          <br>
          <b>raporu düzenlemek için</b><a href="http://localhost:4200/report-detail/${this.reportId}&codes=${code}">tıklayınız</a> `,
        };

        this.sendMailToWorker2(mailPacket);
        this.toastrService.success('kullanıcıya e posta gönderildi');
      });
    } else {
      this.toastrService.info('mail gönderimi iptal edilmiştir');
    }
  }
}
