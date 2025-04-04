import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPrescription, faPrint } from '@fortawesome/free-solid-svg-icons';
import { AgeService } from 'app/shared/services/age.service';
import { HttpService } from 'app/shared/services/http.service';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-eprescription',
  imports: [FontAwesomeModule, NgxPrintModule, CommonModule],
  templateUrl: './eprescription.component.html',
  styleUrl: './eprescription.component.scss'
})
export class EprescriptionComponent implements OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() prescriptions;
  @Input() consult_details;

  faPrint = faPrint;
  faPrescription = faPrescription;
  faCircleNotch = faCircleNotch;

  show_form: boolean = true;
  facility_info: any = [];
  patient_info: any = [];
  patient_age: any;

  getAge(){
    if(this.patient_info && this.patient_info.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_info.birthdate);
      console.log(age_value)
      this.patient_age = age_value;
      this.patient_age = Math.round(age_value.age) + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
    }
  }

  closeModal(){
    this.toggleModal.emit('eprescription');
  }

  constructor (
    private http: HttpService,
    private ageService: AgeService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.facility_info = this.http.getUserFromJSON().facility;
    this.patient_info = this.http.getPatientInfo();

    this.getAge();
    console.log(this.facility_info)
    console.log(this.patient_info)
    console.log(this.prescriptions, 'prescription ituu');
    console.log(this.consult_details);
  }
}
