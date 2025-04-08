import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { AddItemFormComponent } from './modals/add-item-form/add-item-form.component';
import { ItemListComponent } from './modals/item-list/item-list.component';

@Component({
  selector: 'app-supplies',
  imports: [CommonModule, FontAwesomeModule, AddItemFormComponent, ItemListComponent],
  templateUrl: './supplies.component.html',
  styleUrl: './supplies.component.scss'
})
export class SuppliesComponent implements OnChanges {
  @Output() loadConsult = new EventEmitter<any>();
  @Input() toggle_content;
  @Input() consult_details;
  @Input() with_credentials;
  @Input() allowed_to_edit;
  @Input() user_id;

  faEdit = faEdit;
  faTrashCan = faTrashCan;
  faAdd = faAdd;

  show_content: boolean = true;
  show_list: boolean = false;
  show_form: boolean = false;
  show_delete_form: boolean = false;
  show_actions: boolean = false;
  is_saving: boolean = false;
  consult_done: boolean = false;

  modals: any = [];
  prescriptions: any;

  onSubmit () {
    this.is_saving = true;

    this.http.post('', {}).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }
  selected_item: any;

  toggleModal(item) {
    console.log(item);
    if(item.data) {
      this.selected_item = item.data;
      this.modals[item.name] = !this.modals[item.name];
      if(item.name == 'item-list') this.modals['add-item'] = true;
      if(this.modals[item.name] === false) this.loadConsult.emit();
    } else {
      this.modals[item] = !this.modals[item];
      if(this.modals[item] === false) this.loadConsult.emit();
    }


  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.consult_details)
    this.show_content = this.toggle_content;

    if(this.consult_details.consult_done === false) this.show_actions = true;

    if(this.consult_details) {
      this.consult_done = this.consult_details.consult_done;
    }
  }
}
