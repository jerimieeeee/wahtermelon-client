import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-item-form',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_item;

  itemForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    added_item: new FormControl<string| null>(null),
    lib_item_id: new FormControl<string| null>(null),
    category: new FormControl<string| null>(null),
    item_name: new FormControl<string| null>(null),
    quantity: new FormControl<number| null>(null),
    unit_price: new FormControl<number| null>(null),
  });

  showAlert: boolean = false;
  is_saving: boolean = false;

  submit_errors: any;
  membership_types: any;

  required_message = "this is required";

  onSubmit() {
    this.is_saving = true;

    if(this.selected_item.added_item) this.itemForm.patchValue({added_item: this.itemForm.value.item_name});

    this.http.post('item-lists/item-list', this.itemForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Recorded successfully!', 'Drug List');
        this.closeModal();
      },
      error: err => {
        this.http.showError(err.error.message, 'Drug List')
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.itemForm.controls;
  }

  is_loading: boolean = false;

  loadSelected(){
    console.log(this.selected_item);
    this.itemForm.controls['item_name'].disable();

    if(this.selected_item && (this.selected_item.facility_code)) {
      this.patchToEdit(this.selected_item);
    } else if (this.selected_item && this.selected_item.added_item) {
      this.itemForm.patchValue({
        added_item: this.selected_item.added_item,
        item_name: this.selected_item.added_item,
        category: 'OTHERS',
      });

      this.itemForm.controls['item_name'].enable();
    } else {
      if(this.selected_item != null) {
        this.itemForm.patchValue({
          lib_item_id: this.selected_item.id,
          item_name: this.selected_item.item_name,
          category: this.selected_item.category,
        });
      }
    }

    console.log(this.itemForm.value)
  }

  patchToEdit(data) {
    this.itemForm.patchValue({
      id: data.id,
      added_item: data.libItemClaim ? null : data.added_item,
      lib_item_id: data.lib_item_id,
      item_name: data.libItemClaim ? data.libItemClaim.item_name : data.added_item,
      category: data.libItemClaim ? data.libItemClaim.category : 'OTHERS',
      quantity: data.quantity,
      unit_price: data.unit_price,
    });

    if(!data.libItemClaim) {
      this.itemForm.controls['item_name'].enable();
    }
  }

  createForm(){
    this.itemForm = this.formBuilder.group({
      id: [null],
      lib_item_id: [null],
      added_item: [null],
      category: [null, Validators.required],
      item_name: [null, Validators.required],
      quantity: [null, Validators.required],
      unit_price: [null, Validators.required]
    });

    this.loadSelected();
  }

  closeModal() {
    this.toggleModal.emit('item-list');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.selected_item);
    this.is_loading = true;

    this.createForm();
  }
}
