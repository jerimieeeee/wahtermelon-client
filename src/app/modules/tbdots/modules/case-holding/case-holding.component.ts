import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAdd, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-case-holding',
  templateUrl: './case-holding.component.html',
  styleUrls: ['./case-holding.component.scss']
})
export class CaseHoldingComponent implements OnInit {
  faSave = faSave;
  faAdd = faAdd;

  caseHoldingForm: FormGroup = new FormGroup({
    registration_date: new FormControl<string| null>(''),
    case_number: new FormControl<string| null>(''),
    enrolled_as: new FormControl<string| null>(''),
    treatment_regimen: new FormControl<string| null>(''),
    bacteriological_status: new FormControl<string| null>(''),
    anatomical_site: new FormControl<string| null>(''),
    eptb_site: new FormControl<string| null>(''),
    specific_site: new FormControl<string| null>(''),
    ipt_flag: new FormControl<string| null>(''),
    drugresistant_flag: new FormControl<boolean| null>(false),
    treatment_start: new FormControl<string| null>(''),
    treatment_end: new FormControl<string| null>(''),
    continuation_start: new FormControl<string| null>(''),
    pict_date: new FormControl<string| null>(''),
    transfer_flag: new FormControl<boolean| null>(false),
  });

  saveTreatment(){
    console.log(this.caseHoldingForm.value)
  }

  loadLibraries(){
    this.http.get('tbdots/tb-libraries-caseholding').subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
