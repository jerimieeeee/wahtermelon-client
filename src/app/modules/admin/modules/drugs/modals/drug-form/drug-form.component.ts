import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-drug-form',
  templateUrl: './drug-form.component.html',
  styleUrls: ['./drug-form.component.scss']
})
export class DrugFormComponent implements OnInit {
  @Output() showEdit = new EventEmitter<any>();
  @Input() selected_drug;

  drugForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    brand_name: new FormControl<string| null>(null),
    medicine_name: new FormControl<string| null>(null),
    medicine_code: new FormControl<string| null>(null),
    konsulta_medicine_code: new FormControl<string| null>(null),
    added_medicine: new FormControl<string| null>(null),

    dosage_quantity: new FormControl<number| null>(null),
    dosage_uom: new FormControl<string| null>(null),
    dose_regimen: new FormControl<string| null>(null),
    medicine_purpose: new FormControl<string| null>(null),
    duration_intake: new FormControl<number| null>(null),
    duration_frequency: new FormControl<string| null>(null),
    quantity_preparation: new FormControl<string| null>(null),
    medicine_route_code: new FormControl<string| null>(null),
    purpose_other: new FormControl<string| null>(null),
    quantity: new FormControl<string| null>(null),
    instruction_quantity: new FormControl<number| null>(null)
  });

  showAlert: boolean = false;
  is_saving: boolean = false;

  submit_errors: any;
  membership_types: any;

  required_message = "this is required";

  onSubmit() {
    this.is_saving = true;

    if(this.drugForm.valid) {
      let query;

      if(!this.drugForm.value.konsulta_medicine_code) this.drugForm.patchValue({added_medicine: this.drugForm.value.medicine_name})

      if(this.drugForm.value.id) {
        query = this.http.update('medicine/list/', this.drugForm.value.id, this.drugForm.value);
      } else {
        query = this.http.post('medicine/list', this.drugForm.value);
      }

      query.subscribe({
        next: (data: any) => {
          this.toastr.success('Recorded successfully!', 'Drug List');
          this.closeModal();
        },
        error: err => {
          this.http.showError(err.error.message, 'Drug List')
        }
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.drugForm.controls;
  }

  is_loading: boolean = false;

  drug_uom: any;
  drug_regimen: any;
  drug_purpose: any;
  drug_frequency: any;
  drug_preparation: any;
  drug_route: any;

  loadMainLibrary(){
    const getUom = this.http.get('libraries/unit-of-measurements');
    const getRegimen = this.http.get('libraries/dose-regimens');
    const getPurpose = this.http.get('libraries/purposes');
    const getFrequency = this.http.get('libraries/duration-frequencies');
    const getPreparation = this.http.get('libraries/preparations');
    const getRoute = this.http.get('libraries/medicine-route');

    forkJoin([getUom, getRegimen, getPurpose, getFrequency, getPreparation, getRoute]).subscribe({
      next: ([dataUom, dataRegimen, dataPurpose, dataFrequency, dataPreparation, dataRoute]: any) => {
        this.drug_uom = dataUom.data;
        this.drug_regimen = dataRegimen.data;
        this.drug_purpose = dataPurpose.data;
        this.drug_frequency = dataFrequency.data;
        this.drug_preparation = dataPreparation.data;
        this.drug_route = dataRoute.data;

        this.is_loading = false;
      },
      error: err => console.log(err)
    });
  }

  loadSelected(){
    // console.log(this.selected_drug);

    if(this.selected_drug && this.selected_drug.id) {
      this.patchToEdit(this.selected_drug);
    } else {
      if(this.selected_drug != null) {
        this.drugForm.patchValue({
          konsulta_medicine_code: this.selected_drug.code ?? null,
          medicine_name: this.selected_drug.generic_desc
        });
      }
    }
  }

  patchToEdit(data) {
    this.drugForm.patchValue({...data});
    this.drugForm.patchValue({
      dosage_uom: data.unit_of_measurement.code,
      dose_regimen: data.regimen.code,
      duration_frequency: data.frequency.code,
      konsulta_medicine_code: data.konsulta_medicine.code,
      medicine_name: data.konsulta_medicine.generic.desc,
      medicine_purpose: data.purpose.code,
      medicine_route_code: data.medicine_route.code,
      quantity_preparation: data.preparation.code
    })
    // console.log(this.drugForm.value);
  }

  createForm(){
    this.drugForm = this.formBuilder.group({
      id: [null],
      brand_name: [null, Validators.required],
      medicine_name: [null, Validators.required],
      medicine_code: [null],
      konsulta_medicine_code: [null],
      added_medicine: [null],

      dosage_quantity: [null, Validators.required],
      dosage_uom: [null, Validators.required],
      dose_regimen: [null, Validators.required],
      medicine_purpose: [null, Validators.required],
      purpose_other: [null],
      duration_intake: [null, Validators.required],
      duration_frequency: [null, Validators.required],
      quantity: [null],
      quantity_preparation: [null, Validators.required],
      medicine_route_code: [null, Validators.required],
      instruction_quantity: [1],
    });

    this.loadSelected();
  }

  closeModal() {
    this.showEdit.emit();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.is_loading = true;
    this.loadMainLibrary();

    let user_id = this.http.getUserID();
    let facility_code = this.http.getUserFacility();

    this.createForm();
  }
}
