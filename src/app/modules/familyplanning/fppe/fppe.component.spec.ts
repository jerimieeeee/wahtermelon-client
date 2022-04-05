import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FppeComponent } from './fppe.component';

describe('FppeComponent', () => {
  let component: FppeComponent;
  let fixture: ComponentFixture<FppeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FppeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FppeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
