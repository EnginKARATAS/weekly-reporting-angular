import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-weekly-report',
  templateUrl: './edit-weekly-report.component.html',
  styleUrls: ['./edit-weekly-report.component.css'],
})
export class EditWeeklyReportComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl(),
    age: new FormControl('20'),
  });
  onFormSubmit(): void {
    console.log('Name:' + this.userForm.get('name').value);
  }

  ngOnInit(): void {}
}
