import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { faPlusSquare, faSave } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleDown, faChevronCircleUp, faCircleNotch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-complaint-history',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgSelectModule],
  templateUrl: './complaint-history.component.html',
  styleUrls: ['./complaint-history.component.scss']
})
export class ComplaintHistoryComponent implements OnInit {
  @Output() loadConsult = new EventEmitter<any>();
  @Input() toggle_content;
  @Input() consult_details;
  @Input() have_complaint;
  @Input() allowed_to_edit;

  faPlusSquare = faPlusSquare;
  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faCircleNotch = faCircleNotch;
  faXmark = faXmark;

  complaints: Observable<any[]>;
  selectedComplaint = [];
  consult_notes = {
    complaint: null,
    history: null
  }

  modals: any = [];

  show_content: boolean = true;
  is_saving: boolean = false;
  consult_done: boolean = false;
  show_form: boolean = false;
  onSubmit(){
    this.is_saving = true;

    if(this.selectedComplaint && Object.keys(this.selectedComplaint).length > 0){
      let complaint = {
        notes_id: this.consult_details.consult_notes.id,
        consult_id: this.consult_details.id,
        patient_id: this.consult_details.patient.id,
        complaints: this.selectedComplaint
      }

      this.http.post('consultation/complaint', complaint).subscribe({
        next: (data: any) => {
          this.saveNotes()
        },
        error: err => console.log(err)
      })
    } else {
      this.saveNotes();
    }
  }

  saveNotes(){
    if(this.consult_notes.complaint || this.consult_notes.history){
      let notes_remarks = {
        consult_id: this.consult_details.id,
        patient_id: this.consult_details.patient.id,
        complaint: this.consult_notes.complaint,
        history: this.consult_notes.history
      }

      this.http.update('consultation/notes/', this.consult_details.consult_notes.id, notes_remarks).subscribe({
        next: (data: any) => {
          this.is_saving = false;
          this.showToastr();
          this.loadConsult.emit();
        },
        error: err => console.log(err)
      })
    } else {
      this.is_saving = false;
      this.showToastr();
      this.loadConsult.emit();
    }
  }

  possible_gbv_case: boolean = false;

  checkGbvCoplaint(){

  }

  showToastr(){
    this.toastr.success('Successfully updated!','Complaint');
  }

  loadLib(){
    this.http.get('libraries/complaint').subscribe(
      (data: any) => {
        // console.log(data.data)
        this.complaints = data.data;
        this.loadSelected();
        this.show_form = true;
      }
    );
  }

  enable_edit: boolean = false;
  gbv_complaints: any;
  show_gbv_form: boolean = false;
  have_open_gbv: boolean = false;
  loadSelected(){
    this.gbv_complaints = [];
    this.show_gbv_form = false;
    this.possible_gbv_case = false;
    this.have_open_gbv = false;
    let selected_complaints = [];
    console.log(this.consult_details);
    if(this.consult_details.consult_notes && this.consult_details.consult_notes.complaints){
      Object.entries(this.consult_details.consult_notes.complaints).forEach(([key, value], index) => {
        let val: any = value;
        selected_complaints.push(val.complaint_id);

        if(val.lib_complaints.gbv_library_status === 1) {
          this.possible_gbv_case = true;
          this.gbv_complaints.push(val.complaint_id);
        }

        if((Object.keys(this.consult_details.consult_notes.complaints).length-1 === index) && this.possible_gbv_case){
          this.getPatientGbv();
        }
      });
    };
    this.selectedComplaint = selected_complaints;
  }

  getPatientGbv() {
    let params = {patient_id: this.consult_details.patient.id};
    this.http.get('gender-based-violence/patient-gbv', {params}).subscribe({
      next: (data: any) => {
        if(data.data.length > 0 && !data.data[0].outcome_date) this.have_open_gbv = true;
        this.show_gbv_form = true;
      },
      error: err => console.log(err)
    })
  }

  /* ngOnChanges(changes){
    this.show_content = this.toggle_content;
    if(this.consult_details) {
      if(this.complaints) {
        this.loadSelected();
      }
      this.consult_notes = this.consult_details.consult_notes;
      this.consult_done = this.consult_details.consult_done;
    }
  } */

  toggleModal(name) {
    this.modals[name] = !this.modals[name];

    if(name === 'gbv_referral') {
      this.getPatientGbv();
    }
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.consult_details)
    this.loadLib();

    this.allowed_to_edit = true;
  }
}
