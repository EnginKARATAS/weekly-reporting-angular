import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.cookieService.delete("id")
    this.cookieService.delete("name")
    this.cookieService.delete("surname")
  }

}
