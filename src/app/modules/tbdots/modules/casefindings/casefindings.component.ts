import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faEdit, faSave, faSpinner, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-casefindings',
  templateUrl: './casefindings.component.html',
  styleUrls: ['./casefindings.component.scss']
})
export class CasefindingsComponent implements OnInit {
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Input() patient_id;
  @Input() selected_tb_consult;
  @Input() max_date;

  faSave = faSave;
  faAdd = faAdd;
  faEdit = faEdit;
  faXmark = faXmark;
  faTrashCan = faTrashCan;
  faSpinner = faSpinner;

  is_saving: boolean = false;
  modals: any = [];

  previousTreatmentForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    outcome_code: new FormControl<string| null>(''),
    treatment_date: new FormControl<string| null>(''),
  });

  casefindingForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    patient_source: new FormControl<string| null>(''),
    reg_group: new FormControl<string| null>(''),
    consult_date: new FormControl<string| null>(''),
    previous_tb_treatment: new FormControl<string| null>(''),
    tb_exposure: new FormControl<string| null>(''),
    presumptive_drtb: new FormControl<string| null>(''),
    C: new FormControl<boolean| false>(false),
    H: new FormControl<boolean| false>(false),
    NC: new FormControl<boolean| false>(false),
    symptom: new FormGroup({
      bcpain: new FormControl<boolean| false>(false),
      cough: new FormControl<boolean| false>(false),
      drest: new FormControl<boolean| false>(false),
      dexertion: new FormControl<boolean| false>(false),
      fever: new FormControl<boolean| false>(false),
      hemoptysis: new FormControl<boolean| false>(false),
      nsweats: new FormControl<boolean| false>(false),
      pedema: new FormControl<boolean| false>(false),
      wloss: new FormControl<boolean| false>(false),
    }),
    symptom_remarks: new FormControl<string| null>(''),
    physical_exam: new FormGroup({
      abdomen: new FormControl<string| null>('ND'),
      amuscles: new FormControl<string| null>('ND'),
      bcg: new FormControl<string| null>('ND'),
      cardiovascular: new FormControl<string| null>('ND'),
      endocrine: new FormControl<string| null>('ND'),
      extremities: new FormControl<string| null>('ND'),
      ghealth: new FormControl<string| null>('ND'),
      gurinary: new FormControl<string| null>('ND'),
      lnodes: new FormControl<string| null>('ND'),
      neurological: new FormControl<string| null>('ND'),
      oropharynx: new FormControl<string| null>('ND'),
      skin: new FormControl<string| null>('ND'),
      thoraxlungs: new FormControl<string| null>('ND'),
    })
  });

  createForm() {
    this.previousTreatmentForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_id],
      outcome_code: [null, Validators.required],
      treatment_date: [null, Validators.required]
    });

    this.casefindingForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_id],
      source_code: ['', Validators.required],
      reg_group_code: ['', Validators.required],
      consult_date: ['', Validators.required],
      previous_tb_treatment_code: ['', Validators.required],
      exposetb_flag: ['', Validators.required],
      drtb_flag: ['', Validators.required],
      risk_factor1: [false],
      risk_factor2: [false],
      risk_factor3: [false],
      symptom: this.formBuilder.group({
        bcpain: [false],
        cough: [false],
        drest: [false],
        dexertion: [false],
        fever: [false],
        hemoptysis: [false],
        nsweats: [false],
        pedema: [false],
        wloss: [false],
      }),
      symptom_remarks: [null],
      physical_exam: this.formBuilder.group({
        abdomen: ['ND', Validators.required],
        amuscles: ['ND', Validators.required],
        bcg: ['ND', Validators.required],
        cardiovascular: ['ND', Validators.required],
        endocrine: ['ND', Validators.required],
        extremities: ['ND', Validators.required],
        ghealth: ['ND', Validators.required],
        gurinary: ['ND', Validators.required],
        lnodes: ['ND', Validators.required],
        neurological: ['ND', Validators.required],
        oropharynx: ['ND', Validators.required],
        skin: ['ND', Validators.required],
        thoraxlungs: ['ND', Validators.required],
      })
    });
    this.loadPreviousTreatment();
    this.loadCaseFinding();
  }

  identify(index: number, item) {
    return item.id
  }

  previous_treatments: any = [];

  loadPreviousTreatment(){
    let params = {
      patient_id: this.patient_id,
      per_page: 'all'
    };

    this.http.get('tbdots/patient-tb-history', {params}).subscribe({
      next: (data: any) => {
        this.previous_treatments = data.data;
      },
      error: err => console.log(err)
    });
  }

  case_finding_id: string;
  loadCaseFinding(){
    // console.log(this.selected_tb_consult)
    if(this.selected_tb_consult) {
      let data = this.selected_tb_consult;
      this.case_finding_id = data.case_finding.id;
      this.casefindingForm.patchValue({...data.case_finding});
      this.casefindingForm.patchValue({
        symptom: data.symptom ? {...data.symptom} : null,
        physical_exam: data.physical_exam ? {...data.physical_exam} : null,
        id: data.id,
        source_code: data.case_finding.source_code.code,
        reg_group_code: data.case_finding.reg_group.code,
        previous_tb_treatment_code: data.case_finding.previous_tb_treatment_code.code
      })
    }
  }

  savePreviousTreatment(){
    let query;

    if(this.previousTreatmentForm.value.id) {
      query = this.http.update('tbdots/patient-tb-history/', this.previousTreatmentForm.value.id, this.previousTreatmentForm.value);
    } else {
      query = this.http.post('tbdots/patient-tb-history', this.previousTreatmentForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.loadPreviousTreatment();
        this.previousTreatmentForm.reset();
      },
      error: err => console.log(err)
    });
  }

  clearPreviousTreatmentForm(){
    this.previousTreatmentForm.reset();
  }

  editPreviousTreatment(data){
    this.previousTreatmentForm.patchValue({
      id: data.id,
      patient_id: data.patient_id,
      outcome_code: data.outcome.code,
      treatment_date: data.treatment_date
    });
  }

  saveCaseFindings() {
    this.is_saving = true;
    if(this.casefindingForm.dirty) {
      let query;

      if(this.casefindingForm.value.id) {
        query = this.http.update('tbdots/patient-tb-casefinding/', this.case_finding_id, this.casefindingForm.value);
      } else {
        query = this.http.post('tbdots/patient-tb', this.casefindingForm.value);
      }

      query.subscribe({
        next: (data: any) => {
          // console.log(data);
          let id = this.casefindingForm.value.id ? this.casefindingForm.value.id : data.data.patient_tb_id;
          this.saveSymptomsPe(id, this.casefindingForm.value.patient_id);
        },
        error: err => {console.log(err); this.is_saving = false;}
      })
    } else {
      this.toastr.info('No changes were made.')
      this.is_saving = false;
    }
  }

  saveSymptomsPe(id, patient_id){
    let paramsSymp = {...this.casefindingForm.value.symptom};
    paramsSymp['patient_id'] = patient_id;
    paramsSymp['patient_tb_id'] = id;
    const saveSymptom = this.http.post('tbdots/patient-tb-symptom', paramsSymp);

    let paramsPe = {...this.casefindingForm.value.physical_exam};
    paramsPe['patient_id'] = patient_id;
    paramsPe['patient_tb_id'] = id;
    const savePe = this.http.post('tbdots/patient-tb-pe', paramsPe);

    forkJoin([saveSymptom, savePe]).subscribe(([dataSymptom, dataPe]) => {
      this.is_saving = false;
      this.toastr.success('Case findings was ' + (this.casefindingForm.value.id ? 'updated' : 'saved') + ' successuly', 'Success')
      this.getPatientTbHistory.emit();
    })
  }

  answers_yn: any = [];
  patient_sources: any = [];
  pe_answers: any = [];
  pes: any = [];
  previous_tb_treatments: any = [];
  reg_groups: any = [];
  risk_factors: any = [];
  symptoms: any = [];
  treatment_outcomes: any = [];

  show_form: boolean = false;
  loadLibraries(){
    this.http.get('tbdots/tb-libraries').subscribe({
      next: (data: any) => {
        this.answers_yn = data.tb_answers_yn
        this.patient_sources = data.tb_patient_sources;
        this.pe_answers = data.tb_pe_answers;
        this.pes = data.tb_pes;
        this.previous_tb_treatments = data.tb_previous_tb_treatments;
        this.reg_groups = data.tb_reg_groups;
        this.risk_factors = data.tb_risk_factors;
        this.symptoms = data.tb_symptoms;
        this.treatment_outcomes = data.tb_treatment_outcomes;

        this.show_form = true;
        this.createForm();
      },
      error: err => console.log(err)
    });
  }

  delete_id: string;
  delete_desc: string;
  url: string;

  toggleModal(name, data?){
    this.modals[name] = !this.modals[name];

    if(name === 'delete-item') {
      if(this.modals[name] === true) {
        this.delete_id = data.id;
        this.delete_desc = "Previous Treatment Record";
        this.url = "tbdots/patient-tb-history/";
      } else {
        this.delete_id = null;
        this.delete_desc = null;
        this.url = null;

        this.loadPreviousTreatment();
      }
    }
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
