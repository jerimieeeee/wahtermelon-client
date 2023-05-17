import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GbvRoutingModule } from './gbv-routing.module';
import { GbvComponent } from './gbv.component';
import { IntakeComponent } from './components/intake/intake.component';
import { InterviewComponent } from './components/interview/interview.component';
import { InterventionComponent } from './components/intervention/intervention.component';
import { MedicalComponent } from './components/medical/medical.component';
import { ReferralComponent } from './components/referral/referral.component';
import { FormsComponent } from './components/forms/forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyCompositionComponent } from './components/intake/modals/family-composition/family-composition.component';
import { AbuseActsComponent } from './components/interview/modals/abuse-acts/abuse-acts.component';
import { InteviewNotesComponent } from './components/interview/modals/inteview-notes/inteview-notes.component';
import { PerpetratorsComponent } from './components/interview/modals/perpetrators/perpetrators.component';
import { MedicalConsultComponent } from './components/intervention/modals/medical-consult/medical-consult.component';
import { HomeVisitComponent } from './components/intervention/modals/home-visit/home-visit.component';
import { PlacementComponent } from './components/intervention/modals/placement/placement.component';
import { SessionComponent } from './components/intervention/modals/session/session.component';
import { LegalCaseComponent } from './components/intervention/modals/legal-case/legal-case.component';
import { CaseConferenceComponent } from './components/intervention/modals/case-conference/case-conference.component';
import { ReferralModalComponent } from './components/referral/modals/referral-modal/referral-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TriageComponent } from './components/triage/triage.component';
import { CaseOutcomeComponent } from './modals/case-outcome/case-outcome.component';


@NgModule({
  declarations: [
    GbvComponent,
    IntakeComponent,
    InterviewComponent,
    InterventionComponent,
    MedicalComponent,
    ReferralComponent,
    FormsComponent,
    FamilyCompositionComponent,
    AbuseActsComponent,
    InteviewNotesComponent,
    PerpetratorsComponent,
    MedicalConsultComponent,
    HomeVisitComponent,
    PlacementComponent,
    SessionComponent,
    LegalCaseComponent,
    CaseConferenceComponent,
    ReferralModalComponent,
    TriageComponent,
    CaseOutcomeComponent
  ],
  imports: [
    CommonModule,
    GbvRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class GbvModule { }
