import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018MortalityUnderlyingComponent } from './fhsis2018-mortality-underlying.component';

describe('Fhsis2018MortalityUnderlyingComponent', () => {
  let component: Fhsis2018MortalityUnderlyingComponent;
  let fixture: ComponentFixture<Fhsis2018MortalityUnderlyingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fhsis2018MortalityUnderlyingComponent]
    });
    fixture = TestBed.createComponent(Fhsis2018MortalityUnderlyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
