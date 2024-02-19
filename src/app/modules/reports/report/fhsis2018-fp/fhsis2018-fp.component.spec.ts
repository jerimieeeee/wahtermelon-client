import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018FpComponent } from './fhsis2018-fp.component';

describe('Fhsis2018FpComponent', () => {
  let component: Fhsis2018FpComponent;
  let fixture: ComponentFixture<Fhsis2018FpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fhsis2018FpComponent]
    });
    fixture = TestBed.createComponent(Fhsis2018FpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
