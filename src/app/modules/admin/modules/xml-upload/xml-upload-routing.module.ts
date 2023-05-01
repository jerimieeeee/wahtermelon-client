import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XmlUploadComponent } from './xml-upload.component';

const routes: Routes = [{ path: '', component: XmlUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XmlUploadRoutingModule { }
