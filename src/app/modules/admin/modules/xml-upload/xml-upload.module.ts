import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XmlUploadRoutingModule } from './xml-upload-routing.module';
import { XmlUploadComponent } from './xml-upload.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UploadedXmlComponent } from './modals/uploaded-xml/uploaded-xml.component';
import { UploadedListComponent } from './modals/uploaded-list/uploaded-list.component';


@NgModule({
  declarations: [
    XmlUploadComponent,
    UploadedXmlComponent,
    UploadedListComponent
  ],
  imports: [
    CommonModule,
    XmlUploadRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class XmlUploadModule { }
