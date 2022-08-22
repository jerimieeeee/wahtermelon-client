import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelvicComponent } from './pelvic.component';

describe('PelvicComponent', () => {
  let component: PelvicComponent;
  let fixture: ComponentFixture<PelvicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelvicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelvicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
