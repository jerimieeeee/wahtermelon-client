import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorbidityCalendarComponent } from './morbidity-calendar.component';

describe('MorbidityCalendarComponent', () => {
  let component: MorbidityCalendarComponent;
  let fixture: ComponentFixture<MorbidityCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorbidityCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorbidityCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
