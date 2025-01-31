import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fhsis2018CcComponent } from './fhsis2018-cc.component.ts.bak.bak';

describe('Fhsis2018CcComponent', () => {
  let component: Fhsis2018CcComponent;
  let fixture: ComponentFixture<Fhsis2018CcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fhsis2018CcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fhsis2018CcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
