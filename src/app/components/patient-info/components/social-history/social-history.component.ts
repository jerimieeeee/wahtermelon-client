import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-social-history',
  templateUrl: './social-history.component.html',
  styleUrls: ['./social-history.component.scss']
})
export class SocialHistoryComponent implements OnInit {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setSocial = new EventEmitter<any>();
  @Input() accordions;

  faPlusCircle = faPlusCircle;
  social_history: any;

  loadData(patient_id) {
    // console.log(patient_id)
    this.http.get('patient-social-history/history', {params: {patient_id: patient_id}}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.social_history = data.data[0];
        this.setSocial.emit(data.data);
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
