import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss']
})
export class VisitDetailsComponent implements OnInit {
  @Input() latest_vitals;
  @Input() selected_visit;

  openVisit(details: any){
    /* console.log(details);
    console.log(details.pt_group); */
    this.router.navigate(['/'+details.pt_group, {id:details.patient.id, consult_id: details.id}])
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
