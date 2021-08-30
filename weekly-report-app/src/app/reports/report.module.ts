import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllReportsComponent } from './all-reports.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [AllReportsComponent],
  imports: [
    CommonModule,
    RouterModule,

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
    
  ]
})
export class ReportModule { }
