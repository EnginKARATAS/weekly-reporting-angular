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
import { AddNewWorkerComponent } from './add-new-worker/add-new-worker.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SetPasswordGuard } from './guards/set-password.guard';

const routes = ([
  { path: 'login', component: LoginComponent },
  { path: 'gmlogin', component: GmloginComponent },
  { path: 'add-worker', component: AddNewWorkerComponent },
  { path: 'set-password/:token', component: SetPasswordComponent, canActivate:[SetPasswordGuard] },
  { path: '', component: LoginComponent },
  { path: 'gmadmin', component: GmadminComponent },
  { path: 'todo', component: TodoComponent },
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
