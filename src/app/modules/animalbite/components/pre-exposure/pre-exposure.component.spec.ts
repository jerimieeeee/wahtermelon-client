import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreExposureComponent } from './pre-exposure.component';

describe('PreExposureComponent', () => {
  let component: PreExposureComponent;
  let fixture: ComponentFixture<PreExposureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreExposureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
