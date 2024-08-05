import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018MortalityComponent } from './fhsis2018-mortality.component';

describe('Fhsis2018MortalityComponent', () => {
  let component: Fhsis2018MortalityComponent;
  let fixture: ComponentFixture<Fhsis2018MortalityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fhsis2018MortalityComponent]
    });
    fixture = TestBed.createComponent(Fhsis2018MortalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
