import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Casdt2Component } from './casdt2.component';

describe('Casdt2Component', () => {
  let component: Casdt2Component;
  let fixture: ComponentFixture<Casdt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Casdt2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Casdt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
