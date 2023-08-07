import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbPostexposureComponent } from './ab-postexposure.component';

describe('AbPostexposureComponent', () => {
  let component: AbPostexposureComponent;
  let fixture: ComponentFixture<AbPostexposureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbPostexposureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbPostexposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
