import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  selector: 'app-pregnant-tag',
  templateUrl: './pregnant-tag.component.html',
  styleUrls: ['./pregnant-tag.component.scss']
})
export class PregnantTagComponent implements OnChanges {
  @Output() loadConsult = new EventEmitter<any>();
  @Input() toggle_content;
  @Input() consult_details;
  @Input() have_complaint;
  @Input() allowed_to_edit;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  is_pregnant: boolean = false;
  show_content: boolean = true;
  is_saving: boolean = false;
  consult_done: boolean = false;
  show_form: boolean = false;

  onSubmit() {
    this.consult_details.is_pregnant = this.is_pregnant;

    this.http.update('consultation/records/', this.consult_details.id, this.consult_details).subscribe({
      next: () => {
        this.toastr.success('Successfully updated', 'Visit Record');
        this.loadConsult.emit();
      },
      error: err => { this.http.showError(err.error.message, 'Visit Record'); }
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    if(this.consult_details) {
      this.consult_done = this.consult_details.consult_done;
      this.is_pregnant = this.consult_details.is_pregnant;
    }
  }

}
