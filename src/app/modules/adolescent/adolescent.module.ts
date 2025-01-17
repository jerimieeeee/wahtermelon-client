import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdolescentRoutingModule } from './adolescent-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdolescentComponent } from './adolescent.component';
import { RapidHeeadsssComponent } from './modules/rapid-heeadsss/rapid-heeadsss.component';
import { HomeComponent } from './modules/comprehensive-heeadsss/home/home.component';
import { EatingComponent } from './modules/comprehensive-heeadsss/eating/eating.component';
import { EducationComponent } from './modules/comprehensive-heeadsss/education/education.component';
import { ActivitiesComponent } from './modules/comprehensive-heeadsss/activities/activities.component';
import { DrugsComponent } from './modules/comprehensive-heeadsss/drugs/drugs.component';
import { SexualityComponent } from './modules/comprehensive-heeadsss/sexuality/sexuality.component';
import { SuicideDepressionComponent } from './modules/comprehensive-heeadsss/suicide-depression/suicide-depression.component';
import { SafetyComponent } from './modules/comprehensive-heeadsss/safety/safety.component';
import { SpiritualityComponent } from './modules/comprehensive-heeadsss/spirituality/spirituality.component';
import { AssessmentSummaryComponent } from './modules/assessment-summary/assessment-summary.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';




@NgModule({
  declarations: [
    AdolescentComponent,
    RapidHeeadsssComponent,
    AssessmentSummaryComponent,
    HomeComponent,
    EatingComponent,
    EducationComponent,
    ActivitiesComponent,
    DrugsComponent,
    SexualityComponent,
    SuicideDepressionComponent,
    SafetyComponent,
    SpiritualityComponent

  ],
  imports: [
    CommonModule, AdolescentRoutingModule,FontAwesomeModule, FormsModule, ReactiveFormsModule, EndVisitComponent
  ]
})
export class AdolescentModule { }
