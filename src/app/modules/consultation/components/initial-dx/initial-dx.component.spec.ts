import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDxComponent } from './initial-dx.component';

describe('InitialDxComponent', () => {
  let component: InitialDxComponent;
  let fixture: ComponentFixture<InitialDxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialDxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialDxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
