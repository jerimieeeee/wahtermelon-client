import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit{
  faPlus = faPlus;
  faEdit = faEdit;
  faSave = faSave;
  show_form: boolean = true;

  modals: any = [];

  intakeForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    patient_tb_id: new FormControl<string| null>(''),
    case_number: new FormControl<string| null>(''),
    enroll_as_code : new FormControl<string| null>(''),
    treatment_regimen_code : new FormControl<string| null>(''),
    registration_date: new FormControl<string| null>(''),
    treatment_start: new FormControl<string| null>(''),
    continuation_start: new FormControl<string| null>(''),
    treatment_end: new FormControl<string| null>(''),
    bacteriological_status_code : new FormControl<string| null>(''),
    anatomical_site_code : new FormControl<string| null>(''),
    eptb_site_id : new FormControl<string| null>(''),
    specific_site: new FormControl<string| null>(''),
    drug_resistant_flag: new FormControl<boolean| null>(false),
    ipt_type_code : new FormControl<string| null>(''),
    transfer_flag: new FormControl<boolean| null>(false),
    pict_date: new FormControl<string| null>(''),
  });

  toggleModal(name){
    this.modals[name] = !this.modals[name]
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.toggleModal('add_interview_notes')
  }
}
