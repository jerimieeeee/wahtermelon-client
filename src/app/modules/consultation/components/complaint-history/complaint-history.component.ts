import { Component, OnInit } from '@angular/core';
import { faFloppyDisk, faPlusSquare, faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-complaint-history',
  templateUrl: './complaint-history.component.html',
  styleUrls: ['./complaint-history.component.scss']
})
export class ComplaintHistoryComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faFloppyDisk = faFloppyDisk;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;

  complaints$: Observable<any[]>;
  selectedComplaint = [];

  show_content: boolean = true;

  onSubmit(){

  }

  loadLib(){
    this.http.get('libraries/complaint').subscribe(
      (data: any) => {
        this.complaints$ = of(data.data)
      }
    );
  }

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadLib();
  }
}
