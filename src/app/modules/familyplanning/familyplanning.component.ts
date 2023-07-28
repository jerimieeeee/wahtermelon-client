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
  

  switchPage(page) {
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


  ngOnInit(): void {
    this.user_facility = this.http.getUserFacility();
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
  }

}
