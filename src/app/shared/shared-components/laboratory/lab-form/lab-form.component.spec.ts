import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabFormComponent } from './lab-form.component';

describe('LabFormComponent', () => {
  let component: LabFormComponent;
  let fixture: ComponentFixture<LabFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabFormComponent]
    });
    fixture = TestBed.createComponent(LabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
