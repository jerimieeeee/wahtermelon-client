import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalConsultComponent } from './medical-consult.component';

describe('MedicalConsultComponent', () => {
  let component: MedicalConsultComponent;
  let fixture: ComponentFixture<MedicalConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalConsultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
