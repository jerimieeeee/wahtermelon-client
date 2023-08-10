import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbPreexposureComponent } from './ab-preexposure.component';

describe('AbPreexposureComponent', () => {
  let component: AbPreexposureComponent;
  let fixture: ComponentFixture<AbPreexposureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbPreexposureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbPreexposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
