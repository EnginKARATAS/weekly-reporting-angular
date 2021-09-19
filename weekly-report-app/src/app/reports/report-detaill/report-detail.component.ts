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
import { PopupConfirmationComponent } from 'src/app/shared/popup-confirmation/popup-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupEditComponent } from 'src/app/shared/popup-edit/popup-edit.component';
export interface DialogData {
  test: 'tested';
}
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

  id: number;
  gm_id: number;

  claimant_comment: string;
  name: string;

  pasteModel = {
    claimants: '',
    matter: '',
    report_id: '',
    status: '',
    is_timeout: '',
    weekly_time_spent: '',
    scheduled_completion_date: '',
    finish_date: '',
    actions: '',
    comments: '',
    start_date: '',
  };

  checkBoxes: any[] = [];
  rowForm: FormGroup;

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
    private workerService: WorkerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['report_id']) {
        this.id = parseInt(this.cookieService.get('id'));
        this.gm_id = parseInt(this.cookieService.get('gmid'));

        this.getRows(params['report_id']);
        this.reportId = params['report_id'];
      }
    });
    this.checkLogin();
    this.createRowForm();
    this.checkReportSended();
  }

  openDialogAndDeleteRowByCode(row) {
    const dialogRef = this.dialog.open(PopupConfirmationComponent, {
      data: {
        header: 'Aksiyonu silmek istediğinize emin misiniz?',
        message: 'Seçtiğiniz aksiyon sistem tarafından silinecektir.',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteRowByCode(row);
      } else this.toastrService.info('Aksiyon silme işlemi iptal edilmiştir.');
    });
  }

  createRowForm() {
    this.rowForm = this.formBuilder.group({
      claimants: ['', [Validators.required, Validators.minLength(4)]],
      report_id: [''],
      matter: ['', [Validators.required]],
      status: ['', [Validators.required]],
      weekly_time_spent: ['', [Validators.required]],
      actions: ['', [Validators.required, Validators.minLength(30)]],
      start_date: ['', [Validators.required]],
      scheduled_completion_date: [''],
      finish_date: [''],
      is_timeout: ['', [Validators.required]],
      comments: [''],
    });
  }
  get f() {
    return this.rowForm.controls;
  }

  sendToAddRowCompenent(row) {
    this.pasteModel.claimants = row.claimants;
    this.pasteModel.matter = row.matter;
    this.pasteModel.status = row.status;
    this.pasteModel.start_date = row.start_date;
    this.pasteModel.scheduled_completion_date = row.scheduled_completion_date;
    this.pasteModel.finish_date = row.finish_date;
    this.pasteModel.actions = row.actions;
    this.pasteModel.weekly_time_spent = row.weekly_time_spent;
    this.pasteModel.is_timeout = row.is_timeout ? 'Var' : 'Yok';
    this.pasteModel.comments = row.comments;
  }

  CheckAllOptions() {
    let boxes = this.checkBoxes
    
    if (boxes.every(val => val.checked == true))
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].checked = false;
      }
    else
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].checked = true;
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
    this.router.navigate(['/all-reports']).then((b) => {
      window.location.reload();
    });
  }

  sendMailToGm() {
    let general_manager_email = 'enginkaratas99@gmail.com';

    let worker_name =
      this.cookieService.get('name') + this.cookieService.get('surname');

    let week_id = this.week_id
      ? this.week_id
      : 'yapılan işler eklenmeden gönderildi. ';
    let subject = `<${week_id}>.Hafta<${worker_name}>`;

    let html = `<h3><${week_id?week_id+".Hafta":"Rapor Numarası: "+this.reportId}><${worker_name}></h3>${week_id}. Hafta raporu ${worker_name} tarafından gönderildi.<br>Raporu hemen görüntülemek için<a href="http://localhost:4200/report-detail/${this.reportId}">tıklayınız</a>`;

    let mailPacket = {
      general_manager_email: general_manager_email,
      subject: subject,
      html: html,
    };

    this.mailService.sentToGm(mailPacket).subscribe((data) => {
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
    });
  }

  sendMailToWorker2(mailPacket) {
    this.mailService.sentToWorker(mailPacket).subscribe((data) => {
    });
  }

  getRows(report_id: any) {
    if (this.id) {
      this.rowService.clientGet(report_id, this.id).subscribe((response) => {
        if (response.resCode == 200) {
          this.toastrService.success(response.message);
          this.rows = response.data; //sadece rowları değil yanında week idyi de getirir
          this.week_id = response.data[0].week_id?response.data[0].week_id:"boş";
          response.data.forEach((row) => {
            this.checkBoxes.push({
              checked: row.checked_by_admin,
              code: row.code,
            });
          });
        } else if (response.resCode == 403)
          this.toastrService.error(response.message);
      });
    } else if (this.gm_id) {
      this.rowService.get(report_id).subscribe((response) => {
        if (response) {
          //sadece rowları değil yanında week idyi de getirir
          this.rows = response;
          this.week_id = response[0].week_id;
          response.forEach((row) => {
            this.checkBoxes.push({
              checked: row.checked_by_admin,
              code: row.code,
            });
          });
        }
      });
    }
  }

  // claimants: Claimants[] = [];

  // getClaimants(): void {
  //   this.claimantService.getAll().subscribe((data) => {
  //     this.claimants = data;
  //   });
  // }

  deleteRowByCode(row): void {
    this.rowService.deleteRowByCode(row.code).subscribe((data) => {
      if (data.resCode == 200) {
        this.toastrService.success(data.message);
        this.rows = this.rows.filter(function (r) {
          if (r.code == row.code) return false;
          return true;
        });
      } else this.toastrService.error(data.message);
    });
  }
  addRow(): void {
    this.toastrService.info('Satır başarılı bir şekilde eklendi');

    this.rowForm.value.report_id = this.reportId;

    this.rowService.addRow(this.rowForm.value).subscribe((data) => {
      debugger;
      this.rows.push(data);
    });
  }

  openDialog(): void {}

  revisionRequest(checkBoxes) {
    let code = '';
    //checkbox selected
    if (checkBoxes.length > 0) {
      const dialogRef = this.dialog.open(PopupEditComponent, {
        width: '400px',
        data: { name: this.name, claimant_comment: this.claimant_comment},
      });

      checkBoxes.forEach((item) => {
        if (item.checked == true) {
          code += item.code + ',';
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.claimant_comment = result;

        if (this.claimant_comment.length > 0) {
          this.workerService
            .getWorkerWithCode(checkBoxes[0].code)
            .subscribe((data) => {
              this.reportService
                .sendBackReport(this.reportId)
                .subscribe((data) => {
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
                html: `
                <table>
                <tr>
                    <td>Başlık</td>
                    <td>Açıklama</td>
                    <td>Yönetici Yorumu</td>
                </tr>
                <tr>
                    <td>${this.worker_name} ${this.worker_surname} Rapor düzenleme talebi</td>
                    <td><br>${this.week_id}. hafta <strong>${code}</strong> kodlu satırını
                        tekrar <br> düzenlemelisiniz.  <b>raporunuz gönderilmedi olarak </b> işaretlendi 
                        <br>
                        <b>raporu düzenlemek için</b><a
                            href="http://localhost:4200/report-detail/${this.reportId}&codes=${code}">tıklayınız</a><br>
                    </td>
                    <td>${this.claimant_comment}</td>
                </tr>
                
                </table>`,
              };

              this.sendMailToWorker2(mailPacket);
              debugger
              this.toastrService.success('kullanıcıya e posta gönderildi');
            });
        } 
        else {
          this.toastrService.info('Rapor gönderim işlemi iptal edildi');
        }
      });
    }
    //no checked checkbox
    else {
      const dialogRef = this.dialog.open(PopupEditComponent, {
        width: '400px',
        data: { name: this.name, claimant_comment: this.claimant_comment },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.claimant_comment = result;
        if (this.claimant_comment.length > 0) {
          
        this.workerService.getByReport(this.reportId).subscribe((worker) => {
          this.worker_name = worker[0].worker_name;
          this.worker_surname = worker[0].worker_surname;
          this.worker_email = worker[0].worker_email;
          this.week_id? worker[0].week_id: 0;

          this.reportService.sendBackReport(this.reportId).subscribe((data) => {
            this.toastrService.info(
              `${this.reportId} numaralı rapor gönderilmedi olarak işaretlenmiştir`
            );
          });
          let mailPacket = {
            worker_email: this.worker_email,
            subject: `<${this.week_id?this.week_id : "Boş"}>.Rapor.Düzeltme Talebi`,
            html: `
          <table>
              <tr>
                  <td>Başlık</td>
                  <td>Açıklama</td>
                  <td>Yönetici Yorumu</td>
              </tr>
              <tr>
                  <td>${this.worker_name} ${this.worker_surname} Rapor düzenleme talebi</td>
                  <td>
                  
                  Sn. ${this.worker_name} ${this.worker_surname}, <br>${this.week_id?this.week_id:""}. haftalık raporunuzu boş olarak gönderdiniz. Tekrar   <br> düzenlemelisiniz.  <b>raporunuz gönderilmedi olarak </b> işaretlendi
              <br>
              <b>raporu düzenlemek için</b><a href="http://localhost:4200/report-detail/${this.reportId}">tıklayınız</a>
                  </td>
                  <td>${this.claimant_comment}</td>
              </tr>
              
              </table>
          `,
          };

          this.sendMailToWorker2(mailPacket);
          this.toastrService.success('kullanıcıya e posta gönderildi');
        });
      }
      else
        this.toastrService.info("Rapor revizyon işlemi iptal edildi")
      });
    }
  }
}
