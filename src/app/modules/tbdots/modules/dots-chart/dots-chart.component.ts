import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  treatment_start: Date;
  treatment_end: Date;
  continuation_start: Date;

  intensive_phase: any = [];
  continuation_phase: [];

  public days = Array.from({length: 31}, (_, i) => i + 1);
  generateChart(){
    if(this.selected_tb_consult.case_holding) {
      this.treatment_start = new Date(this.selected_tb_consult.case_holding.registration_date);
      this.continuation_start = new Date(this.selected_tb_consult.case_holding.continuation_start);
      this.treatment_end = new Date(this.selected_tb_consult.case_holding.treatment_end);

      for(let date = this.treatment_start; date <= this.continuation_start; date.setMonth(date.getMonth()+1)){
        this.intensive_phase.push({
          month : [date.getMonth()+1, date.toLocaleString('default', {month: 'long'})],
          year : date.getFullYear()
        });
      }
      console.log(this.intensive_phase);
    }
  }

  compareDate(start_date, end_date, month, day, year){
    console.log(year, month, day)
    if(this.isValidDate(`${year}-${month}-${day}`)){
      let date = new Date(`${year}-${day}-${month}`);
      let startDate = new Date(start_date);
      let endDate = new Date(end_date);
      endDate.setDate(endDate.getDate()-1);

      console.log(date >= startDate && date <= endDate)
      return date >= startDate && date <= endDate;
    } else {
      console.log(false)
      return false;
    }
  }

  isValidDate(dateString){
    const date = new Date(dateString);
    console.log(date)
    console.log(date.getFullYear() === Number(dateString.substr(0, 4)) &&
    date.getMonth() === Number(dateString.substr(5, 2)) - 1 &&
    date.getDate() === Number(dateString.substr(8, 2)))
    return date.getFullYear() === Number(dateString.substr(0, 4)) &&
          date.getMonth() === Number(dateString.substr(5, 2)) - 1 &&
          date.getDate() === Number(dateString.substr(8, 2));
  }

  ngOnInit(): void {
    this.generateChart();
    console.log(this.selected_tb_consult);
  }
}
