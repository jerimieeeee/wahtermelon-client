import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-casefindings',
  templateUrl: './casefindings.component.html',
  styleUrls: ['./casefindings.component.scss']
})
export class CasefindingsComponent implements OnInit {
  faSave = faSave;
  faAdd = faAdd;

  previousTreatmentForm: FormGroup = new FormGroup({
    previous_treatment: new FormControl<string| null>(''),
    previous_treatment_date: new FormControl<string| null>(''),
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

  }

  savePreviousTreatment(){
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

      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    console.log('test')
    this.loadLibraries();
  }
}
