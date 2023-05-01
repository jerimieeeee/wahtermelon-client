import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-drug-form',
  templateUrl: './drug-form.component.html',
  styleUrls: ['./drug-form.component.scss']
})
export class DrugFormComponent implements OnInit {
  @Output() showEdit = new EventEmitter<any>();

  drugForm: FormGroup = new FormGroup({
    brand_name: new FormControl<string| null>(''),
    generic_name: new FormControl<string| null>(''),
    dosage: new FormControl<string| null>(''),
    dosage_unit: new FormControl<string| null>(''),
    dosage_regimen: new FormControl<string| null>(''),
    duration: new FormControl<string| null>(''),
    duration_frequency: new FormControl<string| null>(''),
    medicine_purpose: new FormControl<string| null>('')
  });

  showAlert: boolean = false;
  is_saving: boolean = false;

  submit_errors: any;
  membership_types: any;

  required_message = "this is required";

  onSubmit() {
    this.is_saving = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.drugForm.controls;
  }

  loadMainLibrary(){
    this.http.get('libraries/membership-types').subscribe({
      next: (data: any) => this.membership_types = data.data,
      error: err => console.log(err)
    });
  }

  closeModal() {
    this.showEdit.emit();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
  ) { }

  ngOnInit(): void {
    this.loadMainLibrary();

    let user_id = this.http.getUserID();
    let facility_code = this.http.getUserFacility();

    this.drugForm = this.formBuilder.group({
      brand_name: [null, Validators.required],
      generic_name: [null, Validators.required],
      dosage: [null, Validators.required],
      dosage_unit: [null, Validators.required],
      dosage_regimen: [null, Validators.required],
      duration: [null, Validators.required],
      duration_frequency: [null, Validators.required],
      medicine_purpose: [null, Validators.required],
    });
  }
}
