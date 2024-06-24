import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintHistoryComponent } from './complaint-history.component';

describe('ComplaintHistoryComponent', () => {
  let component: ComplaintHistoryComponent;
  let fixture: ComponentFixture<ComplaintHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComplaintHistoryComponent]
    });
    fixture = TestBed.createComponent(ComplaintHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
