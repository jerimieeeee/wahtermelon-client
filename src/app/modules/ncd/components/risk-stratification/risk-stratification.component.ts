import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-risk-stratification',
    templateUrl: './risk-stratification.component.html',
    styleUrls: ['./risk-stratification.component.scss'],
    standalone: false
})
export class RiskStratificationComponent implements OnChanges {
  @Input() patient_id;
  @Input() consult_details;
  faInfoCircle = faInfoCircle;

  risk_strat: any;
  info: any;
  show_form: boolean = true;
  loadRiskStrat(){
    let params ={
      patient_id: this.patient_id
    };

    this.http.get('non-communicable-disease/risk-stratification', {params}).subscribe({
      next: (data: any) => {
        this.show_form = true;
        this.info = data.data[0];
        this.risk_strat = data.risk_stratification;
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.risk_strat = this.consult_details.risk_stratification;
  }
}
