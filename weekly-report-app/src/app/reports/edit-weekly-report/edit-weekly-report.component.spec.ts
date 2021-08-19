import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeeklyReportComponent } from './edit-weekly-report.component';

describe('EditWeeklyReportComponent', () => {
  let component: EditWeeklyReportComponent;
  let fixture: ComponentFixture<EditWeeklyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWeeklyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeeklyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
