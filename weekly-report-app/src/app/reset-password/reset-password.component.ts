import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailService } from '../services/mail.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  message = ""
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private workerService: WorkerService,
    private toastr: ToastrService,
    private emailService: MailService,
  ) {}
  resetPasswordForm: FormGroup;

  createRowForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createRowForm();
  }

  setPassword(): void {
    let email = this.resetPasswordForm.value.email;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (email.match(regexEmail)) {
      this.workerService.sendResetEmail(email).subscribe(data => {
        console.log(data)
        if (data.resCode = 200) {
          this.toastr.success(data.message);
        }
        if (data.resCode = 400) {
          // this.toastr.error(data.message);         
        }
      })
 
      // let mailPacket = {
      //   worker_email: email,
      //   subject: "Şifre sıfırlama talebi",
      //   html: "html",
      // };


      // this.emailService.sentToWorker(mailPacket)

    
    }
    else this.toastr.error("E posta hatalıdır.")
  }
}
