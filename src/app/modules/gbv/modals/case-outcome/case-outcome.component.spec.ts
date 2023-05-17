import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseOutcomeComponent } from './case-outcome.component';

describe('CaseOutcomeComponent', () => {
  let component: CaseOutcomeComponent;
  let fixture: ComponentFixture<CaseOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
