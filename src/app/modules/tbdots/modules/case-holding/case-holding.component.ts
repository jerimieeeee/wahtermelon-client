import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faCircleNotch, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-case-holding',
  templateUrl: './case-holding.component.html',
  styleUrls: ['./case-holding.component.scss']
})
export class CaseHoldingComponent implements OnInit {
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Input() patient_id;
  @Input() consult_id;
  @Input() selected_tb_consult;

  faSave = faSave;
  faAdd = faAdd;
  faCircleNotch = faCircleNotch;

  required_message = 'Required field';

  caseHoldingForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    patient_tb_id: new FormControl<string| null>(''),
    case_number: new FormControl<string| null>(''),
    enroll_as_code : new FormControl<string| null>(''),
    treatment_regimen_code : new FormControl<string| null>(''),
    registration_date: new FormControl<string| null>(''),
    treatment_start: new FormControl<string| null>(''),
    continuation_start: new FormControl<string| null>(''),
    treatment_end: new FormControl<string| null>(''),
    bacteriological_status_code : new FormControl<string| null>(''),
    anatomical_site_code : new FormControl<string| null>(''),
    eptb_site_id : new FormControl<string| null>(''),
    specific_site: new FormControl<string| null>(''),
    drug_resistant_flag: new FormControl<boolean| null>(false),
    ipt_type_code : new FormControl<string| null>(''),
    transfer_flag: new FormControl<boolean| null>(false),
    pict_date: new FormControl<string| null>(''),
  });

  show_form: boolean = false;
  is_saving: boolean = false;
  show_error: boolean = false;
  saveCaseFindings(){
    this.is_saving = true;
    if(this.caseHoldingForm.valid){
      this.http.post('tbdots/patient-tb-caseholding', this.caseHoldingForm.value).subscribe({
        next: () => {
          this.showToastr('success','Recorded successfully', 'Case Holding');
          this.getPatientTbHistory.emit();
        },
        error: err => console.log(err)
      });
    } else {
      this.show_error = true;
      this.showToastr('error', 'Form invalid or incomplete', 'Error')
    }
  }

  showToastr(type: string, message: string, title: string){
    this.toastr[type](message,title);
    this.is_saving = false;
  }

  getContinuationDate() {
    let date = new Date(this.caseHoldingForm.value.treatment_start);
    date.setDate(date.getDate()+56)
    this.caseHoldingForm.patchValue({
      continuation_start: formatDate(date, 'yyyy-MM-dd', 'en')
    });

    this.getTreatmentEnd();
  }

  getTreatmentEnd() {
    let date = new Date(this.caseHoldingForm.value.continuation_start);
    date.setDate(date.getDate()+111);
    this.caseHoldingForm.patchValue({
      treatment_end: formatDate(date, 'yyyy-MM-dd', 'en')
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.caseHoldingForm.controls;
  }

  loadCaseHolding(){
    if(this.selected_tb_consult) {
      let data = this.selected_tb_consult;
      console.log(data);
      this.caseHoldingForm.patchValue({...data.case_holding});
      this.caseHoldingForm.patchValue({
        id: data.id,
        enroll_as_code: data.case_holding.enroll_as.code,
        treatment_regimen_code: data.case_holding.treatment_regimen ? data.case_holding.treatment_regimen.code : null,
        bacteriological_status_code: data.case_holding.bacteriological_status ? data.case_holding.bacteriological_status.code : null,
        anatomical_site_code: data.case_holding.anatomical_site ? data.case_holding.anatomical_site.code : null,
        eptb_site_id: data.case_holding.eptb_site ? data.case_holding.eptb_site.id : null
      });

      console.log(this.caseHoldingForm.controls)
    }
    this.show_form = true;
    this.checkForm();
  }

  createForm() {
    this.caseHoldingForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_id],
      patient_tb_id: [this.selected_tb_consult.id],
      case_number: ['', Validators.required],
      enroll_as_code : ['', Validators.required],
      treatment_regimen_code : ['', Validators.required],
      registration_date: ['', Validators.required],
      treatment_start: ['', Validators.required],
      continuation_start: ['', Validators.required],
      treatment_end: ['', Validators.required],
      bacteriological_status_code : ['', Validators.required],
      anatomical_site_code : ['', Validators.required],
      eptb_site_id : ['', Validators.required],
      specific_site: ['', Validators.required],
      drug_resistant_flag: [0],
      ipt_type_code : ['', Validators.required],
      transfer_flag: [0],
      pict_date: [''],
    });

    this.loadCaseHolding();
  }

  tb_anatomical_sites: any = [];
  tb_answers_yn: any = [];
  tb_bacteriological_statuses: any = [];
  tb_enroll_as : any = [];
  tb_eptb_sites : any = [];
  tb_ipt_types : any = [];
  tb_treatment_regimens : any [];

  iptDisabled = ['treatment_regimen_code', 'bacteriological_status_code', 'anatomical_site_code', 'pict_date', 'eptb_site_id', 'specific_site', 'drug_resistant_flag'];
  checkForm(){
    if(this.caseHoldingForm.value.enroll_as_code === "IPT") {
      this.iptDisabled.forEach(element => {
          this.f[element].disable();
      });

      this.f.ipt_type_code.enable();
    } else if (this.caseHoldingForm.value.enroll_as_code === "DSTB") {
      this.iptDisabled.forEach(element => {
        this.f[element].enable();
      });

      this.f.eptb_site_id.disable();
      this.f.specific_site.disable();
      this.f.ipt_type_code.disable();
    } else {
      this.iptDisabled.forEach(element => {
        this.f[element].disable();
      });

      this.f.eptb_site_id.disable();
      this.f.specific_site.disable();
      this.f.ipt_type_code.disable();
      this.f.drug_resistant_flag.disable();
    }
  }

  eptbSite(){
    if(this.caseHoldingForm.value.anatomical_site_code === 'EP') {
      this.f.eptb_site_id.enable();
    } else {
      this.f.eptb_site_id.disable();
    }
  }

  specificSite(){
    if(this.caseHoldingForm.value.eptb_site_id === '9') {
      this.f.specific_site.enable();
    } else {
      this.f.specific_site.disable();
    }
  }

  loadLibraries(){
    this.http.get('tbdots/tb-libraries-caseholding').subscribe({
      next: (data: any) => {
        this.tb_anatomical_sites = data.tb_anatomical_sites;
        this.tb_answers_yn = data.tb_answers_yn;
        this.tb_bacteriological_statuses = data.tb_bacteriological_statuses;
        this.tb_enroll_as = data.tb_enroll_as;
        this.tb_eptb_sites = data.tb_eptb_sites;
        this.tb_ipt_types = data.tb_ipt_types;
        this.tb_treatment_regimens = data.tb_treatment_regimens;
        this.createForm();
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
