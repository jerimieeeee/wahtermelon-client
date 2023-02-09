import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalExamComponent } from './physical-exam.component';

describe('PhysicalExamComponent', () => {
  let component: PhysicalExamComponent;
  let fixture: ComponentFixture<PhysicalExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
