import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  id: number;
  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe((respond) => {
          if (respond.data[0]) {
            this.cookieService.set('name', respond.data[0].worker_name);
            this.cookieService.set('surname', respond.data[0].worker_surname);
            this.cookieService.set('id', respond.data[0].id);
            this.cookieService.set('isLoggedIn', 'true');

            let token = respond.token;
            localStorage.setItem('token', token);
            
            this.router.navigate(['/all-reports']).then((d) => {
              window.location.reload();
            });
            this.toastrService.success('Başarıyla Giriş Yapıldı');
            // this.toastrService.success(data.message);
          } else this.toastrService.error('Kullanıcı Adı Veya Şifre Hatalı');
        });
    }
  }
}
