import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalVisitComponent } from './legal-visit.component';

describe('LegalVisitComponent', () => {
  let component: LegalVisitComponent;
  let fixture: ComponentFixture<LegalVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
