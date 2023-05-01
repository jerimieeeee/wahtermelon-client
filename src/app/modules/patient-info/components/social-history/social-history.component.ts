import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronDown, faChevronUp, faMinus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-social-history',
  templateUrl: './social-history.component.html',
  styleUrls: ['./social-history.component.scss']
})
export class SocialHistoryComponent implements OnInit {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setDetails = new EventEmitter<any>();
  @Input() accordions;

  faPlusCircle = faPlusCircle;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faMinus = faMinus;

  social_history: any;

  loadData(patient_id) {
    // console.log(patient_id)
    this.http.get('patient-social-history/history', {params: {patient_id: patient_id}}).subscribe({
      next: (data: any) => {
        // console.log(data.data.length)
        if(data.data.length !== 0) {
          this.social_history = data.data[0];
        } else {
          this.social_history = [];
        }
        // console.log(this.social_history)
        this.setDetails.emit({var_name: 'social_history', data: this.social_history});
      },
      error: err => console.log(err)
    })
  }

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name) {
    this.toggleModal.emit(name);
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }

}
