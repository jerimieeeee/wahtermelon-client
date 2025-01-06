import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    standalone: false
})
export class FeedbackComponent{
  faArrowLeft = faArrowLeft;

  question_list: [];
  numbers: any[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 'delete', 0, 'clear'
  ];
  consultationId: string = "";
  show_survey: boolean = false;
  show_invalid: boolean = false;
  concat(value: any) {
    if(typeof(value) === 'number') this.consultationId = this.consultationId+""+value;
    if(value === 'delete') this.consultationId = this.consultationId.substring(0, this.consultationId.length - 1)
    if(value === 'clear') this.consultationId = "";
  }

  checkVisitFeedback() {
    this.show_invalid = false;
    this.show_survey = false;

    this.http.get('consultation/records/'+this.consultationId).subscribe({
      next: (data: any) => {
        if(data.for_feedback) {
          this.show_survey = true;
        } else {
          this.show_invalid = true;
        }
      },
      error: () => { this.show_invalid = true; }
    })
    // this.show_survey = true;
  }

  toggleSurveyForm() {
    console.log('test')
    this.consultationId = '';
    this.show_survey = false;
  }

  constructor(
    private http: HttpService,
  ) { }
}
