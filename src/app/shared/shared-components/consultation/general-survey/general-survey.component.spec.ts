import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSurveyComponent } from './general-survey.component';

describe('GeneralSurveyComponent', () => {
  let component: GeneralSurveyComponent;
  let fixture: ComponentFixture<GeneralSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeneralSurveyComponent]
    });
    fixture = TestBed.createComponent(GeneralSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
