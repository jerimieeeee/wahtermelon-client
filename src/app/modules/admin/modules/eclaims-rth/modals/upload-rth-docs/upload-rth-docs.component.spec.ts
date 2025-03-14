import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRthDocsComponent } from './upload-rth-docs.component';

describe('UploadRthDocsComponent', () => {
  let component: UploadRthDocsComponent;
  let fixture: ComponentFixture<UploadRthDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadRthDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadRthDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
