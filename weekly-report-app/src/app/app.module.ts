import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { NaviComponent } from './navi/navi.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GmloginComponent } from './login/gm-login/gmlogin.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
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
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    FooterComponent,
    ResetPasswordComponent,
  ],
  exports: [MatNativeDateModule],
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
    SharedModule,
    MatFormFieldModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
