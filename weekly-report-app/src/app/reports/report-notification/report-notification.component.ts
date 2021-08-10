import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-notification',
  templateUrl: './report-notification.component.html',
  styleUrls: ['./report-notification.component.css']
})
export class ReportNotificationComponent implements OnInit {
  _message: string = ""
  public get message(): string {
    return this._message
  }

  public set message(val: string) {
    this.message = val;
  }

  constructor() { }
  getir(): string {
    console.log("hello dayı")
    let d = new Date();

    let thisDay = d.getDay(); //salı
    let lastDayToSend = 6; //pazar
    let howManyDaysToDelivery = Math.abs(thisDay - lastDayToSend); //5 gün

    let days = ["pazar", "pazartesi", "salı", "çarşamba", "perşembe", "cuma", "cumartesi", "pazar"]

    if (thisDay == 6) {
      return "Değerli çalışanımız, bu gün rapor göndermek için son gündür"
    }

    else {
      return "Değerli çalışanımız, rapor göndermek için son " + (howManyDaysToDelivery) + " gün. Son gün " + days[lastDayToSend];
    }
  }


  ngOnInit(): void {
    this.message = this.getir()
  }

}
