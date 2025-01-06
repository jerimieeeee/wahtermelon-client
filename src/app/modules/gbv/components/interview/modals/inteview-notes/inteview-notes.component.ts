import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-inteview-notes',
    templateUrl: './inteview-notes.component.html',
    styleUrls: ['./inteview-notes.component.scss'],
    standalone: false
})
export class InteviewNotesComponent implements OnInit{
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_notes;
  @Input() intake_id;
  @Input() patient_id;

  is_saving: boolean = false;
  show_error: boolean = false;

  perpetrators: any;


  onSubmit(){
    console.log(this.interviewForm.value);
    let query;

    this.interviewForm.patchValue({
      interview_datetime: formatDate(this.interviewForm.value.interview_datetime, 'yyyy-MM-dd HH:mm:ss', 'en', 'Asia/Manila')
    });

    if(this.interviewForm.value.id) {
      query = this.http.update('gender-based-violence/patient-gbv-interview-summary/', this.interviewForm.value.id, this.interviewForm.value);
    } else {
      query = this.http.post('gender-based-violence/patient-gbv-interview-summary', this.interviewForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Successfully recorded!', 'Interview Summary');
        this.closeModal();
      }
    })
  }

  interviewForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    intake_id : new FormControl<string| null>(''),
    summary_type : new FormControl<string| null>(''),
    interview_datetime : new FormControl<string| null>(''),
    interview_place: new FormControl<string| null>(''),
    alleged_perpetrator: new FormControl<string| null>(''),
    interview_notes: new FormControl<string| null>(''),
  });

  createForm(){
    this.interviewForm = this.formBuilder.group({
      id: [null],
      patient_id: [this.patient_id],
      intake_id : [this.intake_id],
      summary_type : [this.selected_notes.act_title],
      interview_datetime : [null],
      interview_place: [null],
      alleged_perpetrator: [null],
      interview_notes: [null],
    });

    if(this.selected_notes.data) {
      this.patchData();
    }
  }

  patchData(){
    this.interviewForm.patchValue({...this.selected_notes.data})
  }

  loadPerpetrators(){
    let params = {
      intake_id: this.intake_id
    }
    this.http.get('gender-based-violence/patient-gbv-perpetrator', {params}).subscribe({
      next: (data: any) => {
        console.log(data)
        this.perpetrators = data.data;
        this.createForm();
      },
      error: err => console.log(err)
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.interviewForm.controls;
  }

  closeModal(){
    this.toggleModal.emit('interview_notes');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.selected_notes)
    this.loadPerpetrators();
  }
}
