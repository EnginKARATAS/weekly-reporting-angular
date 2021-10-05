import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-add-new-worker',
  templateUrl: './add-new-worker.component.html',
  styleUrls: ['./add-new-worker.component.css'],
})
export class AddNewWorkerComponent implements OnInit {
  id: number;

  addWorkerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private toastrService: ToastrService,
    private workerService: WorkerService
  ) {}

  ngOnInit(): void {
    this.createWorkerForm();
    // this.id = this.cookieService.get('Test');
  }

  createWorkerForm() {
    this.addWorkerForm = this.formBuilder.group({
      worker_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      worker_surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      worker_email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@dvu.com.tr$")]],
      job_title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      username: [''],
    });
  }

  get f() {
    return this.addWorkerForm.controls
  }

  addNewWorker(): void {
    this.addWorkerForm.value.username = this.addWorkerForm.value.email
    this.workerService.addWorker(this.addWorkerForm.value).subscribe(data => {
      if (data.resCode==200) {
        this.toastrService.success(data.message);
      }
      else if (data.resCode == 409){
        this.toastrService.error(data.message);
      }
    });
    
  }
}
