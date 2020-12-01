import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientItrComponent } from './patient-itr.component';

describe('PatientItrComponent', () => {
  let component: PatientItrComponent;
  let fixture: ComponentFixture<PatientItrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientItrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientItrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
