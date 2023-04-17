import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegisteredComponent } from './patient-registered.component';

describe('PatientRegisteredComponent', () => {
  let component: PatientRegisteredComponent;
  let fixture: ComponentFixture<PatientRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRegisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
