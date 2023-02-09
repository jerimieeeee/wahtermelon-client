import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-mc',
  templateUrl: './mc.component.html',
  styleUrls: ['./mc.component.scss']
})
export class McComponent implements OnInit {
  @Input() selected_visit
  patient_mc_list: any;

  loadData(){
    this.http.get('child-care/cc-records/'+this.selected_visit.patient.id).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    if(this.selected_visit[0]) {
      this.patient_mc_list = [this.selected_visit[0]];
      console.log(typeof this.patient_mc_list, this.patient_mc_list)
    }
  }
}
