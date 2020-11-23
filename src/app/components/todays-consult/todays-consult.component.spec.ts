import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysConsultComponent } from './todays-consult.component';

describe('TodaysConsultComponent', () => {
  let component: TodaysConsultComponent;
  let fixture: ComponentFixture<TodaysConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
