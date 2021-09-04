import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../services/report.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmationComponent } from '../shared/popup-confirmation/popup-confirmation.component';

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
    private reportService: ReportService,
    private dialog: MatDialog,
    private toastrService: ToastrService

  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn').includes('true');
    this.gmisLoggedIn = this.cookieService.get('gmisLoggedIn').includes('true');
    this.worker_id = parseInt(this.cookieService.get('id'));
    this.addReport();
  }

  addReport() {
    const is_report_sended = false;
    const worker_id = this.worker_id;
    const claimant_id = 1;
    
    //hafta numarası tespit edilmelidir
    let currentdate = new Date();
    let cc = new Date().getFullYear();
    var oneJan = new Date(cc,0,1)
    let d = currentdate.getTime() - oneJan.getTime()
    var numberOfDays = Math.floor(d / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
    console.log(`The week number of the current date (${currentdate}) is ${result}.`);



    const report_commit_date = Date();
    const report_edit_date = report_commit_date;
    const report = {
      is_report_sended: is_report_sended,
      worker_id: worker_id,
      claimant_id: claimant_id,
      report_commit_date: report_commit_date,
      report_edit_date: report_edit_date
    };
      this.reportService.create(report).subscribe((data) => {
        this.toastrService.success("Haftalık rapor oluşturuldu.")
      });
  }

  openPopupWithAddReport() {
    const dialogRef = this.dialog.open(PopupConfirmationComponent, {
      data: { header: 'Haftalık raporumu oluştur', message: 'Bu haftaki raporunuzu eklemek istiyor musunuz?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        this.addReport();
      } else this.toastrService.info('Aksiyon silme işlemi iptal edilmiştir.');
    });
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.toast.info('Çıkış Başarılı');
    this.router.navigate(['/login']);
  }
}
