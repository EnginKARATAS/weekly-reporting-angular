import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllReportsComponent } from './all-reports/all-reports.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { ToastrModule } from 'ngx-toastr';
import { ReportDetailComponent } from './report-detaill/report-detail.component';
import { ReportNotificationComponent } from './report-notification/report-notification.component';
import { EditWeeklyReportComponent } from './edit-weekly-report/edit-weekly-report.component';
import { ReportFormComponent } from './report-form.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIcon, MatIconModule} from '@angular/material/icon'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AllReportsComponent,
    ReportDetailComponent,
    ReportFormComponent,
    ReportNotificationComponent,
    EditWeeklyReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatDatepickerModule,
    MatSliderModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    

    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,

   
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    BrowserAnimationsModule,
  ],
})
export class ReportModule {}
