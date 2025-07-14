import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedCertComponent } from './med-cert.component';

describe('MedCertComponent', () => {
  let component: MedCertComponent;
  let fixture: ComponentFixture<MedCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedCertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
