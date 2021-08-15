import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from '../models/reports';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css'],
})
export class ReportDetailComponent implements OnInit {
  reportWithRows: Report[] = [];
  constructor(
    private reportService: ReportService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['code']) {
        this.get(params['code']);
      } else {
      }
    });
  }

  get(code: any) {
    this.reportService.get(code).subscribe((response) => {
      this.reportWithRows = response;
      console.log(response)
    });
  }
}
