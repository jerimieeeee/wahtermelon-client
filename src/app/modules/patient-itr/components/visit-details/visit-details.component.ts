import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent implements OnChanges {
  @Input() latest_vitals;
  @Input() selected_visit;

  physical_exam = [];

  openVisit(details: any){
    /* console.log(details);
    console.log(details.pt_group); */
    this.router.navigate(['/'+details.pt_group, {id:details.patient.id, consult_id: details.id}])
  }

  groupPE(pe){
    Object.entries(pe).forEach(([key, value], index) => {
      let val: any = value;
      if(!this.physical_exam[val.lib_physical_exam.category_id.toLowerCase()]) this.physical_exam[val.lib_physical_exam.category_id.toLowerCase()] = [];
      this.physical_exam[val.lib_physical_exam.category_id.toLowerCase()].push(val.lib_physical_exam);
    });

    console.log(this.physical_exam)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selected_visit) {
      if(Object.keys(this.selected_visit.consult_notes.physical_exam).length > 0) {
        this.groupPE(this.selected_visit.consult_notes.physical_exam);
      }
    }
  }

  constructor(
    private router: Router
  ) { }

}
