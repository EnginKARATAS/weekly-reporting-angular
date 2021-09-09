import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfirmationComponent } from './popup-confirmation/popup-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PopupEditComponent } from './popup-edit/popup-edit.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PopupConfirmationComponent, PopupEditComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [PopupConfirmationComponent, MatButtonModule],
})
export class SharedModule {}
