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

  comps: any = [];

  openVisit(details: any){
    console.log(details)
    let consult_id = details.pt_group === 'cn' ? details.id : details.consult_id;
    let patient_id = details.pt_group === 'cn' ? details.patient.id : details.patient_id;

    this.router.navigate(['/'+details.pt_group, {id:patient_id, consult_id: consult_id}])
  }

  resetVal(){

  }

  displayVisit(){
    if(this.selected_visit) {
      Object.entries(this.comps).forEach(([key, value], index) => {
        if(key !==  this.selected_visit.pt_group) this.comps[key] = false;
      });
      this.comps[this.selected_visit.pt_group] = !this.comps[this.selected_visit.pt_group];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayVisit();
  }

  constructor(
    private router: Router
  ) { }

}
