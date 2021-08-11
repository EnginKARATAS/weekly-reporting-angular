import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-notification',
  templateUrl: './report-notification.component.html',
  styleUrls: ['./report-notification.component.css'],
})
export class ReportNotificationComponent implements OnInit {
  _message: string = '';
  public get message(): string {
    return this._message;
  }

  public set message(val: string) {
    this.message = val;
  }

  constructor() {}
  getir(): void {
    const output = document.getElementById('test');
    if (output) {
      console.log('hello dayı');
      let d = new Date();

      let thisDay = d.getDay(); //salı
      let lastDayToSend = 6; //pazar
      let howManyDaysToDelivery = Math.abs(thisDay - lastDayToSend); //5 gün

      let days = [
        'pazar',
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
  }

  ngOnInit(): void {}
}
