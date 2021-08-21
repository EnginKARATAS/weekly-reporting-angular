import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private cookieService: CookieService,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.cookieService.delete("id")
    this.cookieService.delete("name")
    this.cookieService.delete("surname")
    this.toast.info("Çıkış Başarılı")
    this.router.navigate(['/login']);
  }

}
