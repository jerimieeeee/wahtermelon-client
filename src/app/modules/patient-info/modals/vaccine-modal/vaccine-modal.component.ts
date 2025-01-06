import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Vaccines } from './data/vaccine';

@Component({
    selector: 'app-vaccine-modal',
    templateUrl: './vaccine-modal.component.html',
    styleUrls: ['./vaccine-modal.component.scss'],
    standalone: false
})
export class VaccineModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadData = new EventEmitter<any>();
  @Input() patient_info;
  @Input() vaccines_given;

  error_message = "exceeded maximum value";
  vaccine_list = Vaccines;
  vaccines: any;
  vaccineForm: any = {
    vaccine_status: [],
    vaccine_date: [],
    lot_no: [],
    batch_no: [],
    facility_name: []
  };
  vaccine_grouped = [];
  showAlert: boolean = false;

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  covid_array = ['ASTRA', 'JANDJ', 'MODER', 'NOVAV', 'PFIZE', 'SINOP', 'SPUTN', 'SINOV'];
  onSubmit(){
    var vax_arr = [];

    // console.log(this.vaccineForm)
    Object.entries(this.vaccineForm.vaccine_status).forEach(([key, value], index) => {
      if(value != '-'){
        let vacc = {
          vaccine_id: key,
          vaccine_date: this.vaccineForm.vaccine_date[key] ? this.vaccineForm.vaccine_date[key] : null,
          status_id: value,
          lot_no: this.vaccineForm.lot_no[key] ? this.vaccineForm.lot_no[key] : null,
          batch_no: this.vaccineForm.batch_no[key] ? this.vaccineForm.batch_no[key] : null,
          facility_name: this.vaccineForm.facility_name[key] ? this.vaccineForm.facility_name[key] : null,
        };

        vax_arr.push(vacc);
      }
    })

    if(vax_arr.length > 0){
      let user_id = this.http.getUserID();
      let patient_id = this.patient_info.id
      var vax_form ={
        patient_id: patient_id,
        user_id: user_id,
        vaccines: vax_arr
      }

      console.log(vax_form)

      this.http.post('patient-vaccines/vaccines', vax_form).subscribe({
        next: () => {
          this.toastr.success('Successfully recorded!','Vaccine record')
          this.loadData.emit('vaccines');
          // this.closeModal();
        },
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
        console.log(data.data)
        const groups = list.reduce((groups, item) => {
          if(item.vaccine_id !== 'DPT'){
            item.vaccine_module = this.getName(item.vaccine_module);
            const group = (groups[item.vaccine_module] || []);
            group.push(item);
            groups[item.vaccine_module] = group;
          }
            return groups;
        }, {});

        let sort = ["Child Care", "General", "Animal Bite", "NCD", "Maternal Care", "COVID-19"]
        let arranged_group = [];

        sort.forEach((item) => {
          arranged_group.push({name : item, items: groups[item]})
        })

        this.vaccine_grouped = arranged_group;
        console.log(this.vaccine_grouped)
      }
    );

    return value;
  }

  getName(module){
    let new_name;

    switch(module){
      case 'animalbite':
        new_name = 'Animal Bite';
        break;
      case 'ccdev':
        new_name = 'Child Care'
        break
      case 'gen':
        new_name = 'General'
        break
      case 'mc':
        new_name = 'Maternal Care'
        break
      case 'ncd':
        new_name = 'NCD'
        break
      case 'covid':
        new_name = 'COVID-19'
        break
    }

    return new_name;
  }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
