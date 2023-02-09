import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cf2Component } from './cf2.component';

describe('Cf2Component', () => {
  let component: Cf2Component;
  let fixture: ComponentFixture<Cf2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cf2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cf2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
