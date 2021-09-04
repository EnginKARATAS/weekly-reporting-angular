import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { NaviComponent } from './navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { GmloginComponent } from './login/gm-login/gmlogin.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';

import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AddNewWorkerComponent } from './add-new-worker/add-new-worker.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ReportModule } from './reports/report.module';
import { GmadminComponent } from './reports/gmadmin/gmadmin.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/worker-login/login.component';
import { ConfirmationDialogComponent } from './report/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,

    NaviComponent,
    VatAddedPipe,

    GmadminComponent,

    LoginComponent,
    GmloginComponent,

    AddNewWorkerComponent,
    SetPasswordComponent,
    ConfirmationDialogComponent,
  ],
  exports: [
    MatNativeDateModule,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientModule,
    
    MatDatepickerModule,
    MatSliderModule,
    
    AppRoutingModule,
    ReportModule,

    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
