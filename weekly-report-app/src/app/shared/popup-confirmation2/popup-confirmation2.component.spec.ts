import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmation2Component } from './popup-confirmation2.component';

describe('PopupConfirmation2Component', () => {
  let component: PopupConfirmation2Component;
  let fixture: ComponentFixture<PopupConfirmation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupConfirmation2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupConfirmation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
