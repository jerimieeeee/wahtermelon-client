import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbExposureComponent } from './ab-exposure.component';

describe('AbExposureComponent', () => {
  let component: AbExposureComponent;
  let fixture: ComponentFixture<AbExposureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbExposureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
