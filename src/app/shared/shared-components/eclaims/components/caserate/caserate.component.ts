import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as angularFontawesome from '@fortawesome/angular-fontawesome';
import { SearchCaserateComponent } from './modals/search-caserate/search-caserate.component';

@Component({
  selector: 'app-caserate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, angularFontawesome.FontAwesomeModule, SearchCaserateComponent],
  templateUrl: './caserate.component.html',
  styleUrls: ['./caserate.component.scss']
})
export class CaserateComponent implements OnInit {
  @Input() consult_details;
  @Input() program_details;
  @Input() patient_id;

  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faSearch = faSearch;

  is_saving: boolean = false;

  modals: any = [];

  toggleModal(name) {
    this.modals[name] = !this.modals[name];
  }

  caserateForm: FormGroup =  new FormGroup({
    patient_id: new FormControl<string|null>(''),
    program_desc: new FormControl<string|null>(''),
    program_id: new FormControl<string|null>(''),
    caserate_date: new FormControl<string|null>(''),
    admit_dx: new FormControl<string|null>(''),
    caserate_code: new FormControl<string|null>(''),
    code: new FormControl<string|null>(''),
    description: new FormControl<string|null>(''),
    hci_fee: new FormControl<number|null>(null),
    prof_fee: new FormControl<number|null>(null),
    caserate_fee: new FormControl<number|null>(null),
    caserate_attendant: new FormControl<string|null>(null),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.caserateForm.controls;
  }

  onSubmit() {
    this.is_saving = true;
  }

  createForm(){
    this.caserateForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_id],
      program_desc: [this.program_details],
      program_id: [this.program_details.id],
      caserate_date: [null, Validators.required],
      admit_dx: [null, Validators.required],
      caserate_code: [null, Validators.required],
      code: [null, Validators.required],
      description: [null, Validators.required],
      hci_fee: [null, Validators.required],
      prof_fee: [null, Validators.required],
      caserate_fee: [null, Validators.required],
      caserate_attendant: [null, Validators.required]
    });
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log('test');
  }
}
