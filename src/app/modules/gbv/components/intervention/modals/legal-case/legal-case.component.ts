import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-legal-case',
  templateUrl: './legal-case.component.html',
  styleUrls: ['./legal-case.component.scss']
})
export class LegalCaseComponent implements OnInit, OnChanges {
  @Output() toggleModal = new EventEmitter<any>();

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  homeVisitForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),
    complaint_filed_flag: new FormControl<string| null>(null),
    filed_by_name: new FormControl<string| null>(null),
    filed_by_relation_id: new FormControl<string| null>(null),
    filed_location_id: new FormControl<string| null>(null),
    filed_location_remarks: new FormControl<string| null>(null),
    case_initiated_flag: new FormControl<string| null>(null),
    judge_name: new FormControl<string| null>(null),
    court_name: new FormControl<string| null>(null),
    fiscal_name: new FormControl<string| null>(null),
    criminal_case_number: new FormControl<string| null>(null),
    cpumd_testimony_date: new FormControl<string| null>(null),
    verdict_id: new FormControl<string| null>(null),
  });

  relations: any;
  filed_locations: any;
  verdicts: any;

  onSubmit() {
    this.is_saving = true;
    let query;

    if(this.homeVisitForm.value.id) {
      query = this.http.update('', this.homeVisitForm.value.id, this.homeVisitForm.value);
    } else {
      query = this.http.post('', this.homeVisitForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.is_saving = false;
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.homeVisitForm = this.formBuilder.group({
      id: [null],
      patient_id: [null],
      patient_gbv_intake_id: [null],
      complaint_filed_flag: [null, Validators.required],
      filed_by_name: [null, Validators.required],
      filed_by_relation_id: [null],
      filed_location_id: [null],
      filed_location_remarks: [null],
      case_initiated_flag: [null],
      judge_name: [null],
      court_name: [null],
      fiscal_name: [null],
      criminal_case_number: [null],
      cpumd_testimony_date: [null],
      verdict_id: [null]
    });
  }

  closeModal() {
    this.toggleModal.emit('legal_case');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.createForm();
  }
}
