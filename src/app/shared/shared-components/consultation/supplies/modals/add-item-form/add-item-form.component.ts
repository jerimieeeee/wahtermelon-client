import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-item-form',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.scss'
})
export class AddItemFormComponent implements OnInit {
  @Output() toggleSupplyModal = new EventEmitter<any>();
  @Input() selected_item;

  itemForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    added_item: new FormControl<string| null>(null),
    item_list_id: new FormControl<string| null>(null),
    quantity: new FormControl<number| null>(null),
    unit_price: new FormControl<number| null>(null),
    total_price: new FormControl<number| null>(null),
  });

  showAlert: boolean = false;
  is_saving: boolean = false;

  submit_errors: any;
  membership_types: any;

  required_message = "this is required";

  onSubmit() {
    this.is_saving = true;
    this.itemForm.controls['total_price'].enable();
    if(this.selected_item.added_item) this.itemForm.patchValue({added_item: this.itemForm.value.item_name});

    this.http.post('consultation/item-supplies', this.itemForm.value).subscribe({
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
    this.itemForm.controls['total_price'].disable();

    if(this.selected_item && (this.selected_item.consult_id)) {
      this.patchToEdit(this.selected_item);
    } else {
      this.itemForm.patchValue({
        item_list_id: this.selected_item.id,
        item_name: this.selected_item.libItemClaim ? this.selected_item.libItemClaim.item_name : this.selected_item.added_item,
        quantity: this.selected_item.quantity,
        unit_price: this.selected_item.unit_price
      });

      this
      this.computeTotalPrice();
    }

    console.log(this.itemForm.value)
  }

  computeTotalPrice() {
    const quantity = this.itemForm.value['quantity'] || 0;
    const unitPrice = this.itemForm.value['unit_price'] || 0;
    const totalPrice = parseFloat((quantity * unitPrice).toFixed(2));

    this.itemForm.patchValue({
      total_price: totalPrice
    });
  }

  patchToEdit(data) {
    this.itemForm.patchValue({
      id: data.id,
      added_item: data.added_item,
      item_list_id: data.item_list_id,
      item_name: data.item_list.lib_item_claim ? data.item_list.lib_item_claim.item_name : data.added_item,
      quantity: data.quantity,
      unit_price: data.unit_price,
      total_price: data.total_price,
    });

    /* if(!data.libItemClaim) {
      this.itemForm.controls['item_name'].enable();
    } */
  }

  createForm(){
    this.itemForm = this.formBuilder.group({
      id: [null],
      item_list_id: [null],
      added_item: [null],
      patient_id: [this.patient_id],
      consult_id: [this.consult_id],
      item_name: [null, Validators.required],
      quantity: [null, Validators.required],
      unit_price: [null, Validators.required],
      total_price: [null, Validators.required],
    });

    this.loadSelected();
  }

  closeModal() {
    this.toggleSupplyModal.emit('add-item');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  patient_id!: string;
  consult_id!: string;
  ngOnInit(): void {
    this.patient_id = this.http.getUrlParams().patient_id;
    this.consult_id = this.http.getUrlParams().consult_id;

    console.log(this.selected_item);
    this.is_loading = true;

    this.createForm();
  }
}
