import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadClaimsComponent } from './upload-claims.component';

describe('UploadClaimsComponent', () => {
  let component: UploadClaimsComponent;
  let fixture: ComponentFixture<UploadClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadClaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
