import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReportDetailComponent } from './reports/report-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ReportFormComponent } from './reports/report-form.component';
import { ReportNotificationComponent } from './reports/report-notification/report-notification.component';
import { NaviComponent } from './navi/navi.component';
import { AllReportsComponent } from './reports/all-reports.component';
import { HttpClientModule } from '@angular/common/http';
import { Page404Component } from './page404/page404.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({

  declarations: [
    AppComponent,
    ReportDetailComponent,
    WelcomeComponent,
    AllReportsComponent,
    ReportNotificationComponent,
    NaviComponent,
    TodoComponent,
    LoginComponent,
    VatAddedPipe
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'report-detail', component: Page404Component },
      { path: 'todo', component: TodoComponent },
      { path: 'report-detail/:code', component: ReportDetailComponent },
      { path: 'report-form', component: ReportFormComponent },
      { path: 'all-reports', component: AllReportsComponent },
      { path: '', component: WelcomeComponent, pathMatch:'full' },//anasayfa
      { path: '**', component: Page404Component, pathMatch:'full' },//404
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
