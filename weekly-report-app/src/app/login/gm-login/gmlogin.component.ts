import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gmlogin',
  templateUrl: './gmlogin.component.html',
  styleUrls: ['./gmlogin.component.css']
})
export class GmloginComponent implements OnInit {

  id: number;

  gmloginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.cookieService.deleteAll();
    // this.id = this.cookieService.get('Test');
  }

  createLoginForm() {
    this.gmloginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  gmlogin(): void {
    if (this.gmloginForm.valid) {
      this.authService
        .gmlogin(this.gmloginForm.value.username, this.gmloginForm.value.password)
        .subscribe((gm) => {
          if (gm) {
            this.cookieService.set('gmname', gm.data[0].claimant_name);
            this.cookieService.set('gmsurname', gm.data[0].claimant_surname);
            this.cookieService.set('gmid', gm.data[0].id);
            this.cookieService.set('gmisLoggedIn', 'true');
            let token = gm.token;
            localStorage.setItem('token', token);
            this.router.navigate(['/gmadmin']).then(b =>{
              window.location.reload();
            });;
          }
          else this.toastrService.error("Kullanıcı Adı Veya Şifre Hatalı")
        });
    }
  }

  
}
