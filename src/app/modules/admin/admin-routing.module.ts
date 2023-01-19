import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'drugs',
        loadChildren: () => import('./modules/drugs/drugs.module').then(m => m.DrugsModule)
      },
      {
        path: 'facility-config',
        loadChildren: () => import('./modules/facility-config/facility-config.module').then(m => m.FacilityConfigModule)
      },
      {
        path: 'eclaims',
        loadChildren: () => import('./modules/eclaims/eclaims.module').then(m => m.EclaimsModule)
      },
      {
        path: 'lab-config',
        loadChildren: () => import('./modules/lab-config/lab-config.module').then(m => m.LabConfigModule)
      },
      {
        path: 'facility-accred',
        loadChildren: () => import('./modules/facilit-accred/facilit-accred.module').then(m => m.FacilitAccredModule)
      },
      {
        path: 'survey',
        loadChildren: () => import('./modules/survey/survey.module').then(m => m.SurveyModule)
      },
      {
        path: 'sms',
        loadChildren: () => import('./modules/sms/sms.module').then(m => m.SmsModule)
      },
      {
        path: 'account-list',
        loadChildren: () => import('./modules/account-list/account-list.module').then(m => m.AccountListModule)
      },
      {
        path: 'konsulta',
        loadChildren: () => import('./modules/konsulta/konsulta.module').then(m => m.KonsultaModule)
      },
      {
        path: 'konsulta-masterlist',
        loadChildren: () => import('./modules/konsulta-masterlist/konsulta-masterlist.module').then(m => m.KonsultaMasterlistModule)
      },
      {
        path: 'xml-upload',
        loadChildren: () => import('./modules/xml-upload/xml-upload.module').then(m => m.XmlUploadModule)
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
