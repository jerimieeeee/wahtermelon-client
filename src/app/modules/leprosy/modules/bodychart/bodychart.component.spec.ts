import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodychartComponent } from './bodychart.component';

describe('BodychartComponent', () => {
  let component: BodychartComponent;
  let fixture: ComponentFixture<BodychartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodychartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
