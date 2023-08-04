import { Component, OnInit } from '@angular/core';
import { faCalendar, faTimes, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-familyplanning',
  templateUrl: './familyplanning.component.html',
  styleUrls: ['./familyplanning.component.scss']
})
export class FamilyplanningComponent implements OnInit {
  faCalendar = faCalendar;
  faTimes = faTimes;
  faDoorClosed = faDoorClosed;

  showModal: boolean = false;
  hideButton: boolean = true;
 
  pages: number = 1;
  module: number = 1;
  show_end: boolean = false;
  fetching_history: boolean = false;

  patient_id: any;
  consult_id: any;
  user_facility: any;
  modals: any = [];

  fp_details: any;

  fp_visit_history: any = [];
  

  switchPage(page) {
    if(page === 1) this.loadFP();
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }


  constructor(
    private http: HttpService,
    private route: ActivatedRoute) 
  { }

  openModal() {
    
    this.showModal = !this.showModal;
    this.hideButton = !this.hideButton;
  }

  openFPConsult(data) {
    this.fp_visit_history = data;
    this.pages = 2;
  }

  loadFP() {
    let params = {
      patient_id: this.patient_id,
      per_page: 'all'
    };

    this.http.get('family-planning/fp-records', {params}).subscribe({
      next: (data: any) => { 

       this.fp_visit_history = data.data
      },
      complete: () => {
        console.log(this.fp_visit_history, 'display fp visit details') 
      },
      error: err => {console.log(err)
  
      },
    })
  }

  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    console.log(this.patient_id, 'check patient')
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.loadFP();
    
    
  }

}
