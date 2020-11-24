import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: 'fp',
    loadChildren: () => import('./modules/familyplanning/familyplanning.module').then(m => m.FamilyplanningModule)
  },
  {
    path: 'cc',
    loadChildren: () => import('./modules/childcare/childcare.module').then(m => m.ChildcareModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
