import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private cookieService: CookieService) { }
  gmisLoggedIn: boolean;
  isLoggedIn: boolean;
  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn').includes('true');
    this.gmisLoggedIn = this.cookieService.get('gmisLoggedIn').includes('true');
  }

}
