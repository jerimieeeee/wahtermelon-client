import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDxComponent } from './initial-dx.component';

describe('InitialDxComponent', () => {
  let component: InitialDxComponent;
  let fixture: ComponentFixture<InitialDxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InitialDxComponent]
    });
    fixture = TestBed.createComponent(InitialDxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
