import { Component, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-notification',
  templateUrl: './report-notification.component.html',
  styleUrls: ['./report-notification.component.css'],
})
export class ReportNotificationComponent implements OnInit {
  _message: string = '';

  innerText = ""

  public get message(): string {
    return this._message;
  }

  public set message(val: string) {
    this.message = val;
  }

  constructor(private toastrService: ToastrService) {}

  getir(): void {
    const output = document.getElementById('test');
    if (output) {
      let d = new Date();

      let thisDay = d.getDay(); //salı
      let lastDayToSend = 6; //pazar
      let howManyDaysToDelivery = Math.abs(thisDay - lastDayToSend); //5 gün

      let days = [
        'pazartesi',
        'salı',
        'çarşamba',
        'perşembe',
        'cuma',
        'cumartesi',
        'pazar',
      ];

      if (thisDay == 6) {
        output.innerHTML =
          'Değerli çalışanımız, bu gün rapor göndermek için son gündür';
      } else {
        output.innerHTML =
          'Değerli çalışanımız, rapor göndermek için son ' +
          howManyDaysToDelivery +
          ' gün. Son gün ' +
          days[lastDayToSend];
        +'gecesidir';
      }
    }
    this.innerText = output.innerHTML;

  }

  ngOnInit(): void {
    this.getir();
  }
}
