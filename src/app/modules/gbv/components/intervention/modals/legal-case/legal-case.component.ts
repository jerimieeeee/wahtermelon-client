import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-legal-case',
  templateUrl: './legal-case.component.html',
  styleUrls: ['./legal-case.component.scss']
})
export class LegalCaseComponent implements OnInit, OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_gbv_intake_id;
  @Input() patient_id;
  @Input() selected_data;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  legalForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),
    complaint_filed_flag: new FormControl<boolean| null>(false),
    filed_by_name: new FormControl<string| null>(null),
    filed_by_relation_id: new FormControl<string| null>(null),
    filed_location_id: new FormControl<string| null>(null),
    filed_location_remarks: new FormControl<string| null>(null),
    case_initiated_flag: new FormControl<boolean| null>(false),
    judge_name: new FormControl<string| null>(null),
    court_name: new FormControl<string| null>(null),
    fiscal_name: new FormControl<string| null>(null),
    criminal_case_number: new FormControl<string| null>(null),
    cpumd_testimony_date: new FormControl<string| null>(null),
    verdict_id: new FormControl<string| null>(null),
  });


  onSubmit() {
    this.is_saving = true;
    let query;

    if(this.legalForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-legal/', this.legalForm.value.id, this.legalForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-legal', this.legalForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.toastr.success('Successfully recorded', 'Legal Case');
      },
      error: err => console.log(err)
    });
  }

  createForm(){
    this.legalForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_gbv_intake_id: [this.patient_gbv_intake_id],
      complaint_filed_flag: [false, Validators.required],
      filed_by_name: [null],
      filed_by_relation_id: [null],
      filed_location_id: [null],
      filed_location_remarks: [null],
      case_initiated_flag: [false],
      judge_name: [null],
      court_name: [null],
      fiscal_name: [null],
      criminal_case_number: [null],
      cpumd_testimony_date: [null],
      verdict_id: [null]
    });

    console.log(this.legalForm.value);
    if(this.selected_data) {
      this.legalForm.patchValue({...this.selected_data});
    }
  }

  child_relations: any = [];
  filed_locations: any =[];
  verdicts: any;

  loadLibraries(){
    const getChildRelation = this.http.get('libraries/child-relation');
    const getFiledLocation = this.http.get('libraries/gbv-filing-location');
    const getVerdict = this.http.get('libraries/gbv-outcome-verdict');

    forkJoin([getChildRelation, getFiledLocation, getVerdict]).subscribe({
      next: ([dataChildRelation, dataFiledLocation, dataVerdict]: any) => {
        this.child_relations = dataChildRelation.data;
        this.filed_locations = dataFiledLocation.data;
        this.verdicts = dataVerdict.data;
        this.createForm();
      },
      error: err => console.log(err)
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
    this.loadLibraries();
  }
}
