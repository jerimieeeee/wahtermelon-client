import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dots-chart',
  templateUrl: './dots-chart.component.html',
  styleUrls: ['./dots-chart.component.scss']
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
  intensiveForm: any = [];
  intensiveAll: any = [];
  continuationForm: any = [];
  continuationAll: any = [];

  ip_count: any = [];
  cp_count: any = [];

  is_saving: boolean = false;

  checkAll(type, i){
    if(type === 'ip') {
      Object.entries(this.intensiveForm).forEach(([key, value], index) => {
        let key_split = key;
        if(i.toString() === key_split.split('-')[0].toString()) {
          this.intensiveForm[key] = !this.intensiveAll[i] ? true : false;
        }
      })
    } else {console.log('test')
      Object.entries(this.continuationForm).forEach(([key, value], index) => {
        let key_split = key;
        if(i.toString() === key_split.split('-')[0].toString()) {
          this.continuationForm[key] = !this.continuationAll[i] ? true : false;
        }
      })
    }

  }

  modelClick(){

  }

  generateChart(){
    if(this.selected_tb_consult.case_holding) {
      console.log(this.selected_tb_consult.case_holding);
      this.treatment_start = new Date(this.selected_tb_consult.case_holding.treatment_start);
      this.continuation_start = new Date(this.selected_tb_consult.case_holding.continuation_start);
      this.treatment_end = new Date(this.selected_tb_consult.case_holding.treatment_end);

      for(let date = new Date(this.selected_tb_consult.case_holding.treatment_start); date <= new Date(this.selected_tb_consult.case_holding.continuation_start); date.setMonth(date.getMonth()+1)){
        this.intensive_phase.push({
          month : [date.getMonth()+1, date.toLocaleString('default', {month: 'long'})],
          year : date.getFullYear()
        });
      }
      // console.log(this.intensive_phase)

      let cp_start = new Date(new Date(this.selected_tb_consult.case_holding.continuation_start).getFullYear()+'-'+(new Date(this.selected_tb_consult.case_holding.continuation_start).getMonth()+1)+'-01');
      for(let date = cp_start; date <= new Date(this.selected_tb_consult.case_holding.treatment_end); date.setMonth(date.getMonth()+1)){
        this.continuation_phase.push({
          month : [date.getMonth()+1, date.toLocaleString('default', {month: 'long'})],
          year : date.getFullYear()
        });
      }
    }
  }

  onSubmit(){
    console.log(this.intensiveForm);
    console.log(this.continuationForm);
  }

  compareDate(start_date, end_date, month, day, year, type, i){
    if(this.isValidDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)){
      let date = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
      let startDate = new Date(start_date);
      let endDate = new Date(end_date);

      let result = date >= startDate && date <= endDate;

      if(type === 'ip') {
        endDate.setDate(endDate.getDate()-1);
        if(result){
          if(!this.intensiveForm[i+'-'+year+'-'+month.toString().padStart(2, '0')+'-'+day.toString().padStart(2, '0')]) {
            this.intensiveForm[i+'-'+year+'-'+month.toString().padStart(2, '0')+'-'+day.toString().padStart(2, '0')] = false;
          }
        }
      } else {
        endDate.setDate(endDate.getDate());
        if(result){
          if(!this.continuationForm[i+'-'+year+'-'+month.toString().padStart(2, '0')+'-'+day.toString().padStart(2, '0')]) {
            this.continuationForm[i+'-'+year+'-'+month.toString().padStart(2, '0')+'-'+day.toString().padStart(2, '0')] = false;
          }
        }
      }

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

  ngOnInit(): void {
    this.ip_count = [];
    this.cp_count = [];
    this.generateChart();
  }
}
