import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  selector: 'app-ticket-transactions',
  templateUrl: './ticket-transactions.component.html',
  styleUrls: ['./ticket-transactions.component.scss']
})
export class TicketTransactionsComponent implements OnInit {
  @Input() selected_ticket;
  @Input() facility_id;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;

  log_comment: string = '';
  comment_list: any = [];

  onSubmit() {
    this.is_saving = true;
    let params = {
      logs_id: this.selected_ticket.id,
      facility_user_id: this.user_id,
      facility_user_name: this.user_info.facility_user_name,
      comment: this.log_comment
    };

    console.log(params);
    this.http.postToMasterform('logs-facility-comment', params).subscribe({
      next: (data: any) => {
        this.log_comment = '';
        this.is_saving = false;
        this.loadComments();
      },
      error: err => console.log(err)
    })
  }

  loadComments() {
    const params = {
      logs_id: this.selected_ticket.id
    };

    this.http.getFromMasterform('logs-facility-comment', { params }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.comment_list = data.data;
      },
      error: err => console.log(err)
    })
  }

  constructor (
    private http: HttpService
  ) { }

  user_info: {
    facility_user_name:string
  };

  user_id: string;
  ngOnInit(): void {
    const user_info = this.http.getUserFromJSON();

    this.user_info = {
      facility_user_name: user_info.first_name + ' ' + user_info.last_name
    }

    this.user_id = this.http.getUserID();
    this.loadComments();
  }
}
