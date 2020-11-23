import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysStatComponent } from './todays-stat.component';

describe('TodaysStatComponent', () => {
  let component: TodaysStatComponent;
  let fixture: ComponentFixture<TodaysStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
