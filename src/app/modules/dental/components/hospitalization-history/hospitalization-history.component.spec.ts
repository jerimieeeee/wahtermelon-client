import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizationHistoryComponent } from './hospitalization-history.component';

describe('HospitalizationHistoryComponent', () => {
  let component: HospitalizationHistoryComponent;
  let fixture: ComponentFixture<HospitalizationHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalizationHistoryComponent]
    });
    fixture = TestBed.createComponent(HospitalizationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
