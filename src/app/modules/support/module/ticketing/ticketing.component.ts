import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-ticketing',
    templateUrl: './ticketing.component.html',
    styleUrls: ['./ticketing.component.scss'],
    standalone: false
})
export class TicketingComponent implements OnInit {
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;
  faArrowLeft = faArrowLeft;

  ticketList: any[] = [];
  modals: any[] = [];
  facility_code: string;
  show_ticket_content: boolean = false;
  selected_ticket: any[] = [];
  facility_id: string;
  show_form: boolean = false;
  toggleTicketContent(data) {
    this.selected_ticket = data;
    this.show_ticket_content = !this.show_ticket_content;
  }

  getList() {
    this.show_form = false;

    this.http.getFromMasterform('logs-facility', {params:{facility_code: this.facility_code}}).subscribe({
      next: (data: any) => {
        this.facility_id = data.facility_id;
        this.ticketList = data.data;

        this.show_form = true;
      },
      error: err => this.http.showError(err.error.message, 'Ticket List')
    })
  }

  toggleModal(name) {
    this.modals[name] = !this.modals[name];

    if(!this.modals[name]) this.getList();
  }

  constructor (
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.facility_code = this.http.getUserFacility();
    this.getList();
  }
}
