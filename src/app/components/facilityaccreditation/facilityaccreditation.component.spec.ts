import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityaccreditationComponent } from './facilityaccreditation.component';

describe('FacilityaccreditationComponent', () => {
  let component: FacilityaccreditationComponent;
  let fixture: ComponentFixture<FacilityaccreditationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityaccreditationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityaccreditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
