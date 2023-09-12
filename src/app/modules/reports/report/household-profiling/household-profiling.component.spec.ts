import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdProfilingComponent } from './household-profiling.component';

describe('HouseholdProfilingComponent', () => {
  let component: HouseholdProfilingComponent;
  let fixture: ComponentFixture<HouseholdProfilingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseholdProfilingComponent]
    });
    fixture = TestBed.createComponent(HouseholdProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
