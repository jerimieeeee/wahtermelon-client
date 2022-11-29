import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
// import { AnyNaptrRecord } from 'd/ns';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faClose, faInfoCircle, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  focused: boolean;

  services_form: FormGroup = new FormGroup({
    service_date: new FormControl<string | null>(''),
    service_qty: new FormControl<string | null>(''),
    intake_penicillin: new FormControl<string | null>(''),
    positive_result: new FormControl<string | null>(''),
  });

  @Input() lib_services;
  @Input() visit_type;
  @Input() patient_details;

  @Output() modalStats  = new EventEmitter<boolean>();

  today: Date;
  // modal = false;
  modal: boolean;

  constructor(private http: HttpService, private formBuilder: FormBuilder) { }
  faTimes = faTimes;
  faSave = faSave;
  faInfoCircle = faInfoCircle;

  ngOnInit() {
    console.log(this.visit_type);
    this.createForm()
    this.today = new Date();
    this.modal = false;
  }
  saveForm(value: any) {

  }

  createForm() {

    let user_id = localStorage.getItem('user_id');
    let facility_code = localStorage.getItem('facility_code');

    this.services_form = this.formBuilder.group({
      facility_code: [facility_code],
      patient_id: [this.patient_details.id],
      user_id: [user_id],
      service_date: [new Date().toISOString().substring(0, 10), [Validators.required]],
      visit_type_code: ['', [Validators.required]],
      visit_status: [''],
      service_qty: [''],
      positive_result: [''],
      intake_penicillin: [''],
    })
  }

  openModal(){
    console.log("opening modal");
    
    this.modal = !this.modal;
    this.modalStats.emit(this.modal);
  }
}
