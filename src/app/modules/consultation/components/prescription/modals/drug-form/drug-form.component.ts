import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drug-form',
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

  submit_errors: any;
  is_saving: boolean = false;
  show_form: boolean = false;

  membership_types = [];

  prescriptionForm: FormGroup = new FormGroup({
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
    quantity_preparation: new FormControl<string| null>(null),
    instruction_quantity: new FormControl<number| null>(null)
  });

  get f(): { [key: string]: AbstractControl } {
    return this.prescriptionForm.controls;
  }

  closeModal(){
    this.toggleForm.emit();
  }

  onSubmit(){
    // console.log(this.prescriptionForm);

    if(this.prescriptionForm.valid){
      let query;
      if(this.selected_drug && this.selected_drug.id){
        query = this.http.update('medicine/prescriptions/', this.selected_drug.id, this.prescriptionForm.value);
      } else {
        query = this.http.post('medicine/prescriptions', this.prescriptionForm.value);
      }
      query.subscribe({
        next: (data: any) => {
          // console.log(data);
          this.toastr.success('Successfully added','Prescription');
          this.closeModal();
        },
        error: err => console.log(err)
      })
    }
  }

  // drug_uom: any;drug_regimen: any;drug_purpose: any;drug_frequency: any;drug_preparation: any;
  libraries = [
    {var_name: 'drug_uom', location: 'unit-of-measurements'},
    {var_name: 'drug_regimen', location: 'dose-regimens'},
    {var_name: 'drug_purpose', location: 'purposes'},
    {var_name: 'drug_frequency', location: 'duration-frequencies'},
    {var_name: 'drug_preparation', location: 'preparations'}
  ]

  loadLibraries(){
    this.libraries.forEach(obj => {
      this.http.get('libraries/'+obj.location).subscribe({
        next: (data: any) => {this[obj.var_name] = data.data; /* console.log(data.data) */},
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

  ngOnChanges(changes: SimpleChanges): void {
    let physician = this.consult_details.physician.id; //this.consult_details.physician
    this.prescriptionForm = this.formBuilder.nonNullable.group({
      patient_id: [this.consult_details.patient.id],
      prescribed_by: [physician,[Validators.required]],
      consult_id: [this.consult_details.id,[Validators.required]],
      prescription_date: [formatDate(this.consult_details.consult_date, 'yyyy-MM-dd', 'en'),[Validators.required]],
      konsulta_medicine_code: [null,[Validators.required]],
      added_medicine: [null,[Validators.required]],
      dosage_quantity: [null,[Validators.required]],
      dosage_uom: [null,[Validators.required]], //libraries/unit-of-measurement
      dose_regimen: [null,[Validators.required]], //libraries/dose-regimen
      medicine_purpose: [null,[Validators.required]], //
      purpose_other: [null,[Validators.required]], //libraries/purposes
      duration_intake: [null,[Validators.required]],
      duration_frequency: [null,[Validators.required]], //libraries/duration-frequencies
      quantity: [null,[Validators.required]],
      quantity_preparation: [null,[Validators.required]], //libraries/preparations
      instruction_quantity: [null,[Validators.required]]
    });

    if(this.selected_drug){
      // console.log(this.selected_drug)
      if(this.selected_drug.id) {
        this.prescriptionForm.patchValue({
          konsulta_medicine_code: this.selected_drug.konsulta_medicine ? this.selected_drug.konsulta_medicine.code : null,
          added_medicine: this.selected_drug.added_medicine ? this.selected_drug.added_medicine : null,
          dosage_quantity: this.selected_drug.dosage_quantity,
          dosage_uom: this.selected_drug.unit_of_measurement.code,
          dose_regimen: this.selected_drug.regimen.code,
          medicine_purpose: this.selected_drug.purpose.code,
          duration_intake: this.selected_drug.duration_intake,
          duration_frequency: this.selected_drug.frequency.code,
          quantity: this.selected_drug.quantity,
          quantity_preparation: this.selected_drug.preparation.code,
          instruction_quantity: this.selected_drug.instruction_quantity
        });

        // console.log(this.prescriptionForm.value)
        if(this.selected_drug.konsulta_medicine) {
          this.prescriptionForm.controls.added_medicine.disable();
        } else {
          this.add_drug = true;
          this.prescriptionForm.controls.added_medicine.enable();
          this.prescriptionForm.controls.konsulta_medicine_code.disable();
        }
        this.checkPurpose();
      } else {
        this.prescriptionForm.patchValue({ konsulta_medicine_code: this.selected_drug.code })
        this.prescriptionForm.controls.added_medicine.disable();
      }
    } else {
      this.add_drug = true;
      this.prescriptionForm.controls.konsulta_medicine_code.disable();
    }
  }
}
