import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018McComponent } from './fhsis2018-mc.component';

describe('Fhsis2018McComponent', () => {
  let component: Fhsis2018McComponent;
  let fixture: ComponentFixture<Fhsis2018McComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fhsis2018McComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fhsis2018McComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
