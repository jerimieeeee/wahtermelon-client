import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineModalComponent } from './vaccine-modal.component';

describe('VaccineModalComponent', () => {
  let component: VaccineModalComponent;
  let fixture: ComponentFixture<VaccineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
