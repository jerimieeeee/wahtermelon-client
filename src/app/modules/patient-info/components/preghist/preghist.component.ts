import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronDown, faChevronUp, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-preghist',
  templateUrl: './preghist.component.html',
  styleUrls: ['./preghist.component.scss']
})
export class PreghistComponent {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setDetails = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPlusCircle = faPlusCircle;

  pregnancy_history: any;

  show_form: boolean = false;

  loadData(patient_id){
    this.http.get('patient-pregnancy-history/history', {params:{patient_id: patient_id}}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.show_form = true;
        this.pregnancy_history = data.data[0];
        this.setDetails.emit({var_name: 'pregnancy_history', data: this.pregnancy_history});
      },
      error: err => console.log(err)
    });
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
}
