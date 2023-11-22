import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalPrescriptionComponent } from './physical-prescription.component';

describe('PhysicalPrescriptionComponent', () => {
  let component: PhysicalPrescriptionComponent;
  let fixture: ComponentFixture<PhysicalPrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhysicalPrescriptionComponent]
    });
    fixture = TestBed.createComponent(PhysicalPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
