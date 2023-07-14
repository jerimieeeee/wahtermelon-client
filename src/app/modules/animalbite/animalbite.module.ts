import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalbiteRoutingModule } from './animalbite-routing.module';
import { AnimalbiteComponent } from './animalbite.component';


@NgModule({
  declarations: [
    AnimalbiteComponent
  ],
  imports: [
    CommonModule,
    AnimalbiteRoutingModule
  ]
})
export class AnimalbiteModule { }
