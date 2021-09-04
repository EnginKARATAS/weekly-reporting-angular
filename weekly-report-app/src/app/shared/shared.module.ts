import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfirmationComponent } from './popup-confirmation/popup-confirmation.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PopupConfirmation2Component } from './popup-confirmation2/popup-confirmation2.component';



@NgModule({
  declarations: [
    PopupConfirmationComponent,
    PopupConfirmation2Component
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [PopupConfirmationComponent,MatButtonModule]

})
export class SharedModule { }
