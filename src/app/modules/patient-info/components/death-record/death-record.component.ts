import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp, faMinus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-death-record',
    templateUrl: './death-record.component.html',
    styleUrls: ['./death-record.component.scss'],
    standalone: false
})
export class DeathRecordComponent {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setDetails = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPlusCircle = faPlusCircle;
  faMinus = faMinus;
  faEdit = faEdit;
  death: any;

  show_form: boolean = true;

  antecedent_list: any = [];
  underlying_list: any = [];

  loadData(patient_id){
    this.http.get('mortality/record', {params:{patient_id: patient_id}}).subscribe({
      next: (data: any) => {
        // console.log(data)
        this.show_form = true;
        this.death = data.data[0];

        this.handleCause();
        this.setDetails.emit({var_name: 'death_record', data: this.death});
      },
      error: err => console.log(err)
    });
  }

  handleCause() {
    this.antecedent_list = [];
    this.underlying_list = [];
    if(this.death && this.death.cause) {
      Object.entries(this.death.cause).forEach(([key, value]: any, index) => {
        if(value.cause.code === 'ANT') this.antecedent_list.push(value.icd10.icd10_code + ': ' + value.icd10.icd10_desc);
        if(value.cause.code === 'UND') this.underlying_list.push(value.icd10.icd10_code + ': ' + value.icd10.icd10_desc);
      })
    }
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
