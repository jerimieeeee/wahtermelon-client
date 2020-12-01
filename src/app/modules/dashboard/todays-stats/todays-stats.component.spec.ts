import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysStatsComponent } from './todays-stats.component';

describe('TodaysStatsComponent', () => {
  let component: TodaysStatsComponent;
  let fixture: ComponentFixture<TodaysStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
