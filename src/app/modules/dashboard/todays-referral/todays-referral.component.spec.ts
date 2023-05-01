import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysReferralComponent } from './todays-referral.component';

describe('TodaysReferralComponent', () => {
  let component: TodaysReferralComponent;
  let fixture: ComponentFixture<TodaysReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
