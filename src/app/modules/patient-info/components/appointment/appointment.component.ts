import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronDown, faChevronUp, faMinus, faPenToSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setVaccineGiven = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPlusCircle = faPlusCircle;
  faPenToSquare = faPenToSquare;
  faMinus = faMinus;

  appointment_list: any = [];

  show_appointment: boolean = false;

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name) {
    this.toggleModal.emit(name);
  }


  loadData(patient_id){
    this.show_appointment = true;

    let params = {
      patient_id: patient_id,
      per_page: 'all',
    };
    // console.log(this.selected_month, this.selected_year);

    this.http.get('appointment/schedule', {params}).subscribe({
      next: (data: any) => {
        this.appointment_list = data[0];
        console.log(this.appointment_list);
      },
      error: err => console.log(err)
    });
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
