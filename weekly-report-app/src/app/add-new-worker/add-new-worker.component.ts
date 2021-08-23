import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-new-worker',
  templateUrl: './add-new-worker.component.html',
  styleUrls: ['./add-new-worker.component.css']
})
export class AddNewWorkerComponent implements OnInit {
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
    this.toastrService.success("Başarıyla Giriş Yapıldı")

      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe((data) => {
          console.log(data);
          this.cookieService.set('name', data[0].worker_name);
          this.cookieService.set('surname', data[0].worker_surname);
          this.cookieService.set('id', data[0].id);
          this.cookieService.set('isLoggedIn', 'true');
          this.router.navigate(['/all-reports']);
        });
    }
  }
}
