import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EclaimsRthComponent } from './eclaims-rth.component';

describe('EclaimsRthComponent', () => {
  let component: EclaimsRthComponent;
  let fixture: ComponentFixture<EclaimsRthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EclaimsRthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EclaimsRthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
