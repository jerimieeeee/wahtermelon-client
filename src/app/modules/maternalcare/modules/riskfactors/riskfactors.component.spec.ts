import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskfactorsComponent } from './riskfactors.component';

describe('RiskfactorsComponent', () => {
  let component: RiskfactorsComponent;
  let fixture: ComponentFixture<RiskfactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskfactorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskfactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
