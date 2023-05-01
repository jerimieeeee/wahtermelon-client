import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cf1Component } from './cf1.component';

describe('Cf1Component', () => {
  let component: Cf1Component;
  let fixture: ComponentFixture<Cf1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cf1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cf1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
