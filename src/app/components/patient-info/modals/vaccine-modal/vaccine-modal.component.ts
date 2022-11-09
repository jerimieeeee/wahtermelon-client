import { analytics } from '@angular-devkit/core';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyObjectsAreNotAllowedInProps } from '@ngrx/store/src/models';
import { HttpService } from 'app/shared/services/http.service';
import { Vaccines } from './data/vaccine';

@Component({
  selector: 'app-vaccine-modal',
  templateUrl: './vaccine-modal.component.html',
  styleUrls: ['./vaccine-modal.component.scss']
})
export class VaccineModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();

  error_message = "exceeded maximum value";
  vaccine_list = Vaccines;
  vaccines: any;
  vaccineForm: any = {
    vaccine_status: [],
    vaccine_date: []
  };

  // vaccineForm: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService
  ) { }

  onSubmit(){
    console.log(this.vaccineForm);
    var vax_arr = [];

    Object.entries(this.vaccineForm.vaccine_status).forEach(([key, value], index) => {
      if(value != '-'){
        let vacc = {
          vaccine_id: key,
          vaccine_date: this.vaccineForm.vaccine_date[key] ? this.vaccineForm.vaccine_date[key] : null,
          vaccine_status: value
        };

        vax_arr.push(vacc);
      }
    })

    var vax_form ={
      patient_id: '',
      user_id: '',
      vaccines: vax_arr
    }

    console.log(vax_form)
    /* this.http.post('patient/vaccines', vax_form).subscribe({
      next: (data: any) => { console.log(data.data) },
      error: err => console.log(err),
      complete: () => console.log('success')
    }) */
  }



  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }
  vaccine_grouped = [];

  loadLibraries() {
    let value: any;

    this.http.get('libraries/vaccine').subscribe(
      (data: any) => {
        const list = data.data;
        console.log(list)
        const groups = list.reduce((groups, item) => {
          const group = (groups[item.vaccine_module] || []);
          group.push(item);
          groups[item.vaccine_module] = group;
          return groups;
        }, {});

        this.vaccine_grouped = groups;
      }
    );
    return value;
  }

  ngOnInit(): void {
    let date = new Date();


    /* this.http.get('libraries/vaccine').subscribe(
      (data: any) => {
        this.vaccines = data.data;
        console.log(this.vaccines)
      }
    ); */
    this.loadLibraries();


  }
}
