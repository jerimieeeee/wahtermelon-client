import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faQuestionCircle, faChevronDown, faFolderOpen, faHeart, faFlask, faNotesMedical, faExclamationCircle, faChevronRight, faChevronLeft, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-todays-consult',
  templateUrl: './todays-consult.component.html',
  styleUrls: ['./todays-consult.component.scss']
})
export class TodaysConsultComponent implements OnInit {
  faQuestionCircle = faQuestionCircle;
  faChevronDown = faChevronDown;
  faFolderOpen = faFolderOpen;
  faHeart = faHeart;
  faFlask = faFlask;
  faNotesMedical = faNotesMedical;
  faExclamationCircle = faExclamationCircle;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  today_consults: [];

  per_page: number = 10;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;

  getTodaysConsult(page?: number){
    let params = {params: { }};
    if (page) params['params']['page'] = page;
    params['params']['include'] = 'barangay';
    params['params']['per_page'] = this.per_page;
    params['params']['consult_done'] = 0;

    this.http.get('consultation/records', params).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.today_consults = data.data;

        this.current_page = data.meta.current_page;
        this.last_page = data.meta.last_page;
        this.from = data.meta.from;
        this.to = data.meta.to;
        this.total = data.meta.total;
      },
      error: err => console.log(err)
    })
  }

  onPageChange(page){

  }

  openItr(patient_id, ptgroup, id){
    // console.log(patient_id)
    if(ptgroup === 'itr'){
      this.router.navigate(['/'+ptgroup, {id: patient_id}]);
    } else {
      this.router.navigate(['/'+ptgroup, {id: patient_id, consult_id: id}]);
    }
  }

  getDataDiff(consult_date) {
    let endDate = new Date();
    let startDate = new Date(consult_date);
    let x = endDate.getTime();
    let y = startDate.getTime();
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    // var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));

    let duration_day = days ? days + ' days': '';;
    let duration_hours = hours ? hours + ' hours': '';
    let duration_minutes = minutes ? minutes + ' minutes': '';
    return duration_day+' '+duration_hours+' '+duration_minutes;
    // return { day: days, hour: hours, minute: minutes, second: seconds };
  }

  getVisitType(group){
    switch(group){
      case 'cn':
        return 'Consultation';
      case 'cc':
        return 'Child Care';
      case 'mc':
        return 'Maternal Care';
      case 'dn':
        return 'Dental';
      case 'ncd':
        return 'Non Communicable Disease';
    }
  }

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
  }

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTodaysConsult();
  }

}
