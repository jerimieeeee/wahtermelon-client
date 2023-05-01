import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentOutcomeComponent } from './treatment-outcome.component';

describe('TreatmentOutcomeComponent', () => {
  let component: TreatmentOutcomeComponent;
  let fixture: ComponentFixture<TreatmentOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
