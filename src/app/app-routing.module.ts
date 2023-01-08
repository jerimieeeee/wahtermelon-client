import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path:'',
    component: AppComponent
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
    path: 'edit-patient',
    loadChildren: () => import('./modules/patient-registration/patient-registration.module').then(m => m.PatientRegistrationModule)
  },
  {
    path: 'dental',
    loadChildren: () => import('./modules/dental/dental.module').then(m => m.DentalModule)
  },
  {
    path: 'lep',
    loadChildren: () => import('./modules/leprosy/leprosy.module').then(m => m.LeprosyModule)
  },
  {
    path: 'drug-list',
    loadChildren: () => import('./modules/drug-list/drug-list.module').then(m => m.DrugListModule)
  },
  {
    path: 'drug-list',
    loadChildren: () => import('./modules/drug-list/drug-list.module').then(m => m.DrugListModule)
  },
  {
    path: 'facility-config',
    loadChildren: () => import('./modules/facility-config/facility-config.module').then(m => m.FacilityConfigModule)
  },
  {
    path: 'cn',
    loadChildren: () => import('./modules/consultation/consultation.module').then(m => m.ConsultationModule)
  },
  {
    path: 'user-registration',
    loadChildren: () => import('./modules/user-registration/user-registration.module').then(m => m.UserRegistrationModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./modules/user/my-account/my-account.module').then(m => m.MyAccountModule)
  },
  {
    path: 'account-list',
    loadChildren: () => import('./modules/user/accounts/accounts.module').then(m => m.AccountsModule)
  },
  {
    path: 'households',
    loadChildren: () => import('./modules/households/households.module').then(m => m.HouseholdsModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./modules/verify/verify.module').then(m => m.VerifyModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./modules/user/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./modules/user/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'lab',
    loadChildren: () => import('./modules/lab/lab.module').then(m => m.LabModule)
  },
  {
    path: 'dispensing',
    loadChildren: () => import('./modules/drug-dispensing/drug-dispensing.module').then(m => m.DrugDispensingModule)
  },
  { path: 'modules/patient-info', loadChildren: () => import('./modules/patient-info/patient-info.module').then(m => m.PatientInfoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
