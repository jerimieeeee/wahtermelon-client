import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultChartComponent } from './chart-adult.component';

describe('AdultChartComponent', () => {
  let component: AdultChartComponent;
  let fixture: ComponentFixture<AdultChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdultChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
