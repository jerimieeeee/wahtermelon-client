import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support.component';

const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
    children: [
      {
        path: 'ticketing',
        loadChildren: () => import('./module/ticketing/ticketing.module').then(m => m.TicketingModule)
      },
      {
        path: 'manual',
        loadChildren: () => import('./module/manual/manual.module').then(m => m.ManualModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
