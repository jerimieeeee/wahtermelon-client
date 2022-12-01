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
  @Input() module;
  @Output() modalStats = new EventEmitter<boolean>();

  today: Date;
  // modal = false;
  modal: boolean;

  constructor(private http: HttpService, private formBuilder: FormBuilder) { }

  faTimes = faTimes;
  faSave = faSave;
  faInfoCircle = faInfoCircle;
  user_id: any
  facility_code: any

  public serviceChanges = [];
  public service_array = [];

  ngOnInit() {
    this.user_id = this.http.getUserID();
    this.facility_code = this.http.getUserFacility();
    console.log(this.visit_type);
    this.createForm()
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);
    this.serviceChanges.push(this.services_form.value);

    console.log(this.serviceChanges, " this are my init changes");


    this.today = new Date();
    this.modal = false;
  }
  saveForm(value: any) {

    this.serviceChanges.forEach(s => {
      if (s.service_id != "") {
        console.log(this.serviceChanges.map(z => z.service_id).indexOf(s.service_id), " logging index of with id")
        console.log("commiting to save ", s);
      }
    })
  }

  createForm() {
    this.services_form = this.formBuilder.group({
      facility_code: [this.facility_code],
      patient_id: [this.patient_details.id],
      user_id: [this.user_id],
      service_id: [''],
      service_date: [new Date().toISOString().substring(0, 10), [Validators.required]],
      visit_type_code: ['', [Validators.required]],
      visit_status: [this.module == 3?'Prenatal':(this.module == 4?'Postpartum':'Services')],
      service_qty: [''],
      positive_result: [false],
      intake_penicillin: [false],
    })

    console.log(this.services_form, " service form");

  }
  onChange(desc, id, i, item) {
    this.serviceChanges[i] = {
      facility_code: this.facility_code,
      patient_id: this.patient_details.id,
      user_id: this.user_id,
      visit_type_code: item == 'visit_type_code' ? this.services_form.value[item] : this.serviceChanges[i].visit_type_code,
      visit_status: this.services_form.value.visit_status,
      intake_penicillin: item == 'intake_penicillin' ? this.services_form.value[item] : this.serviceChanges[i].intake_penicillin,
      positive_result: item == 'positive_result' ? this.services_form.value[item] : this.serviceChanges[i].positive_result,
      service_date: this.services_form.value.service_date,
      service_qty: item == 'service_qty' ? this.services_form.value[item] : this.serviceChanges[i].service_qty,
      service_id: id,
    };

    console.log(this.serviceChanges, " these are the changes with the description: ", desc);

  }
  openModal() {
    console.log("opening modal");

    this.modal = !this.modal;
    this.modalStats.emit(this.modal);
  }
}
