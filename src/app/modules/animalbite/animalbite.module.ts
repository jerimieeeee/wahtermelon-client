import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalbiteRoutingModule } from './animalbite-routing.module';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { AnimalbiteComponent } from './animalbite.component';
import { PreExposureComponent } from './components/pre-exposure/pre-exposure.component';
import { ExposureComponent } from './components/exposure/exposure.component';
import { PostExposureComponent } from './components/post-exposure/post-exposure.component';
import { HumanRabiesComponent } from './components/human-rabies/human-rabies.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [AnimalbiteComponent, PreExposureComponent, ExposureComponent, PostExposureComponent, HumanRabiesComponent],
  imports: [
    CommonModule,
    AnimalbiteRoutingModule,SharedComponentsModule,FontAwesomeModule,
  ]
})
export class AnimalbiteModule { }
