import { Component, Input, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-risk-stratification',
  templateUrl: './risk-stratification.component.html',
  styleUrls: ['./risk-stratification.component.scss']
})
export class RiskStratificationComponent implements OnInit {
  @Input() patient_id;
  @Input() consult_details;
  faInfoCircle = faInfoCircle;

  risk=10;
  risk_strat: any;
  show_form: boolean = false;
  loadRiskStrat(){
    let params ={
      patient_id: this.patient_id
    };

    this.http.get('non-communicable-disease/risk-stratification', {params}).subscribe({
      next: (data: any) => {
        this.show_form = true;
        this.risk_strat = data.risk_stratification;
        // console.log(this.risk_strat)
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadRiskStrat();
  }

}
