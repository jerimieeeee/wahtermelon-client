import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientInfoComponent } from './patient-info.component';

const routes: Routes = [
  {
    path: '',
    component: PatientInfoComponent,
    children: [
      {
        path: 'itr',
        loadChildren: () => import('../patient-itr/patient-itr.module').then(m => m.PatientItrModule)
      },
      {
        path: 'cn',
        loadChildren: () => import('../consultation/consultation.module').then(m => m.ConsultationModule)
      },
      {
        path: 'ncd',
        loadChildren: () => import('../ncd/ncd.module').then(m => m.NcdModule)
      },
      {
        path: 'mc',
        loadChildren: () => import('../maternalcare/maternalcare.module').then(m => m.MaternalcareModule)
      },
      {
        path: 'cc',
        loadChildren: () => import('../childcare/childcare.module').then(m => m.ChildcareModule)
      },
      {
        path: 'dispensing',
        loadChildren: () => import('../drug-dispensing/drug-dispensing.module').then(m => m.DrugDispensingModule)
      },
      {
        path: 'lab',
        loadChildren: () => import('../lab/lab.module').then(m => m.LabModule)
      },
      {
        path: 'tb',
        loadChildren: () => import('../tbdots/tbdots.module').then(m => m.TbdotsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientInfoRoutingModule { }
