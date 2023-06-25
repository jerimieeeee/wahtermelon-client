import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseConferenceComponent } from './case-conference.component';

describe('CaseConferenceComponent', () => {
  let component: CaseConferenceComponent;
  let fixture: ComponentFixture<CaseConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseConferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
