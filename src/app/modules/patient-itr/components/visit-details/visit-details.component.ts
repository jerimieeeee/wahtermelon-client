import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faFileMedical, faFilePdf } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-visit-details',
    templateUrl: './visit-details.component.html',
    styleUrls: ['./visit-details.component.scss'],
    standalone: false
})
export class VisitDetailsComponent implements OnChanges {
  @Input() latest_vitals;
  @Input() selected_visit;

  faFilePdf = faFilePdf;
  faFileMedical = faFileMedical;

  comps: any = [];

  openVisit(details: any){
    // console.log(details)
    let consult_id = details.id;
    let patient_id = details.patient.id; //details.pt_group === 'cc' ? details.patient_id : details.patient.id;

    this.router.navigate(['/patient/'+details.pt_group, {id:patient_id, consult_id: consult_id}])
  }

  goPrint(details: any){
    let consult_id = details.id;
    let patient_id = details.patient.id; //details.pt_group === 'cc' ? details.patient_id : details.patient.id;
    this.router.navigate(['/patient/'+details.pt_group, {id:patient_id, consult_id: consult_id}, 'medical-cert']);


    console.log('working');
  }

  displayVisit(){
    // console.log(this.selected_visit)
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
