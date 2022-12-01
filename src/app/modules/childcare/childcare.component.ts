import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';



@Component({
  selector: 'app-childcare',
  templateUrl: './childcare.component.html',
  styleUrls: ['./childcare.component.scss']
})
export class ChildcareComponent implements OnInit {

  faDoorClosed = faDoorClosed;
  
  module: Number;

  patient_details: any;

  consult_details: any;


  // Section 2
  constructor(private http: HttpService,
    private router: Router) { }

  patientInfo(info){
   this.patient_details = info;
   this.loadConsultDetails()
    console.log(this.patient_details, 'get patient');
  }

  endVisit(){
  
    let endbutton = {
      consult_done: 1,
      patient_id : this.consult_details[0].patient.id,
      user_id : this.consult_details[0].user.id,
      consult_date : this.consult_details[0].consult_date,
      pt_group : this.consult_details[0].pt_group
    }
      this.http.post('consultation/cn-records/'+this.consult_details[0].id, endbutton).subscribe({
        // next: (data: any) => console.log(data.status, 'check status'),
        error: err => console.log(err),
        complete: () => {
         console.log('end visited kang bata ka')
         this.proceedItr()
        }
      })
      console.log(endbutton)
    }

    proceedItr(){
      this.router.navigate(['/itr', {id: this.patient_details.id}])
    }

    loadConsultDetails(){

      this.http.get('consultation/cn-records/',{params: {patient_id: this.patient_details.id}}).subscribe((data: any) => {
        this.consult_details = data.data
        console.log(this.consult_details[0], 'kunin mo consult');
      });
    }
    

  ngOnInit(): void {
    this.module=1;
  }

  switchTab(tab){
    this.module = 0;
    this.module = tab;
  }
}
