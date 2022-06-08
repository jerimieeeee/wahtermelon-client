import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskScreeningComponent } from './risk-screening.component';

describe('RiskScreeningComponent', () => {
  let component: RiskScreeningComponent;
  let fixture: ComponentFixture<RiskScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskScreeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
