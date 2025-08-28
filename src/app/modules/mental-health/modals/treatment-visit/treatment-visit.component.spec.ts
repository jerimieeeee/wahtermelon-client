import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentVisitComponent } from './treatment-visit.component';

describe('TreatmentVisitComponent', () => {
  let component: TreatmentVisitComponent;
  let fixture: ComponentFixture<TreatmentVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
