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
    let params = {
      type: 'all',
      patient_id: this.selected_visit.patient.id
    }

    this.http.get('maternal-care/mc-records', { params }).subscribe({
      next: (data: any) => {
        if (data.data.length > 0) {
          this.patient_mc_list = data.data;
        }
      },
      error: err => console.log(err),
    });
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    if(this.selected_visit) {
      this.loadData();
    }
  }
}
