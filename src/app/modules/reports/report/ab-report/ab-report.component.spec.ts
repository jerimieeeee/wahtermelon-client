import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbReportComponent } from './ab-report.component';

describe('AbReportComponent', () => {
  let component: AbReportComponent;
  let fixture: ComponentFixture<AbReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbReportComponent]
    });
    fixture = TestBed.createComponent(AbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
