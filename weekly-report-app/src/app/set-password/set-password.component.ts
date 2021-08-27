import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
})
export class SetPasswordComponent implements OnInit {
  token: string = '';
  tokenLength: number = 254;
  message: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private workerService: WorkerService,
    private router: Router
  ) {}

  setPasswordForm: FormGroup;
  createRowForm() {
    this.setPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['token'].length == this.tokenLength) {
        this.token = params['token'];
      } 
    });

    this.createRowForm();
  }

  setPassword(): void {
    let password = this.setPasswordForm.value.password;
    let repassword = this.setPasswordForm.value.repassword;
    if (password != repassword) {
      this.message = 'Şifreler uyuşmuyor.';
    } else {
      const data = {token: this.token,password: password};
      console.log(data);
      this.workerService.updatePassword(data).subscribe(data => {
        console.log(data);
        this.router.navigate(['/login']);
      });
    }
  }
}
