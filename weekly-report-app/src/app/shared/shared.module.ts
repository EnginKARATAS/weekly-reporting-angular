import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfirmationComponent } from './popup-confirmation/popup-confirmation.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    PopupConfirmationComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [PopupConfirmationComponent,MatButtonModule]

})
export class SharedModule { }
