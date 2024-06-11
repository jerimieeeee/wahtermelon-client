import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faArrowRight, faCircleNotch, faFaceFrown, faFaceLaughBeam, faFaceMeh } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  @Output() toggleSurveyForm = new EventEmitter<any>();
  @Input() consultationId: number;

  faCircleNotch = faCircleNotch;
  faSave = faSave;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  faFaceFrown = faFaceFrown;
  faFaceLaughBeam = faFaceLaughBeam;
  faFaceMeh = faFaceMeh;

  countdown: number = 5;
  show_form: boolean = false;
  question_length: number = 0;
  question_list: [{id: number, column_name: string, question: string}];
  question_index: number = 0;
  question_score: number[] = [1, 2, 3];
  feedback_answers: {
    consult_id: number,
    overall_score: number,
    cleanliness_score: number,
    behavior_score: number,
    time_score: number,
    quality_score: number,
    completeness_score: number,
    remarks: string
  };

  survey_completed: boolean = false;
  is_saving: boolean = false;

  onSubmit() {
    this.is_saving = true;
    this.http.post('consultation/feedback', this.feedback_answers).subscribe({
      next: (data: any) => {
        console.log(data);
        this.survey_completed = true;
        this.is_saving = false;

        this.startCountdown();
      },
      error: err => { this.http.showError(err.error.message, 'Consult Feedback'); }
    });
  }

  startCountdown() {
    const countdown$ = interval(1000).pipe(take(5));
    countdown$.subscribe({
      next: (value) => {
        this.countdown = 5 - (value + 1);
      },
      complete: () => {
        this.toggleSurveyForm.emit();
      }
    });
  }

  logScore(value:number) {
    this.feedback_answers[this.question_list[this.question_index].column_name] = value;
  }

  previousQuestion() {
    this.question_index -= 1;
  }

  nextQuestion() {
    this.question_index += 1;
  }

  loadLibraries() {
    this.http.get('libraries/feedback-question').subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.question_list = data.data;

        this.question_length = Object.keys(this.question_list).length;
        this.show_form = true;
      },
      error: err => { this.http.showError(err.error.message, 'Feedback Questions'); }
    })
  }

  constructor (
    private http: HttpService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.feedback_answers = {
      consult_id: this.consultationId,
      overall_score: null,
      cleanliness_score: null,
      behavior_score: null,
      time_score: null,
      quality_score: null,
      completeness_score: null,
      remarks: null
    };

    this.loadLibraries();
  }
}
