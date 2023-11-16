import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportXmlComponent } from './import-xml.component';

describe('ImportXmlComponent', () => {
  let component: ImportXmlComponent;
  let fixture: ComponentFixture<ImportXmlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportXmlComponent]
    });
    fixture = TestBed.createComponent(ImportXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
