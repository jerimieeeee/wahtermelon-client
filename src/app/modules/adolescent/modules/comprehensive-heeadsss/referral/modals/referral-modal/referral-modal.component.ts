import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { faSave, faChevronCircleUp, faChevronCircleDown, faSpinner, faChevronUp, faChevronDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-referral-modal',
  templateUrl: './referral-modal.component.html',
  styleUrl: './referral-modal.component.scss',
  standalone: false
})
export class ReferralModalComponent implements OnInit {
@Output() toggleModal = new EventEmitter<any>();
@Input() client_types: any;

faSave = faSave;
faChevronCircleUp = faChevronCircleUp;
faChevronCircleDown = faChevronCircleDown;
faSpinner = faSpinner;
faChevronUp = faChevronUp;
faChevronDown = faChevronDown;
faCircleNotch = faCircleNotch;

show_content: boolean = true;
is_saving: boolean = false;
toggle_content: boolean = true;

referralForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    asrh_id: new FormControl<string| null>(''),
    referral_date: new FormControl<string| null>(''),
    referral_to: new FormControl<string| null>(''),
    remarks: new FormControl<string| null>(''),
  });

closeModal(){
  this.toggleModal.emit('referral');
}

validateForm(){
    this.referralForm = this.formBuilder.group({
      id: [''],
      patient_id: ['', [Validators.required, Validators.minLength(1)]],
      asrh_id: ['', [Validators.required, Validators.minLength(1)]],
      referral_date: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]],
      referral_to: ['', [Validators.required, Validators.minLength(1)]],
      remarks: ['', [Validators.required, Validators.minLength(1)]],

    });
  //  this.disableForm();
  //  this.disableForm2();
  //  this.disableForm3();
  //  this.patchData();
  //  this.show_form = true;
  }

// loadLibraries() {
//     const getCompre = this.http.get('libraries/comprehensive');
//     const getClient = this.http.get('libraries/asrh-client-type');

//     forkJoin([getCompre, getClient]).subscribe({
//       next: ([dataCompre, dataClient]: any) => {
//         this.compre_questions = dataCompre.data;
//         this.client_types = dataClient.data;
//         console.log(this.compre_questions, this.client_types, 'libraries')
//       },
//       error: err => console.log(err)
//     });
//   }

constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

ngOnInit(): void {
  this.validateForm();
  // console.log(this.client_types)
}
}
