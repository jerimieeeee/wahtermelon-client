import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendar, faTimes, faDoorClosed, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-adolescent',
  templateUrl: './adolescent.component.html',
  styleUrl: './adolescent.component.scss'
})
export class AdolescentComponent implements OnInit {

  faCalendar = faCalendar;
  faTimes = faTimes;
  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;

  showModal: boolean = false;
  hideButton: boolean = true;

  pages: number = 1;
  module: number = 1;
  module_compre: number = 1;
  show_end: boolean = false;
  fetching_history: boolean = true;
  show_form: boolean = true;

  compre_questions: any = [];
  client_types: any = [];
  selected_asrh_consult: any;
  patient_asrh_history: any = [];
  patient_id: any;
  consult_id: any;
  modals: any = [];

  consult_details: any;

  switchPage(page) {
    if(page === 1) this.loadASRH;
    this.pages = page;
    console.log(this.pages, 'Test')
  }

  switchTab(tab) {
    this.module = tab;
  }

  switchTabCompre(tab_compre) {
    this.module_compre = tab_compre;
  }

  updateSelectedASRH(data) {
    console.log(data, 'update on main' );
    this.selected_asrh_consult = data.data[0];
  }
  
  openASRHConsult(data, id) {
    // this.router.navigate(['/patient/at', {id: this.patient_id ?? this.patient_id, consult_id: this.consult_id ?? this.consult_id}]);
    this.selected_asrh_consult = data;
    this.pages = 2;
    console.log()
  }

  toggleModal(name){
    this.modals[name] = !this.modals[name];
    console.log('toggle modal')
  }

  loadCompreLib(){
    this.http.get('libraries/comprehensive').subscribe({
      next: (data: any) => {
        this.compre_questions = data.data;
        console.log(this.compre_questions)

      },
      error: err => console.log(err)
    });
  }

  loadClient(){
    this.http.get('libraries/asrh-client-type').subscribe({
      next: (data: any) => {
        this.client_types = data.data;
        // console.log(this.client_types)
      },
      error: err => console.log(err)
    });
  }

 loadASRH(){
    this.selected_asrh_consult = null;
    this.fetching_history = true;
    let params = {
      patient_id: this.patient_id
    };

    this.http.get('asrh/rapid', {params}).subscribe({
      next: (data: any) => {
        this.patient_asrh_history = data.data;
        if(this.patient_asrh_history[0] && !this.patient_asrh_history[0].notes) this.selected_asrh_consult = data.data[0];
        this.fetching_history = true;
        console.log(this.selected_asrh_consult)
        // this.pages = 2;
      },
      error: err => console.log(err)
    });
  }

  loadConsultDetails(){
    this.http.get('consultation/records',{params: {patient_id: this.patient_id, id: this.consult_id}}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];
        console.log(this.consult_details, 'consult details')
        this.loadASRH();
        this.show_form = true;
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute)
  { }


  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');
    this.loadCompreLib();
    this.loadClient();
    this.loadConsultDetails();
    console.log('working')
  }
}
