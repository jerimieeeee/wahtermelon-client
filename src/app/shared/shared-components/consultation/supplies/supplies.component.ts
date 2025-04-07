import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supplies',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './supplies.component.html',
  styleUrl: './supplies.component.scss'
})
export class SuppliesComponent implements OnChanges {
  @Input() toggle_content;
  @Input() consult_details;
  @Input() with_credentials;
  @Input() allowed_to_edit;
  @Input() user_id;

  show_content: boolean = true;
  show_list: boolean = false;
  show_form: boolean = false;
  show_delete_form: boolean = false;
  show_actions: boolean = false;
  is_saving: boolean = false;
  consult_done: boolean = false;

  modal: any = [];
  prescriptions: any;

  onSubmut () {
    this.is_saving = true;

    this.http.post('', {}).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.show_content = this.toggle_content;

    if(this.consult_details.consult_done === false) this.show_actions = true;

    if(this.consult_details) {
      this.consult_done = this.consult_details.consult_done;
    }
  }
}
