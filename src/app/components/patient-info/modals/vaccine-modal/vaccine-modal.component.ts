import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { Vaccines } from './data/vaccine';

@Component({
  selector: 'app-vaccine-modal',
  templateUrl: './vaccine-modal.component.html',
  styleUrls: ['./vaccine-modal.component.scss']
})
export class VaccineModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;
  error_message = "exceeded maximum value";
  vaccine_list = Vaccines;
  vaccines: any;
  vaccineForm: any = {
    vaccine_status: [],
    vaccine_date: []
  };
  vaccine_grouped = [];

  constructor(
    private http: HttpService
  ) { }

  onSubmit(){
    var vax_arr = [];

    Object.entries(this.vaccineForm.vaccine_status).forEach(([key, value], index) => {
      if(value != '-'){
        let vacc = {
          vaccine_id: key,
          vaccine_date: this.vaccineForm.vaccine_date[key] ? this.vaccineForm.vaccine_date[key] : null,
          status_id: value
        };

        vax_arr.push(vacc);
      }
    })

    if(vax_arr.length > 0){
      let user_id = localStorage.getItem('user_id');
      let patient_id = this.patient_info.id
      var vax_form ={
        patient_id: patient_id,
        user_id: user_id,
        vaccines: vax_arr
      }

      console.log(vax_form)

      this.http.post('patient/vaccines', vax_form).subscribe({
        next: (data: any) => { console.log(data.data), this.closeModal() },
        error: err => console.log(err),
        complete: () => console.log('success')
      })
    }else{

    }

  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

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
    this.loadLibraries();
  }
}
