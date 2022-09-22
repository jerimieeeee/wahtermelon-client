import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthFacilityComponent } from './health-facility.component';

describe('HealthFacilityComponent', () => {
  let component: HealthFacilityComponent;
  let fixture: ComponentFixture<HealthFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthFacilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
