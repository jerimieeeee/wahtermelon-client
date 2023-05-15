import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { faPlusSquare, faChevronCircleDown, faChevronCircleUp, faSpinner, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-complaint-history',
  templateUrl: './complaint-history.component.html',
  styleUrls: ['./complaint-history.component.scss']
})
export class ComplaintHistoryComponent implements OnInit, OnChanges {
  @Output() loadConsult = new EventEmitter<any>();
  @Input() toggle_content;
  @Input() consult_details;
  @Input() have_complaint;
  @Input() allowed_to_edit;

  faPlusSquare = faPlusSquare;
  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;
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
      }
    );
  }

  gbv_complaints: any;
  loadSelected(){
    this.gbv_complaints = [];
    this.possible_gbv_case = false;
    let selected_complaints = [];
    // console.log(this.consult_details);
    if(this.consult_details.consult_notes && this.consult_details.consult_notes.complaints){
      Object.entries(this.consult_details.consult_notes.complaints).forEach(([key, value], index) => {
        let val: any = value;
        selected_complaints.push(val.complaint_id);

        if(val.lib_complaints.gbv_library_status === 1) {
          this.possible_gbv_case = true;
          this.gbv_complaints.push(val.complaint_id);
        }
      });
    };
    this.selectedComplaint = selected_complaints;
  }

  enable_edit: boolean = false;
  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    if(this.consult_details) {
      this.loadSelected();
      this.consult_notes = this.consult_details.consult_notes;
      this.consult_done = this.consult_details.consult_done;
      // this.enable_edit = this.consult_details.
    }
  }

  toggleModal(name) {
    this.modals[name] = !this.modals[name];
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLib();
  }
}
