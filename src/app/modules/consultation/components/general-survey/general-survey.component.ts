import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronCircleDown, faChevronCircleUp, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-general-survey',
  templateUrl: './general-survey.component.html',
  styleUrls: ['./general-survey.component.scss']
})
export class GeneralSurveyComponent implements OnInit {
  @Output() loadConsult = new EventEmitter<any>();
  @Input() toggle_content;
  @Input() consult_details;

  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;

  show_content: boolean = true;
  is_saving: boolean = false;
  consult_done: boolean = false;
  consult_notes: any;

  general_survey_code: any;
  general_survey_remarks: any;

  survey_list: any;

  onSubmit(){
    if(this.general_survey_code){
      let general_survey = {
          // notes_id: this.consult_details.consult_notes.id,
          consult_id: this.consult_details.id,
          patient_id: this.consult_details.patient.id,
          general_survey_code: this.general_survey_code,
          general_survey_remarks: this.general_survey_remarks,
      }

      console.log(general_survey)
      this.http.update('consultation/notes/', this.consult_details.consult_notes.id, general_survey).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success('Successfully recorded!','General Survey')
        }
      })
    } else {
      this.toastr.error('Missing general survey!')
    }
  }

  loadLib(){
    this.http.get('libraries/general-survey').subscribe(
      (data: any) => {
        console.log(data)
        this.survey_list = data.data;
      }
    );
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLib()
  }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    if(this.consult_details) {
      this.consult_notes = this.consult_details.consult_notes;
      this.consult_done = this.consult_details.consult_done;

      this.general_survey_code = this.consult_notes.general_survey_code
      this.general_survey_remarks = this.consult_notes.general_survey_remarks
    }

    console.log(this.consult_details)
  }

}
