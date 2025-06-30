import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentalHealthRoutingModule } from './mental-health-routing.module';
import { MentalHealthComponent } from './mental-health.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComplaintHistoryComponent } from 'app/shared/shared-components/consultation/complaint-history/complaint-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrescriptionComponent } from 'app/shared/shared-components/consultation/prescription/prescription.component';
import { FinalDxComponent } from 'app/shared/shared-components/consultation/final-dx/final-dx.component';
import { SuppliesComponent } from 'app/shared/shared-components/consultation/supplies/supplies.component';
import { CaserateComponent } from 'app/shared/shared-components/eclaims/components/caserate/caserate.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    MentalHealthComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    MentalHealthRoutingModule,
    EndVisitComponent,
    SharedComponentsModule,
    FontAwesomeModule,
    ComplaintHistoryComponent,
    ReactiveFormsModule,
    PrescriptionComponent,
    FinalDxComponent,
    CaserateComponent,
    SuppliesComponent,
    ToastrModule
  ]
})
export class MentalHealthModule { }
