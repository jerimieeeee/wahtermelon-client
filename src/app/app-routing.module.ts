import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'fp',
    loadChildren: () => import('./modules/familyplanning/familyplanning.module').then(m => m.FamilyplanningModule)
  },
  {
    path: 'cc',
    loadChildren: () => import('./modules/childcare/childcare.module').then(m => m.ChildcareModule)
  },
  {
    path: 'itr',
    loadChildren: () => import('./modules/patient-itr/patient-itr.module').then(m => m.PatientItrModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/patient-registration/patient-registration.module').then(m => m.PatientRegistrationModule)
  },
  {
    path: 'dental',
    loadChildren: () => import('./modules/dental/dental.module').then(m => m.DentalModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
