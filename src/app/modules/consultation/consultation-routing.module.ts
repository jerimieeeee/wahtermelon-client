import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationComponent } from './consultation.component';

const routes: Routes = [{ path: '', component: ConsultationComponent
 },
 {
      path: 'medical-cert',
      loadComponent: () => import('../consultation/components/med-cert/med-cert.component').then(m => m.MedCertComponent)
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationRoutingModule { }
