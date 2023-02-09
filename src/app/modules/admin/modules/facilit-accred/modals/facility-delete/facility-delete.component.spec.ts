import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDeleteComponent } from './facility-delete.component';

describe('FacilityDeleteComponent', () => {
  let component: FacilityDeleteComponent;
  let fixture: ComponentFixture<FacilityDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
