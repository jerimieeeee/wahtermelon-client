import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
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

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.selected_visit)
    if(this.selected_visit) {
      if(this.selected_visit.consult_notes && Object.keys(this.selected_visit.consult_notes.physical_exam).length > 0) {
        this.groupPE(this.selected_visit.consult_notes.physical_exam);
      }
    }
  }

}
