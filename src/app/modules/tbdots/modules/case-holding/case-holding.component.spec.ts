import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseHoldingComponent } from './case-holding.component';

describe('CaseHoldingComponent', () => {
  let component: CaseHoldingComponent;
  let fixture: ComponentFixture<CaseHoldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseHoldingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
