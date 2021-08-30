import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportDetailComponent } from './reports/report-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ReportFormComponent } from './reports/report-form.component';
import { ReportNotificationComponent } from './reports/report-notification/report-notification.component';
import { NaviComponent } from './navi/navi.component';
import { AllReportsComponent } from './reports/all-reports.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditWeeklyReportComponent } from './reports/edit-weekly-report/edit-weekly-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';

import { CookieService } from 'ngx-cookie-service';
import { GmadminComponent } from './gmadmin/gmadmin.component';
import { LoginGuard } from './guards/login.guard';
import { AppRoutingModule } from './app-routing.module';
import { GmloginComponent } from './login/gmlogin.component';
import { AddNewWorkerComponent } from './add-new-worker/add-new-worker.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ReportModule } from './reports/report.module';



@NgModule({
  declarations: [
    AppComponent,
    ReportDetailComponent,
    WelcomeComponent,
    ReportNotificationComponent,
    NaviComponent,
    TodoComponent,
    LoginComponent,
    VatAddedPipe,
    EditWeeklyReportComponent,
    ReportFormComponent,
    GmadminComponent,
    GmloginComponent,
    AddNewWorkerComponent,
    SetPasswordComponent,
  ],
  exports: [
    MatNativeDateModule,
  ],
  imports: [
    BrowserAnimationsModule, 
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,MatDatepickerModule,
    MatSliderModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ReportModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
