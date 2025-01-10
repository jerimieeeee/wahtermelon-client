import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dots-chart',
    templateUrl: './dots-chart.component.html',
    styleUrls: ['./dots-chart.component.scss'],
    standalone: false
})

export class DotsChartComponent implements OnInit {
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Input() patient_id;
  @Input() consult_id;
  @Input() selected_tb_consult;

  faCircleNotch = faCircleNotch;
  faSave = faSave;

  public days = Array.from({length: 31}, (_, i) => i + 1);

  treatment_start: Date;
  treatment_end: Date;
  continuation_start: Date;

  intensive_phase: any = [];
  continuation_phase: any = [];
  intensiveForm: any[] = [];
  intensiveAll: any = [];
  continuationForm: any[][] = [];
  continuationAll: any = [];

  ip_count: any = [];
  cp_count: any = [];

  is_saving: boolean = false;

  checkAll(type, i){
    let usedForm = type === 'ip' ? this.intensiveForm[i] : this.continuationForm[i]
    let formName = type === 'ip' ? 'intensiveForm' : 'continuationForm';
    let checkName = type === 'ip' ? 'intensiveAll' : 'continuationAll';

    this[checkName][i] = !this[checkName][i];
    Object.entries(usedForm).forEach(([key, value]) => {
      console.log(i, this[checkName][i])
      this[formName][i][key] = this[checkName][i];
      console.log(key, this[formName][i][key])
    });

  }

  generateChart(){
    if(this.selected_tb_consult.case_holding) {
      this.treatment_start = new Date(this.selected_tb_consult.case_holding.treatment_start);
      this.continuation_start = new Date(this.selected_tb_consult.case_holding.continuation_start);
      this.treatment_end = new Date(this.selected_tb_consult.case_holding.treatment_end);

      let before_continuation = new Date(this.continuation_start).setDate(this.continuation_start.getDate() - 1);

      for(let date = new Date(this.treatment_start.getFullYear(), this.treatment_start.getMonth(), 1); date <= new Date(before_continuation); date.setMonth(date.getMonth()+1)){
        this.intensive_phase.push({
          month : [date.getMonth()+1, date.toLocaleString('default', {month: 'short'})],
          year : date.getFullYear()
        });
      }
      // console.log(this.continuation_start, this.intensive_phase)
      let cp_start = new Date(new Date(this.selected_tb_consult.case_holding.continuation_start).getFullYear()+'-'+(new Date(this.selected_tb_consult.case_holding.continuation_start).getMonth()+1)+'-01');
      for(let date = cp_start; date <= new Date(this.selected_tb_consult.case_holding.treatment_end); date.setMonth(date.getMonth()+1)){
        this.continuation_phase.push({
          month : [date.getMonth()+1, date.toLocaleString('default', {month: 'short'})],
          year : date.getFullYear()
        });
      }
    }
  }

  onSubmit(){
    // this.is_saving = true;
    let dots_arr = [];
    Object.entries(this.intensiveForm).forEach(([key, value]) => {
      Object.entries(value).forEach(([key, value]) => {
        if(value) {
          let dots_value = { dots_date: key, dots_type: 'IP' }
          dots_arr.push(dots_value);
        }
      });
    });

    Object.entries(this.continuationForm).forEach(([key, value]) => {
      Object.entries(value).forEach(([key, value]) => {
        if(value) {
          let dots_value = { dots_date: key, dots_type: 'CP' }
          dots_arr.push(dots_value);
        }
      });
    });

    let params = {
      patient_id: this.patient_id,
      patient_tb_id: this.selected_tb_consult.id,
      dots: dots_arr
    };

    this.http.post('tbdots/patient-tb-chart', params).subscribe({
      next:(data: any) => {
        console.log(data);
        this.toastr.success('Successfully Recorded', 'TB Dots Chart');
        this.is_saving = false;
      },
      error: err => { this.http.showError(err.error.message, 'TB Dots Chart'); }
    })
  }

  compareDate(start_date, end_date, month, day, year, type, i){
    if(type === 'ip' && !this.intensiveForm[i]) this.intensiveForm[i] = [];
    if(type === 'cp' && !this.continuationForm[i]) this.continuationForm[i] = [];

    if(this.isValidDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)){
      let indexYear = year+'-'+month.toString().padStart(2, '0')+'-'+day.toString().padStart(2, '0');
      let date = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
      let startDate = new Date(start_date);
      let endDate = new Date(end_date);

      if(type === 'ip') endDate.setDate(endDate.getDate()-1);
      let result = date >= startDate && date <= endDate;
      let date_exist = this.saved_dots_chart[indexYear] ? true : false;

      if(type === 'ip' && result && !this.intensiveForm[i][indexYear]) this.intensiveForm[i][indexYear] = date_exist;
      if(type === 'cp' && result && !this.continuationForm[i][indexYear]) this.continuationForm[i][indexYear] = date_exist;

      if(date_exist) delete this.saved_dots_chart[indexYear];
      return result
    } else {
      return false;
    }
  }

  isValidDate(dateString){
    const date = new Date(dateString);

    return date.getFullYear() === Number(dateString.substr(0, 4)) &&
          date.getMonth() === Number(dateString.substr(5, 2)) - 1 &&
          date.getDate() === Number(dateString.substr(8, 2));
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  saved_dots_chart: any[] =[];
  ngOnInit(): void {
    this.ip_count = [];
    this.cp_count = [];

    if(this.selected_tb_consult.dots_chart) {
      Object.entries(this.selected_tb_consult.dots_chart).forEach(([key, value]:any) => {
        this.saved_dots_chart[value.dots_date] = true;
      });

      console.log(this.saved_dots_chart);
      this.generateChart();
    } else {
      this.generateChart();
    }
  }
}
