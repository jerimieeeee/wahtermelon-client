import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EprescriptionComponent } from './eprescription.component';

describe('EprescriptionComponent', () => {
  let component: EprescriptionComponent;
  let fixture: ComponentFixture<EprescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EprescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
