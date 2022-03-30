import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpchartComponent } from './fpchart.component';

describe('FpchartComponent', () => {
  let component: FpchartComponent;
  let fixture: ComponentFixture<FpchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
