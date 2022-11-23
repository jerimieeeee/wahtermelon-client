import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasefindingsComponent } from './casefindings.component';

describe('CasefindingsComponent', () => {
  let component: CasefindingsComponent;
  let fixture: ComponentFixture<CasefindingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasefindingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasefindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
