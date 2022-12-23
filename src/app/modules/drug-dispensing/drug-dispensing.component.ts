import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faFlaskVial, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-drug-dispensing',
  templateUrl: './drug-dispensing.component.html',
  styleUrls: ['./drug-dispensing.component.scss']
})
export class DrugDispensingComponent implements OnInit {
  faFlaskVial = faFlaskVial;
  faTrash = faTrash;
  faEdit = faEdit;
  faXmark = faXmark;

  patient_details: any;

  prescriptions: any;
  dispensed: any;
  dispensing_date: string;

  libraries = {
    dosage_uom:             {var_name: 'dosage_desc',       location: 'unit-of-measurements', value: ''},
    dose_regimen:           {var_name: 'regimen_desc',      location: 'dose-regimens',        value: ''},
    medicine_purpose:       {var_name: 'purpose_desc',      location: 'purposes',             value: ''},
    duration_frequency:     {var_name: 'frequency_desc',    location: 'duration-frequencies', value: ''},
    quantity_preparation:   {var_name: 'preparation_desc',  location: 'preparations',         value: ''},
    konsulta_medicine_code: {var_name: 'medicine_desc',     location: 'konsulta-medicines',   value: ''}
  }

  identify(index, item) {
    // console.log(item)
    return item.id
  }

  show_form: boolean = false;

  onSubmit(){
    Object.entries(this.prescriptions).forEach(([key, value], index) => {
      let values: any = value;

      if(values.dispense_quantity > 0){
        let params = {
          patient_id: values.patient_id,
          dispensing_date: this.dispensing_date,
          prescription_id: values.id,
          dispense_quantity: values.dispense_quantity,
          remarks: values.remarks,
          unit_price: 0,
          total_amount: 0
        }

        console.log(params);
        this.http.post('medicine/dispensing', params).subscribe({
          next: (data: any) => {
            console.log(data)
          },
          error: err => console.log(err)
        })
      }
    })
  }

  getValues(items){
    Object.entries(items).forEach(([key, value], index) => {
      let values: any = value;

      Object.entries(this.libraries).forEach(([k, v], i) => {
        // console.log(i)
        items[key]['dispense_quantity'] = null;
        items[key]['remarks'] = null;
        if(k === 'konsulta_medicine_code' && !values[k]){

        } else {
          this.http.get('libraries/'+v.location+'/'+values[k]).subscribe({
            next: (data: any) => {
              items[key][v.var_name] = data.data.desc
            },
            error: err => console.log(err)
          })
        }
      });
    });
    return items;
  }

  dispensed_list = [];
  getDispensePrescription() {
    Object.entries(this.prescriptions).forEach(([key, value], index) => {
      let values: any = value;
      let result = this.dispensed.find(item => item.prescription_id === values.id)

      if(result) {
        values['dispense_quantity'] = result.dispense_quantity;
        values['dispensing_date'] = result.dispensing_date;
        values['remarks'] = result.remarks;

        this.dispensed_list.push(values);
        this.prescriptions.splice(key, 1)
      }

      if(this.prescriptions.length-1 === index) this.show_form = true;
    });
    console.log(this.dispensed_list);
    // this.show_form = true;
  }

  getDispense(id){
    let params = {patient_id: id};
    this.http.get('medicine/dispensing', {params}).subscribe({
      next: (data: any) => {
        this.dispensed = data.data;
        this.show_form = true;
        // this.getDispensePrescription();
      },
      error: err => console.log(err)
    })
  }

  getPresciptions(id){
    let params = {patient_id: id};
    this.http.get('medicine/prescriptions', {params}).subscribe({
      next: (data: any) => {
        this.prescriptions = this.getValues(data.data);
        this.getDispense(this.route.snapshot.paramMap.get('id'))
      },
      error: err => console.log(err)
    })
  }

  patientInfo(info){
    this.patient_details = info;
  }

  modal = [];
  selected_lab: any;

  toggleModal(form, lab?){
    this.selected_lab = lab;
    this.modal[form] = !this.modal[form];
    if(this.modal[form] === false) this.selected_lab = null;
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.getPresciptions(this.route.snapshot.paramMap.get('id'));
    // this.getDispense(this.route.snapshot.paramMap.get('id'));
  }
}
