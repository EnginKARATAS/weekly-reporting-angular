import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWorkerComponent } from './add-new-worker.component';

describe('AddNewWorkerComponent', () => {
  let component: AddNewWorkerComponent;
  let fixture: ComponentFixture<AddNewWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
