import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018DentalM1Component } from './fhsis2018-dental-m1.component';

describe('Fhsis2018DentalM1Component', () => {
  let component: Fhsis2018DentalM1Component;
  let fixture: ComponentFixture<Fhsis2018DentalM1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fhsis2018DentalM1Component]
    });
    fixture = TestBed.createComponent(Fhsis2018DentalM1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
