import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';
import { faAnglesLeft, faAnglesRight, faChevronCircleDown, faChevronCircleUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-consult-history',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './consult-history.component.html',
  styleUrls: ['./consult-history.component.scss']
})
export class ConsultHistoryComponent implements OnInit {
  @Input() toggle_content;
  @Input() allowed_to_edit;

  show_content: boolean = false;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  patient_id: string;
  consult_id: string;
  visit_list: any;

  per_page: number = 5;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  loadPreviousVisit(page?: number){
    let params = {
      patient_id: this.patient_id,
      per_page: this.per_page,
      sort: '-consult_date',
      pt_group: 'dn',
      page: page,
      not_consult_id: this.consult_id
    };

    this.http.get('consultation/records',{params}).subscribe({
      next: (data: any) => {
        this.visit_list = data.data;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err),
    })
  }

  ngOnChanges(changes){
    // this.show_content = this.toggle_content;
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.patient_id = this.route.snapshot.paramMap.get('id');
    this.consult_id = this.route.snapshot.paramMap.get('consult_id');

    this.show_content = true;
    this.loadPreviousVisit(1);
  }
}
