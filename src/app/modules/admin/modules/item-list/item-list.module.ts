import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemListRoutingModule } from './item-list-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteItemComponent } from 'app/shared/shared-modals/delete-item/delete-item.component';
import { ItemListComponent } from './item-list.component';
import { ItemFormComponent } from './modals/item-form/item-form.component';
import { LibItemListComponent } from './modals/lib-item-list/lib-item-list.component';


@NgModule({
  declarations: [
    ItemListComponent
  ],
  imports: [
    CommonModule,
    ItemListRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    DeleteItemComponent,
    LibItemListComponent,
    ItemFormComponent
  ]
})
export class ItemListModule { }
