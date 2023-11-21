import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRequiredClaimsComponent } from './upload-required-claims.component';

describe('UploadRequiredClaimsComponent', () => {
  let component: UploadRequiredClaimsComponent;
  let fixture: ComponentFixture<UploadRequiredClaimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadRequiredClaimsComponent]
    });
    fixture = TestBed.createComponent(UploadRequiredClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
