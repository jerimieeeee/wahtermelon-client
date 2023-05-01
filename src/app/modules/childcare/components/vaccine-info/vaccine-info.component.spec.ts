import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineInfoComponent } from './vaccine-info.component';

describe('VaccineInfoComponent', () => {
  let component: VaccineInfoComponent;
  let fixture: ComponentFixture<VaccineInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
