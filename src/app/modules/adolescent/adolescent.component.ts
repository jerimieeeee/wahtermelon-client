import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  loadASRH() {

       this.fetching_history = false;
  }

  loadCompreLib(){
    // let params = {
    //   patient_id: this.patient_id,
    //   per_page: 'all'
    // };

    this.http.get('libraries/comprehensive').subscribe({
      next: (data: any) => {
        this.compre_questions = data.data;
        console.log(this.compre_questions)

      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute)
  { }


  ngOnInit(): void {
    this.loadCompreLib();
    console.log('working')
  }
}
