import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-consult-history',
  templateUrl: './consult-history.component.html',
  styleUrls: ['./consult-history.component.scss']
})
export class ConsultHistoryComponent implements OnInit, OnChanges {
  @Input() toggle_content;

  show_content: boolean = false;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;

  patient_id: string;
  consult_id: string;
  visit_list: any;

  loadPreviousVisit(){
    let params = {
      patient_id: this.patient_id,
      per_page: 'all',
      sort: '-consult_date',
      pt_group: 'cn'
    };

    this.http.get('consultation/records',{params}).subscribe({
      next: (data: any) => {
        this.visit_list = data.data;
        console.log(data.data);
      },
      error: err => console.log(err),
    })
  }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.loadPreviousVisit();
  }

}
