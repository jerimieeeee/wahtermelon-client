import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabRequestModalComponent } from './lab-request-modal.component';

describe('LabRequestModalComponent', () => {
  let component: LabRequestModalComponent;
  let fixture: ComponentFixture<LabRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabRequestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
