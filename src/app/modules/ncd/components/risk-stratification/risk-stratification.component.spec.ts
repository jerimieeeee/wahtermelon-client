import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskStratificationComponent } from './risk-stratification.component';

describe('RiskStratificationComponent', () => {
  let component: RiskStratificationComponent;
  let fixture: ComponentFixture<RiskStratificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskStratificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskStratificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
