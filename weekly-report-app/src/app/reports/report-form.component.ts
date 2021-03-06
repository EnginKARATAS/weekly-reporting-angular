import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Claimants } from '../models/claimants';
import { ClaimantService } from '../services/claimant.service';
import { RowService } from '../services/row.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
})
export class ReportFormComponent implements OnInit {
  claimants: Claimants[] = [];

  reportForm: FormGroup;

  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private claimantService: ClaimantService,
    private rowService: RowService,
    private cookieService: CookieService
  ) {}

  createRowForm() {
    this.reportForm = this.formBuilder.group({
      report_id: ['', Validators.required],
      matter: ['', Validators.required],
      status: ['', Validators.required],
      is_timeout: ['', Validators.required],
      weekly_time_spent: ['', Validators.required],
      scheduled_completion_date: ['', Validators.required],
      finish_date: ['', Validators.required],
      actions: ['', Validators.required],
      comments: ['', Validators.required],
      claimants: ['', Validators.required],
      start_date: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.createRowForm();
    this.getClaimants();
  }

  getClaimants(): void {
    this.claimantService.getAll().subscribe((data) => {
      this.claimants = data;
    });
  }

  addRow(): void {
    this.toastrService.info('Satır başarılı bir şekilde eklendi');
    this.reportForm.value.is_timeout.includes('Var') ? 1 : 0;
    console.log('😒😒😒');
    console.log(this.reportForm.value);
    this.reportForm.value.report_id = this.cookieService.get('id');

    this.rowService.addRow(this.reportForm.value).subscribe((data) => {
      console.log(
        '🚀 ~ file: report-form.component.ts ~ line 62 ~ ReportFormComponent ~ this.rowService.addRow ~ data',
        data
      );
    });

    // if (this.rowForm.valid) {
    //   console.log("valid")
    // }
  }
}
