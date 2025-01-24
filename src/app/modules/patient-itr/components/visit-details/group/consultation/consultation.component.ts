import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-consultation',
    templateUrl: './consultation.component.html',
    styleUrls: ['./consultation.component.scss'],
    standalone: false
})
export class ConsultationComponent implements OnChanges {
  @Input() selected_visit;

  physical_exam = [];

  groupPE(pe){
    Object.entries(pe).forEach(([key, value], index) => {
      let val: any = value;
      if(!this.physical_exam[val.lib_physical_exam.category_id.toLowerCase()]) this.physical_exam[val.lib_physical_exam.category_id.toLowerCase()] = [];
      this.physical_exam[val.lib_physical_exam.category_id.toLowerCase()].push(val.lib_physical_exam);
    });

    // console.log(this.physical_exam)
  }

  constructor() { }

  startDate: Date;
  endDate: Date;
  elapasedTime: string;

  calculateElapsedTime(){
    const diffMill = this.endDate.getTime() - this.startDate.getTime();
    let minutesDiff = Math.floor(diffMill /(1000 *60));

    if(minutesDiff > 60) {
      let hoursDiff = Math.floor(minutesDiff/60);
      let minutesLeft = minutesDiff - (hoursDiff * 60);

      this.elapasedTime = hoursDiff+' Hour'+(hoursDiff > 1 ? 's ' : ' ');
      if(minutesLeft > 0) this.elapasedTime += minutesLeft+' Minute'+ (minutesLeft > 1 ? 's ' : ' ');
    }
    // console.log(this.elapasedTime);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.selected_visit)
    if(this.selected_visit) {
      if(this.selected_visit.consult_notes && Object.keys(this.selected_visit.consult_notes.physical_exam).length > 0) {
        this.groupPE(this.selected_visit.consult_notes.physical_exam);
      }

      this.startDate = new Date(this.selected_visit.created_at);
      this.endDate = this.selected_visit.consult_done ? new Date(this.selected_visit.updated_at) : new Date();

      this.calculateElapsedTime();
    }
  }

}
