import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-drug-form',
    imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
    templateUrl: './drug-form.component.html',
    styleUrls: ['./drug-form.component.scss']
})
export class DrugFormComponent implements OnChanges {
  @Output() toggleForm = new EventEmitter<any>();
  @Input() selected_drug;
  @Input() consult_details;
  @Input() drug_uom;
  @Input() drug_regimen;
  @Input() drug_purpose;
  @Input() drug_frequency;
  @Input() drug_preparation;
  @Input() drug_route;
  @Input() user_id;

  faCircleNotch = faCircleNotch;
  faSave = faSave;

  submit_errors: any;
  is_saving: boolean = false;
  show_form: boolean = false;

  membership_types = [];

  prescriptionForm: FormGroup = new FormGroup({
    brand_name: new FormControl<string| null>(null),
    medicine_name: new FormControl<string| null>(null),
    medicine_code: new FormControl<string| null>(null),

    patient_id: new FormControl<string| null>(null),
    prescribed_by: new FormControl<string| null>(null),
    consult_id: new FormControl<string| null>(null),
    prescription_date: new FormControl<string| null>(null),
    konsulta_medicine_code: new FormControl<string| null>(null),
    added_medicine: new FormControl<string| null>(null),
    dosage_quantity: new FormControl<number| null>(null),
    dosage_uom: new FormControl<string| null>(null),
    dose_regimen: new FormControl<string| null>(null),
    medicine_purpose: new FormControl<string| null>(null),
    purpose_other: new FormControl<string| null>(null),
    duration_intake: new FormControl<string| null>(null),
    duration_frequency: new FormControl<string| null>(null),
    quantity: new FormControl<number| null>(null),
    unit_price: new FormControl<number| null>(null),
    total_price: new FormControl<number| null>(null),
    quantity_preparation: new FormControl<string| null>(null),
    instruction_quantity: new FormControl<number| null>(null),
    medicine_route_code: new FormControl<string| null>(null),
    remarks: new FormControl<string | null>(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.prescriptionForm.controls;
  }

  computeTotalPrice() {
    console.log(this.prescriptionForm.value);
    let quantity = this.prescriptionForm.value.quantity ?? 0;
    let unit_price = this.prescriptionForm.value.unit_price ?? 0;
    let total_price = quantity * unit_price;
    this.prescriptionForm.patchValue({
      total_price: total_price
    });

    this.prescriptionForm.controls.total_price.disable();
  }

  closeModal(){
    this.toggleForm.emit();
  }

  is_loading: boolean = false;
  onSubmit(){
    this.is_loading = true;
    // console.log(this.prescriptionForm);

    if(this.prescriptionForm.valid){
      this.prescriptionForm.controls.total_price.enable();
      if(this.selected_drug.new_drug) {
        this.http.post('medicine/list', this.prescriptionForm.value).subscribe({
          next: (data: any) => {
            this.savePrescription();
          },
          error: err => {
            this.is_loading = false;
            this.http.showError(err.error.message, 'Medicine List')
          }
        });
      } else {
        this.is_loading = false;
        this.savePrescription();
      }
    }
  }

  savePrescription(){
    let query;
    if(this.selected_drug && this.selected_drug.id){
      query = this.http.update('medicine/prescriptions/', this.selected_drug.id, this.prescriptionForm.value);
    } else {
      query = this.http.post('medicine/prescriptions', this.prescriptionForm.value);
    }
    query.subscribe({
      next: (data: any) => {
        // console.log(data);
        this.is_loading = false;
        this.toastr.success('Successfully added','Prescription');
        this.closeModal();
      },
      error: err => {
        this.is_loading = false;
        this.http.showError(err.error.message, 'Prescription');
      }
    })
  }

  // drug_uom: any;drug_regimen: any;drug_purpose: any;drug_frequency: any;drug_preparation: any;
  libraries = [
    {var_name: 'drug_uom', location: 'unit-of-measurements'},
    {var_name: 'drug_regimen', location: 'dose-regimens'},
    {var_name: 'drug_purpose', location: 'purposes'},
    {var_name: 'drug_frequency', location: 'duration-frequencies'},
    {var_name: 'drug_preparation', location: 'preparations'},
    {var_name: 'drug_route', location: 'medicine-route'}
  ]

  loadLibraries(){
    this.libraries.forEach(obj => {
      this.http.get('libraries/'+obj.location).subscribe({
        next: (data: any) => {this[obj.var_name] = data.data;},
        error: err => console.log(err),
        complete: () => this.show_form = true
      })
    });
  }
  //end

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  checkPurpose(){
    if(this.prescriptionForm.value.medicine_purpose === '99') {
      this.prescriptionForm.controls.purpose_other.enable();
    } else {
      this.prescriptionForm.controls.purpose_other.disable();
    }
  }

  add_drug: boolean = false;

  patchValue(){
    this.prescriptionForm.patchValue({
      konsulta_medicine_code: this.selected_drug.konsulta_medicine ? this.selected_drug.konsulta_medicine.code : null,
      added_medicine: this.selected_drug.added_medicine ? this.selected_drug.added_medicine : null,
      dosage_quantity: this.selected_drug.dosage_quantity,
      dosage_uom: this.selected_drug.unit_of_measurement ? this.selected_drug.unit_of_measurement.code : null,
      dose_regimen: this.selected_drug.regimen ? this.selected_drug.regimen.code : null,
      medicine_purpose: this.selected_drug.purpose ? this.selected_drug.purpose.code : null,
      duration_intake: this.selected_drug.duration_intake,
      duration_frequency: this.selected_drug.frequency ? this.selected_drug.frequency.code : null,
      quantity: this.selected_drug.quantity,
      unit_price: this.selected_drug.unit_price,
      total_price: this.selected_drug.total_price,
      quantity_preparation: this.selected_drug.preparation ? this.selected_drug.preparation.code : null,
      instruction_quantity: this.selected_drug.instruction_quantity ?? 1,
      medicine_route_code: this.selected_drug.medicine_route ? this.selected_drug.medicine_route.code : null,
      remarks: this.selected_drug.remarks
    });

    if(this.selected_drug && this.selected_drug.new_drug) {
      this.prescriptionForm.patchValue({
        konsulta_medicine_code: this.selected_drug.code
      })
    }

    if(this.selected_drug.konsulta_medicine) {
      this.prescriptionForm.controls.added_medicine.disable();
    } else {
      if(this.selected_drug.added_medicine) {
        this.prescriptionForm.controls.added_medicine.enable();
        this.prescriptionForm.controls.konsulta_medicine_code.disable();
      }
    }
    this.computeTotalPrice();
    this.checkPurpose();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let physician = this.user_id;
    this.prescriptionForm = this.formBuilder.nonNullable.group({
      brand_name: [null],
      patient_id: [this.consult_details.patient.id],
      prescribed_by: [physician,[Validators.required]],
      consult_id: [this.consult_details.id,[Validators.required]],
      prescription_date: [formatDate(this.consult_details.consult_date, 'yyyy-MM-dd', 'en', 'Asia/Manila'),[Validators.required]],
      konsulta_medicine_code: [null,[Validators.required]],
      added_medicine: [null],
      dosage_quantity: [null,[Validators.required]],
      dosage_uom: [null,[Validators.required]], //libraries/unit-of-measurement
      dose_regimen: [null,[Validators.required]], //libraries/dose-regimen
      medicine_purpose: [null,[Validators.required]], //
      purpose_other: [null,[Validators.required]], //libraries/purposes
      duration_intake: [null,[Validators.required]],
      duration_frequency: [null,[Validators.required]], //libraries/duration-frequencies
      quantity: [null,[Validators.required]],
      unit_price: [null],
      total_price: [null],
      quantity_preparation: [null,[Validators.required]], //libraries/preparations
      instruction_quantity: [1],
      medicine_route_code: [null,[Validators.required]],
      remarks: [null]
    });

    // console.log(this.selected_drug)
    if(this.selected_drug){
      this.patchValue();
    } else {
      this.prescriptionForm.controls.konsulta_medicine_code.disable();
    }
  }
}
