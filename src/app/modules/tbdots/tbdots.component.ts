import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faDoorClosed, faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-tbdots',
  templateUrl: './tbdots.component.html',
  styleUrls: ['./tbdots.component.scss']
})
export class TbdotsComponent implements OnInit {
  patient_id: any;
  consult_id: any;

  faPersonWalking = faPersonWalking;
  faDoorClosed = faDoorClosed;

  pages: number = 2;
  module: number = 1;
  show_end: boolean = false;

  consult_details: any;

  switchPage(page) {
    this.pages = page;
  }

  switchTab(tab) {
    this.module = tab;
  }

  toggleModal() {
    this.show_end = !this.show_end;
  }

  loadConsult(){
    let params = {
      id: this.consult_id,
      pt_group: 'tb'
    };

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0]
      },
      error: err => console.log(err)
    });
  }

  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.loadConsult();
  }
}
