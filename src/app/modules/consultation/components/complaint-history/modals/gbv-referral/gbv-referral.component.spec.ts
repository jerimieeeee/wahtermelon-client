import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbvReferralComponent } from './gbv-referral.component';

describe('GbvReferralComponent', () => {
  let component: GbvReferralComponent;
  let fixture: ComponentFixture<GbvReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GbvReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GbvReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
