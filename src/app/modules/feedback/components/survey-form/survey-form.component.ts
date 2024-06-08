import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  question_list: [{}];

  loadLibraries() {
    this.http.get('libraries/feedback-question').subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.question_list = data.data;
      },
      error: err => { this.http.showError(err.error.message, 'Feedback Questions'); }
    })
  }

  constructor (
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
