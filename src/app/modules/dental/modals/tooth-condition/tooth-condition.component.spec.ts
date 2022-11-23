import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToothConditionComponent } from './tooth-condition.component';

describe('ToothConditionComponent', () => {
  let component: ToothConditionComponent;
  let fixture: ComponentFixture<ToothConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToothConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToothConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
