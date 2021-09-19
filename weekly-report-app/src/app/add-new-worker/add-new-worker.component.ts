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
      worker_name: ['', Validators.required],
      worker_surname: ['', Validators.required],
      worker_email: ['', Validators.required],
      job_title: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  addNewWorker(): void {
    console.log(this.addWorkerForm.value);
    this.workerService.addWorker(this.addWorkerForm.value).subscribe(data => {
      debugger
      if (data.resCode==200) {
        this.toastrService.success(data.message);
      }
      else if (data.resCode == 409){
        this.toastrService.error(data.message);
      }
    });
    
  }
}
