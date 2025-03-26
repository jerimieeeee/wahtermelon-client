import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralFormComponent } from './referral-form.component';

describe('ReferralFormComponent', () => {
  let component: ReferralFormComponent;
  let fixture: ComponentFixture<ReferralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
