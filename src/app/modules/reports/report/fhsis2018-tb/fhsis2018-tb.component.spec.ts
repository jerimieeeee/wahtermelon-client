import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018TbComponent } from './fhsis2018-tb.component';

describe('Fhsis2018TbComponent', () => {
  let component: Fhsis2018TbComponent;
  let fixture: ComponentFixture<Fhsis2018TbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Fhsis2018TbComponent]
    });
    fixture = TestBed.createComponent(Fhsis2018TbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
