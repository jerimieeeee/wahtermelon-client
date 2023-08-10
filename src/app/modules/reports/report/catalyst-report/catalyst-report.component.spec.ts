import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalystReportComponent } from './catalyst-report.component';

describe('CatalystReportComponent', () => {
  let component: CatalystReportComponent;
  let fixture: ComponentFixture<CatalystReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalystReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalystReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
