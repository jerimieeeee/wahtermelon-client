import { Component, OnInit } from '@angular/core';
import { faDoorClosed, faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-tbdots',
  templateUrl: './tbdots.component.html',
  styleUrls: ['./tbdots.component.scss']
})
export class TbdotsComponent implements OnInit {
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

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    console.log('test')
  }
}
