import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenstrualHistoryComponent } from './menstrual-history.component';

describe('MenstrualHistoryComponent', () => {
  let component: MenstrualHistoryComponent;
  let fixture: ComponentFixture<MenstrualHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenstrualHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenstrualHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
