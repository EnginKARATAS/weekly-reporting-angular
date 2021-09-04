import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialogData';

@Component({
  selector: 'app-popup-confirmation',
  templateUrl: './popup-confirmation.component.html',
  styleUrls: ['./popup-confirmation.component.css']
})
export class PopupConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}
