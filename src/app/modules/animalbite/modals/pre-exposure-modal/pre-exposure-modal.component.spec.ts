import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreExposureModalComponent } from './pre-exposure-modal.component';

describe('PreExposureModalComponent', () => {
  let component: PreExposureModalComponent;
  let fixture: ComponentFixture<PreExposureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreExposureModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreExposureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
