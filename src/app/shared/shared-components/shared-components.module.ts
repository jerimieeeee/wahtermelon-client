import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientItrComponent } from 'app/modules/patient-itr/patient-itr.component';
import { PatientInfoComponent } from 'app/components/patient-info/patient-info.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    PatientItrComponent,
    PatientInfoComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgApexchartsModule
  ],
  exports: [
    PatientItrComponent,
    PatientInfoComponent
  ]
})
export class SharedComponentsModule { }
