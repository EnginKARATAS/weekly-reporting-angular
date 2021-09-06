import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404/page404.component';
import { ReportFormComponent } from './reports/report-form.component';
import { AllReportsComponent } from './reports/all-reports/all-reports.component';
import { LoginGuard } from './guards/login.guard';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { AddNewWorkerComponent } from './add-new-worker/add-new-worker.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SetPasswordGuard } from './guards/set-password.guard';
import { ReportDetailComponent } from './reports/report-detaill/report-detail.component';
import { LoginComponent } from './login/worker-login/login.component';
import { GmloginComponent } from './login/gm-login/gmlogin.component';
import { GmadminComponent } from './reports/gmadmin/gmadmin.component';

const routes = ([
  { path: 'gmlogin', component: GmloginComponent },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'add-worker', component: AddNewWorkerComponent },
  { path: 'set-password/:token', component: SetPasswordComponent, canActivate:[SetPasswordGuard] },
  { path: '', component: LoginComponent  },
  { path: 'gmadmin', component: GmadminComponent },
  { path: 'report-form', component: ReportFormComponent },
  { path: '', component: WelcomeComponent, pathMatch: 'full' }, //anasayfa
])

const childRoutes = ([
  { path: 'all-reports', component: AllReportsComponent, canActivate:[LoginGuard] },
  { path: 'report-detail/:report_id', component: ReportDetailComponent, canActivate:[LoginGuard] },
  { path: '**', component: Page404Component, pathMatch: 'full' }, //404

])


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
