import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FormsModule } from '@angular/forms';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';


@NgModule({
  declarations: [
    FeedbackComponent,
    SurveyFormComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule
  ]
})
export class FeedbackModule { }
