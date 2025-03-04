import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronDown, faChevronUp, faPenToSquare, faPlusCircle, faMinus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-vaccine',
    templateUrl: './vaccine.component.html',
    styleUrls: ['./vaccine.component.scss'],
    standalone: false
})
export class VaccineComponent implements OnInit {
  @Output() toggleAccordion = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() setVaccineGiven = new EventEmitter<any>();
  @Input() accordions;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faPlusCircle = faPlusCircle;
  faPenToSquare = faPenToSquare;
  faMinus = faMinus;

  vaccines_given: any;
  vaccine_list: any = [];
  // vaccine_to_edit: any;
  immunization_status: any;

  show_vaccines: boolean = false;
  covid_array = ['ASTRA', 'JANDJ', 'MODER', 'NOVAV', 'PFIZE', 'SINOP', 'SPUTN'];

  loadData(patient_id){
    this.http.get('patient-vaccines/vaccines-records', {params:{'patient_id': patient_id, 'sort': '-vaccine_date' }}).subscribe({
      next: (data: any) => {
        this.vaccine_list = data.data;
        // console.log(this.vaccine_list[0].immunization_status.immunization_status)
        this.immunization_status = this.vaccine_list[0] ? this.vaccine_list[0].immunization_status : '';

        this.checkVaccineStatus(this.vaccine_list);
      },
      error: err => {console.log(err)},
    })
  }

  checkVaccineStatus(vaccines){
    var new_vax = [];
    Object.entries(vaccines).reverse().forEach(([key, value], index) => {
      var val:any = value
      if(!new_vax[val.vaccines.vaccine_id]) new_vax[val.vaccines.vaccine_id] = []

      let vax = {
        id: val.id,
        vaccine_id: val.vaccines.vaccine_id,
        vaccine_date: val.vaccine_date,
        dose: this.getNumberSuffix(Object.keys(new_vax[val.vaccines.vaccine_id]).length + 1)
      }

      new_vax[val.vaccines.vaccine_id][val.id] = vax
      this.vaccine_list[key]['dose'] = new_vax[val.vaccines.vaccine_id][val.id].dose;
    })

    this.vaccines_given = new_vax;
    this.setVaccineGiven.emit(this.vaccines_given);
    this.show_vaccines = true;
  }

  toggleActionModal(name, vaccine){
    this.toggleModal.emit({modal_name: name, data: vaccine});
  }

  getNumberSuffix(i){
    var j = i % 10,
    k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  }

  toggle(name) {
    this.toggleAccordion.emit(name);
  }

  modalToggle(name) {
    console.log(this.vaccines_given)
    this.toggleModal.emit({modal_name: name, data: this.vaccines_given});
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }

}
