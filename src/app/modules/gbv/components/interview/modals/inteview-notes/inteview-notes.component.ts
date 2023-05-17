import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inteview-notes',
  templateUrl: './inteview-notes.component.html',
  styleUrls: ['./inteview-notes.component.scss']
})
export class InteviewNotesComponent {
  @Output() getPatientTbHistory = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Output() switchPage = new EventEmitter<any>();
  @Input() selected_tb_consult;
  @Input() max_date;

  is_saving: boolean = false;
  show_error: boolean = false;

  perpetrators: any;


  onSubmit(){

  }

  interviewForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    intake_id : new FormControl<string| null>(''),
    interview_datetime : new FormControl<string| null>(''),
    interview_place: new FormControl<string| null>(''),
    alleged_perpetrator: new FormControl<string| null>(''),
    interview_notes: new FormControl<string| null>(''),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.interviewForm.controls;
  }

  closeModal(){
    this.toggleModal.emit('add_interview_notes');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }
}
