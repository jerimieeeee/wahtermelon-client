import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit{

  question_list: [];
  numbers: any[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 'delete', 0, 'clear'
  ]

  consultationId: string = "";
  concat(value: any) {
    if(typeof(value) === 'number') this.consultationId = this.consultationId+""+value;


    if(value === 'delete') {

    }

    if(value === 'clear') this.consultationId = "";
  }

  checkVisitFeedback() {

  }

  onSubmit() {

  }

  nextQuestion() {

  }

  loadLibraries() {
    this.http.get('libraries/feedback-question').subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.question_list = data.data;
      },
      error: err => { this.http.showError(err.error.message, 'Feedback Questions'); }
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
