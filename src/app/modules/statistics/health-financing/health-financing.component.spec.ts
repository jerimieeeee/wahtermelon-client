import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthFinancingComponent } from './health-financing.component';

describe('HealthFinancingComponent', () => {
  let component: HealthFinancingComponent;
  let fixture: ComponentFixture<HealthFinancingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthFinancingComponent]
    });
    fixture = TestBed.createComponent(HealthFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
