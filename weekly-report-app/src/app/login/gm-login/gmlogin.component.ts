import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
        .subscribe((data) => {
          if (data) {
            console.log(data);
            this.cookieService.set('gmname', data[0].claimant_name);
            this.cookieService.set('gmsurname', data[0].claimnats_surname);
            this.cookieService.set('gmid', data[0].id);
            this.cookieService.set('gmisLoggedIn', 'true');
            this.router.navigate(['/gmadmin']);
          }
          else this.toastrService.error("Kullanıcı Adı Veya Şifre Hatalı")

        });
    }
  }

  
}
