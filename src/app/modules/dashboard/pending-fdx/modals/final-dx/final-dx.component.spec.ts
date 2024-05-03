import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDxComponent } from './final-dx.component';

describe('FinalDxComponent', () => {
  let component: FinalDxComponent;
  let fixture: ComponentFixture<FinalDxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalDxComponent]
    });
    fixture = TestBed.createComponent(FinalDxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
