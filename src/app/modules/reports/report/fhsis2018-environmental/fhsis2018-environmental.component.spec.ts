import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018EnvironmentalComponent } from './fhsis2018-environmental.component';

describe('Fhsis2018EnvironmentalComponent', () => {
  let component: Fhsis2018EnvironmentalComponent;
  let fixture: ComponentFixture<Fhsis2018EnvironmentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fhsis2018EnvironmentalComponent]
    });
    fixture = TestBed.createComponent(Fhsis2018EnvironmentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
