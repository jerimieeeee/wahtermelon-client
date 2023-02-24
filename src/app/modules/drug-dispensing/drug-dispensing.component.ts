import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleNotch, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drug-dispensing',
  templateUrl: './drug-dispensing.component.html',
  styleUrls: ['./drug-dispensing.component.scss']
})
export class DrugDispensingComponent implements OnInit {
  faDoorClosed = faDoorClosed;
  faCircleNotch = faCircleNotch;

  patient_details: any;
  prescriptions: any;
  dispensed: any;
  dispensing_date: string;
  consult_details: any;
  modal = [];
  dispensed_list = [];

  show_form: boolean = false;

  libraries = {
    dosage_uom:             {var_name: 'dosage_desc',       location: 'unit-of-measurements', value: ''},
    dose_regimen:           {var_name: 'regimen_desc',      location: 'dose-regimens',        value: ''},
    medicine_purpose:       {var_name: 'purpose_desc',      location: 'purposes',             value: ''},
    duration_frequency:     {var_name: 'frequency_desc',    location: 'duration-frequencies', value: ''},
    quantity_preparation:   {var_name: 'preparation_desc',  location: 'preparations',         value: ''},
    konsulta_medicine_code: {var_name: 'medicine_desc',     location: 'konsulta-medicines',   value: ''}
  }

  identify(index, item) {
    return item.id
  }

  onSubmit(){
    Object.entries(this.prescriptions).forEach(([key, value], index) => {
      let values: any = value;

      if(values.dispense_quantity > 0){
        let params = {
          patient_id: values.patient_id,
          dispensing_date: this.dispensing_date,
          prescription_id: values.id,
          dispense_quantity: values.dispense_quantity,
          remarks: values.remarks ? values.remarks : 'NA',
          unit_price: 0,
          total_amount: 0
        }

        this.http.post('medicine/dispensing', params).subscribe({
          next: (data: any) => {
            console.log(data)
            if(Object.keys(this.prescriptions).length-1 === index) {
              this.getPresciptions(this.route.snapshot.paramMap.get('id'));
              this.toastr.success('Successfully recorded!','Dispensing');
            }
          },
          error: err => console.log(err)
        })
      } else {
        if(Object.keys(this.prescriptions).length-1 === index) {
          this.getPresciptions(this.route.snapshot.paramMap.get('id'));
          this.toastr.success('Successfully recorded!','Dispensing');
        }
      }
    })
  }



  qtyDisp(pres){
    if(pres.dispensing) {
      let dispensed: number = 0;
      Object.entries(pres.dispensing).forEach(([key, value], index) => {
        let val: any = value;
        dispensed = dispensed + val.dispense_quantity
      });

      // console.log('dispensed_qty', pres.quantity, dispensed)
      pres.quantity = pres.quantity - dispensed;
    }

    return pres.quantity;
  }

  getQtyDisp(pres_length){
    if(pres_length >= 1) {
      if(pres_length === 1) {
        this.qtyDisp(this.prescriptions[0])
      } else {
        Object.entries(this.prescriptions).forEach(([key, value], index) => {
          this.qtyDisp(value);
        })
      }
    }
  }

  getDispense(id){
    let params = {patient_id: id};
    this.http.get('medicine/dispensing', {params}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        this.dispensed_list = data.data;
        this.fetchConsult(this.route.snapshot.paramMap.get('id'));

      },
      error: err => console.log(err)
    })
  }

  pres_length: number = 0;
  getPresciptions(id){
    let params = {patient_id: id, status: 'dispensing'};
    this.http.get('medicine/prescriptions', {params}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        this.prescriptions = data.data;
        this.pres_length = Object.keys(this.prescriptions).length;
        if(this.pres_length > 0) this.getQtyDisp(Object.keys(this.prescriptions).length);

        this.getDispense(this.route.snapshot.paramMap.get('id'))
      },
      error: err => console.log(err)
    })
  }

  patientInfo(info){
    this.patient_details = info;
  }

  checkValid(pres){
    if(pres.dispense_quantity > pres.quantity) pres.dispense_quantity = pres.quantity;
  }


  fetchConsult(id){
    let params = {
      consult_done: 0,
      patient_id: id,
      pt_group: 'cn',
      sort: '-consult_date'
    };

    this.http.get('consultation/records', {params}).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];
        this.show_form = true;
      },
      error: err => console.log(err)
    })
  }

  toggleModal(form){
    this.modal[form] = !this.modal[form];
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPresciptions(this.route.snapshot.paramMap.get('id'));
  }
}
