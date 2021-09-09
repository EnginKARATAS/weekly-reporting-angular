import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialogData';

@Component({
  selector: 'app-popup-edit',
  templateUrl: './popup-edit.component.html',
  styleUrls: ['./popup-edit.component.css'],
})
export class PopupEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PopupEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
