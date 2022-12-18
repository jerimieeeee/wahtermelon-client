import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drug-form',
  templateUrl: './drug-form.component.html',
  styleUrls: ['./drug-form.component.scss']
})
export class DrugFormComponent implements OnInit {
  @Output() toggleForm = new EventEmitter<any>();
  @Input() selected_drug;
  @Input() consult_details;

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
    quantity_preparation: new FormControl<string| null>(null)
  });

  get f(): { [key: string]: AbstractControl } {
    return this.prescriptionForm.controls;
  }

  closeModal(){
    this.toggleForm.emit();
  }

  onSubmit(){
    console.log(this.prescriptionForm);

    if(this.prescriptionForm.valid){
      let query;
      if(this.selected_drug.id){
        query = this.http.update('medicine/prescriptions/', this.selected_drug.id, this.prescriptionForm.value);
      } else {
        query = this.http.post('medicine/prescriptions', this.prescriptionForm.value);
      }
      query.subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success('Successfully added','Prescription');
        },
        error: err => console.log(err)
      })
    }
  }

  drug_uom: any;drug_regimen: any;drug_purpose: any;drug_frequency: any;drug_preparation: any;
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
        next: (data: any) => this[obj.var_name] = data.data,
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

  ngOnInit(): void {
    this.loadLibraries();
    console.log(this.selected_drug);
    console.log(this.consult_details);

    let physician = this.http.getUserID(); //this.consult_details.physician
    this.prescriptionForm = this.formBuilder.nonNullable.group({
      patient_id: [this.consult_details.patient.id],
      prescribed_by: [physician,[Validators.required]],
      consult_id: [this.consult_details.id,[Validators.required]],
      prescription_date: [formatDate(this.consult_details.consult_date, 'yyyy-MM-dd', 'en'),[Validators.required]],
      konsulta_medicine_code: [this.selected_drug.code,[Validators.required]],
      added_medicine: ['',[Validators.required]],
      dosage_quantity: ['',[Validators.required]],
      dosage_uom: ['',[Validators.required]], //libraries/unit-of-measurement
      dose_regimen: ['',[Validators.required]], //libraries/dose-regimen
      medicine_purpose: ['',[Validators.required]], //
      purpose_other: ['',[Validators.required]], //libraries/purposes
      duration_intake: ['',[Validators.required]],
      duration_frequency: ['',[Validators.required]], //libraries/duration-frequencies
      quantity: [null,[Validators.required]],
      quantity_preparation: ['',[Validators.required]] //libraries/preparations
    });

    if(this.selected_drug.code) this.prescriptionForm.controls.added_medicine.disable();

    if(this.selected_drug.id) {
      this.prescriptionForm.patchValue({...this.selected_drug});
      this.prescriptionForm.controls.added_medicine.disable();
      this.checkPurpose();

      if(this.selected_drug.dossage_quantity) {
        this.prescriptionForm.patchValue({dosage_quantity: this.selected_drug.dossage_quantity});
      }
    }
  }
}
