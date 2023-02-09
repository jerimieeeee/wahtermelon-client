import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedXmlComponent } from './uploaded-xml.component';

describe('UploadedXmlComponent', () => {
  let component: UploadedXmlComponent;
  let fixture: ComponentFixture<UploadedXmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedXmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
