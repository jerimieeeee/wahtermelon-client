import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalCaseComponent } from './legal-case.component';

describe('LegalCaseComponent', () => {
  let component: LegalCaseComponent;
  let fixture: ComponentFixture<LegalCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
