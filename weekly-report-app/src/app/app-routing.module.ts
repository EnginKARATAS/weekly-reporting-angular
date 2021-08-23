import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { GmadminComponent } from './gmadmin/gmadmin.component';
import { TodoComponent } from './todo/todo.component';
import { ReportDetailComponent } from './reports/report-detail.component';
import { ReportFormComponent } from './reports/report-form.component';
import { AllReportsComponent } from './reports/all-reports.component';
import { LoginGuard } from './guards/login.guard';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { GmloginComponent } from './login/gmlogin.component';

const routes = ([
  { path: 'login', component: LoginComponent },
  { path: 'gmlogin', component: GmloginComponent },
  { path: '', component: LoginComponent },
  { path: 'report-detail', component: Page404Component },
  { path: 'gmadmin', component: GmadminComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'report-detail/:report_id', component: ReportDetailComponent },
  { path: 'report-form', component: ReportFormComponent },
  { path: 'all-reports', component: AllReportsComponent, canActivate:[LoginGuard] },
  { path: '', component: WelcomeComponent, pathMatch: 'full' }, //anasayfa
  { path: '**', component: Page404Component, pathMatch: 'full' }, //404
])


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
