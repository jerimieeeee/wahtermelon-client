import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyServiceComponent } from './daily-service.component';

describe('DailyServiceComponent', () => {
  let component: DailyServiceComponent;
  let fixture: ComponentFixture<DailyServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyServiceComponent]
    });
    fixture = TestBed.createComponent(DailyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
