import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { NaviComponent } from './navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/worker-login/login.component';
import { GmloginComponent } from './login/gm-login/gmlogin.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';

import { CookieService } from 'ngx-cookie-service';
import { GmadminComponent } from './gmadmin/gmadmin.component';
import { AppRoutingModule } from './app-routing.module';
import { AddNewWorkerComponent } from './add-new-worker/add-new-worker.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ReportModule } from './reports/report.module';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,

    NaviComponent,
    TodoComponent,
    LoginComponent,
    VatAddedPipe,

    GmadminComponent,
    GmloginComponent,

    AddNewWorkerComponent,
    SetPasswordComponent,
  ],
  exports: [
    MatNativeDateModule,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSliderModule,
    
    FormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),

    AppRoutingModule,
    ReportModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
