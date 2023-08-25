import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018MorbidityComponent } from './fhsis2018-morbidity.component';

describe('Fhsis2018MorbidityComponent', () => {
  let component: Fhsis2018MorbidityComponent;
  let fixture: ComponentFixture<Fhsis2018MorbidityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fhsis2018MorbidityComponent]
    });
    fixture = TestBed.createComponent(Fhsis2018MorbidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
