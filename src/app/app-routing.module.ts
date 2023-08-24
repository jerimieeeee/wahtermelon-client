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
    path: 'verify',
    component: AppComponent
  },
  {
    path: 'fp',
    loadChildren: () => import('./modules/familyplanning/familyplanning.module').then(m => m.FamilyplanningModule)
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
    path: 'facility-config',
    loadChildren: () => import('./modules/facility-config/facility-config.module').then(m => m.FacilityConfigModule)
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
    path: 'patient',
    loadChildren: () => import('./modules/patient-info/patient-info.module').then(m => m.PatientInfoModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./modules/calendar-appointment/calendar-appointment.module').then(m => m.CalendarAppointmentModule)
  },
  {
    path: 'environmental',
    loadChildren: () => import('./modules/environmental/environmental.module').then(m => m.EnvironmentalModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
