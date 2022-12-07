import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faFloppyDisk, faPlusSquare, faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-complaint-history',
  templateUrl: './complaint-history.component.html',
  styleUrls: ['./complaint-history.component.scss']
})
export class ComplaintHistoryComponent implements OnInit, OnChanges {
  @Input() toggle_content;
  @Input() consult_details;

  faPlusSquare = faPlusSquare;
  faFloppyDisk = faFloppyDisk;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;

  complaints$: Observable<any[]>;
  selectedComplaint = [];

  show_content: boolean = true;

  onSubmit(){
    console.log(this.selectedComplaint);

    if(Object.keys(this.selectedComplaint).length > 0) this.saveComplaints();
  }

  saveNotes(){

  }

  saveComplaints() {
    let submit_complaints = [];

    Object.entries(this.selectedComplaint).forEach(([keys, value], index) => {
      console.log(value);
      submit_complaints.push(value.complaint_id);
    });

    let complaint = {
      notes_id: this.consult_details.consult_notes[0].id,
      consult_id: this.consult_details.id,
      patient_id: this.consult_details.patient.id,
      complaints: submit_complaints
    }

    this.http.post('consultation/cn-complaint', complaint).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: err => console.log(err)
    })
    console.log(submit_complaints);
  }

  loadLib(){
    this.http.get('libraries/complaint').subscribe(
      (data: any) => {
        this.complaints$ = of(data.data)
      }
    );
  }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadLib();
  }
}
