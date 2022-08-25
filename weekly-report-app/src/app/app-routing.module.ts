import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404/page404.component';
import { ReportFormComponent } from './reports/report-form.component';
import { AllReportsComponent } from './reports/all-reports/all-reports.component';
import { AuthGuard } from './guards/Auth.guard';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { AddNewWorkerComponent } from './add-new-worker/add-new-worker.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ReportDetailComponent } from './reports/report-detaill/report-detail.component';
import { LoginComponent } from './login/worker-login/login.component';
import { GmloginComponent } from './login/gm-login/gmlogin.component';
import { GmadminComponent } from './reports/gmadmin/gmadmin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes = ([
  { path: 'gmlogin', component: GmloginComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent  },
  { path: 'add-worker', component: AddNewWorkerComponent,  },
  { path: 'set-password/:token', component: SetPasswordComponent, canActive:[AuthGuard]  },
  { path: 'reset-password', component: ResetPasswordComponent, canActive:[AuthGuard]},
  { path: 'gmadmin', component: GmadminComponent, canActive:[AuthGuard] },
  { path: 'report-form', component: ReportFormComponent, canActive:[AuthGuard] },
  { path: '', component: WelcomeComponent, pathMatch: 'full', canActive:[AuthGuard] }, //anasayfa
])

const childRoutes = ([
  { path: 'all-reports', component: AllReportsComponent, canActive:[AuthGuard]  },
  { path: 'report-detail/:report_id', component: ReportDetailComponent,  },// canActive:[AuthGuard]
  { path: '**', component: Page404Component, pathMatch: 'full' }, //404

])

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true}),
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
