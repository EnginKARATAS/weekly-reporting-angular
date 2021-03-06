import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from '../services/worker.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'


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
    private router: Router,
    private toastr: ToastrService
  ) {}

  setPasswordForm: FormGroup;
  createRowForm() {
    this.setPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repassword: ['', Validators.required, Validators.minLength(8)],
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
  get f(){
    return this.setPasswordForm.controls
  }
  setPassword(): void {
    let password = this.setPasswordForm.value.password;
    let repassword = this.setPasswordForm.value.repassword;
    if (password != repassword) {
      this.message = 'Şifreler uyuşmuyor.';
    } else {
      const data = {
        token: this.token,
        password: password,
        repassword: repassword,
      };
      this.workerService.updatePassword(data).subscribe((data) => {
        if (data.resCode == 200) {
          this.router.navigate(['/login']).then((b) => {
            Swal.fire('Başarılı işlem ', 'Şifre  değiştirme başarılı', 'success')
            // this.toastr.success(data.message);
          });
        }
        if (data.resCode == 400) this.toastr.error(data.message);
      });
    }
  }
}
