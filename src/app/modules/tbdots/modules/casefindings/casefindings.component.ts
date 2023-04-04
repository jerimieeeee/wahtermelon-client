import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faEdit, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-casefindings',
  templateUrl: './casefindings.component.html',
  styleUrls: ['./casefindings.component.scss']
})
export class CasefindingsComponent implements OnInit {
  @Input() patient_id;
  @Input() consult_id;

  faSave = faSave;
  faAdd = faAdd;
  faEdit = faEdit;
  faXmark = faXmark;

  previousTreatmentForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    outcome_code: new FormControl<string| null>(''),
    treatment_date: new FormControl<string| null>(''),
  });

  casefindingForm: FormGroup = new FormGroup({
    patient_source: new FormControl<string| null>(''),
    reg_group: new FormControl<string| null>(''),
    consult_date: new FormControl<string| null>(''),
    previous_tb_treatment: new FormControl<string| null>(''),
    tb_exposure: new FormControl<string| null>(''),
    presumptive_drtb: new FormControl<string| null>(''),
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
    risk_factor: new FormGroup({
      C: new FormControl<boolean| false>(false),
      H: new FormControl<boolean| false>(false),
      NC: new FormControl<boolean| false>(false),
    })
  });

  createForm() {
    this.previousTreatmentForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_id],
      outcome_code: [null, Validators.required],
      treatment_date: [null, Validators.required]
    });

    this.loadPreviousTreatment();
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
        console.log(data);
        this.previous_treatments = data.data;
      },
      error: err => console.log(err)
    });
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
        console.log(data);
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
    console.log(data);
    this.previousTreatmentForm.patchValue({
      id: data.id,
      patient_id: data.patient_id,
      outcome_code: data.outcome.code,
      treatment_date: data.treatment_date
    });
    console.log(this.previousTreatmentForm.value);
  }

  saveCase() {
    console.log(this.casefindingForm.value);
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
        console.log(data);
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

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log('test')
    this.loadLibraries();
  }
}
