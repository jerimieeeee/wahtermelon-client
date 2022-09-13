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
    path: 'mc',
    loadChildren: () => import('./modules/maternalcare/maternalcare.module').then(m => m.MaternalcareModule)
  },
  {
    path: 'cc',
    loadChildren: () => import('./modules/childcare/childcare.module').then(m => m.ChildcareModule)
  },
  {
    path: 'tb',
    loadChildren: () => import('./modules/tbdots/tbdots.module').then(m => m.TbdotsModule)
  },
  {
    path: 'ncd',
    loadChildren: () => import('./modules/ncd/ncd.module').then(m => m.NcdModule)
  },
  {
    path: 'ab',
    loadChildren: () => import('./modules/animalbite/animalbite.module').then(m => m.AnimalbiteModule)
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
    loadChildren: () => import('./modules/dental/dental.module').then(m => m.DentalModule) 
  },
  {
    path: 'lep',
    loadChildren: () => import('./modules/leprosy/leprosy.module').then(m => m.LeprosyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
