import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Row } from '../models/row';
import { ReportService } from '../services/report.service';
import { RowService } from '../services/row.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css'],
})
export class ReportDetailComponent implements OnInit {
  rows: Row[] = [];
  constructor(
    private reportService: ReportService,
    private rowService: RowService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['row_id']) {
        this.getRows(params['row_id']);
        //this.//raporlama tarihi, kişi ad soyad. tanıdık geldi mi ? hayır : D
      }
    });
  }

  getRows(row_id: any) {
    this.rowService.get(row_id).subscribe((response) => {
      this.rows = response;
      console.log(response);
    });
  }
}
