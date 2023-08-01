import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalbiteRoutingModule } from './animalbite-routing.module';
import { AnimalbiteComponent } from './animalbite.component';
import { EndVisitComponent } from 'app/shared/shared-modals/end-visit/end-visit.component';
import { SharedComponentsModule } from 'app/shared/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AnimalbiteComponent
  ],
  imports: [
    CommonModule,
    AnimalbiteRoutingModule,
    EndVisitComponent,
    SharedComponentsModule,
    FontAwesomeModule
  ]
})
export class AnimalbiteModule { }
