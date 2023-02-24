import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { faPlusSquare, faChevronCircleDown, faChevronCircleUp, faSpinner, faSave } from '@fortawesome/free-solid-svg-icons';
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

  faPlusSquare = faPlusSquare;
  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;

  complaints: Observable<any[]>;
  selectedComplaint = [];
  consult_notes = {
    complaint: null,
    history: null
  }

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
          console.log(data);
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
          console.log(data);
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

  showToastr(){
    this.toastr.success('Successfully updated!','Complaint');
  }

  loadLib(){
    this.http.get('libraries/complaint').subscribe(
      (data: any) => {
        this.complaints = data.data;
      }
    );
  }

  loadSelected(){
    let selected_complaints = [];
    console.log(this.consult_details.consult_notes.complaints);
    if(this.consult_details.consult_notes && this.consult_details.consult_notes.complaints){
      Object.entries(this.consult_details.consult_notes.complaints).forEach(([key, value], index) => {
        let val: any = value;
        selected_complaints.push(val.complaint_id);
      });
    };
    this.selectedComplaint = selected_complaints;
  }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    if(this.consult_details) {
      this.loadSelected();
      this.consult_notes = this.consult_details.consult_notes;
      this.consult_done = this.consult_details.consult_done;
    }
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLib();
  }
}
