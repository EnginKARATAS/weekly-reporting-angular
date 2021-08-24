import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isLoggedIn: boolean ;
  gmisLoggedIn: boolean ;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn').includes("true");
    this.gmisLoggedIn = this.cookieService.get('isLoggedIn').includes("true");
    
    if (this.isLoggedIn) { 
      this.cookieService.delete('gmisLoggedIn');
    }
    console.log("🚀 ~ file: navi.component.ts ~ line 21 ~ NaviComponent ~ ngOnInit ~ this.isLoggedIn", this.isLoggedIn)
  }

  logout(): void {
    this.cookieService.delete('id');
    this.cookieService.delete('name');
    this.cookieService.delete('surname');
    this.cookieService.delete('isLoggedIn');
    this.toast.info('Çıkış Başarılı');
    this.router.navigate(['/login']);
  }
}
