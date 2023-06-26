import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { faSave, faCircleNotch, faSearch, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pbef',
  templateUrl: './pbef.component.html',
  styleUrls: ['./pbef.component.scss']
})
export class PbefComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_case;

  getPbef(){
    let params = {
      program_code: '',
      member_pin: '',
      member_last_name: '',
      member_first_name: '',
      member_middle_name: '',
      member_suffix_name: '',
      member_birthdate: '',
      patient_is: '',
      admission_date: '',
      discharge_date: '',
      patient_last_name: '',
      patient_first_name: '',
      patient_middle_name: '',
      patient_suffix_name: '',
      patient_birthdate: '',
      patient_gender: ''
    }

    this.http.post('eclaims/check-claim-eligibility', params).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: err => console.log(err)
    })
  }

  closeModal() {
    this.toggleModal.emit('pbef');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.http.getPatientInfo());
      // console.log('test');
  }
}
