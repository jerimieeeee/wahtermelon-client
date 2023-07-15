import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalConsultCertificateComponent } from './medical-consult-certificate.component';

describe('MedicalConsultCertificateComponent', () => {
  let component: MedicalConsultCertificateComponent;
  let fixture: ComponentFixture<MedicalConsultCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalConsultCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalConsultCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
