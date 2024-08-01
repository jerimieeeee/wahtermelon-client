import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPendingComponent } from './lab-pending.component';

describe('LabPendingComponent', () => {
  let component: LabPendingComponent;
  let fixture: ComponentFixture<LabPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabPendingComponent]
    });
    fixture = TestBed.createComponent(LabPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
