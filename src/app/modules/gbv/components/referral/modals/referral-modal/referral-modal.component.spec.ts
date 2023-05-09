import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralModalComponent } from './referral-modal.component';

describe('ReferralModalComponent', () => {
  let component: ReferralModalComponent;
  let fixture: ComponentFixture<ReferralModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
