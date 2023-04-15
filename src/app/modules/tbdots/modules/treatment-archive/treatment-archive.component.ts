import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-treatment-archive',
  templateUrl: './treatment-archive.component.html',
  styleUrls: ['./treatment-archive.component.scss']
})
export class TreatmentArchiveComponent implements OnInit {
  @Input() patient_id;
  @Input() consult_id;

  patient_tb: any = [];

  getPatientTb(){
    let params = {
      patient_id: this.patient_id,
      per_page: 'all'
    };

    this.http.get('tbdots/patient-tb', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.patient_tb = data.data;
      },
      error: err => console.log(err)
    });
  }

  constructor (
    private http: HttpService,
  ) { }

  ngOnInit(): void {
    this.getPatientTb();
  }
}
