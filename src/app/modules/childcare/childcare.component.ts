import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  patient_consultdetails: any;

  consult_id: any


  // Section 2
  constructor(private http: HttpService,
  private router: Router,
  private route: ActivatedRoute) { }

  patientInfo(info){
   this.patient_details = info;
   this.loadConsultDetails()
    console.log(this.patient_details, 'get patient from ccdev');
  }


  endVisit(){
  
    let endbutton = {
      consult_done: 1,
      patient_id : this.consult_details[0].patient.id,
      user_id : this.consult_details[0].user.id,
      consult_date : this.consult_details[0].consult_date,
      pt_group : this.consult_details[0].pt_group,
      // physician_id : this.consult_details[0].physician.id,
      // is_pregnant: this.consult_details[0].is_pregnant
    }
      this.http.update('consultation/cn-records/',this.consult_id, endbutton).subscribe({
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

      this.http.get('consultation/cn-records',{params: {patient_id: this.patient_details.id}}).subscribe((data: any) => {
        this.consult_details = data.data
        console.log(this.consult_details, 'kunin mo consult');
      });
    }
    
    show_forms: boolean;
    checkCCdevDetails(e){
      console.log(e, 'show form with condition ', e != '')
      if(e != '') this.show_forms = true;
    }

  ngOnInit(): void {
    this.module=1;
    this.show_forms = false;
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
    console.log(this.consult_id, 'test consult ids')
  }



  switchTab(tab){
    this.module = 0;
    this.module = tab;
  }
}
