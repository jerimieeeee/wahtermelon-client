import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018NcdComponent } from './fhsis2018-ncd.component';

describe('Fhsis2018NcdComponent', () => {
  let component: Fhsis2018NcdComponent;
  let fixture: ComponentFixture<Fhsis2018NcdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fhsis2018NcdComponent]
    });
    fixture = TestBed.createComponent(Fhsis2018NcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
