import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faQuestionCircle, faChevronDown, faFolderOpen, faHeart, faFlask, faNotesMedical, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
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

  today_consults = [
    {
      id: "/itr",
      first_name: "Dal-mi",
      last_name: "Seo",
      address: "Gwangju, South Korea",
      visit_type: "General Consult",
      location: "Physician",
      duration: "1 hour 45 mins",
      img_name: "profile_2.jpg"
    },
    {
      id: "/itr",
      first_name: "Ji-Pyeong",
      last_name: "Han",
      address: "Seoul, South Korea",
      visit_type: "General Consult",
      location: "Physician",
      duration: "1 hour 38 mins",
      img_name: "003.jpg"
    },
    {
      id: "/itr",
      first_name: "Do-san",
      last_name: "Nam",
      address: "Seoul, South Korea",
      visit_type: "General Consult",
      location: "Physician",
      duration: "1 hour 25 mins",
      img_name: "004.jpg"
    },
    {
      id: "/itr",
      first_name: "Chul-san",
      last_name: "Lee",
      address: "Seoul, South Korea",
      visit_type: "General Consult",
      location: "Physician",
      duration: "1 hour 24 mins",
      img_name: "005.jpg"
    },
    {
      id: "/itr",
      first_name: "Yong-san",
      last_name: "Kim",
      address: "Seoul, South Korea",
      visit_type: "General Consult",
      location: "Physician",
      duration: "1 hour 23 mins",
      img_name: "006.jpg"
    },
    {
      id: "/itr",
      first_name: "Sa-Ha",
      last_name: "Jung",
      address: "Seoul, South Korea",
      visit_type: "General Consult",
      location: "Physician",
      duration: "1 hour 12 mins",
      img_name: "007.jpg"
    },
  ]

  getInitials(string) {
    return [...string.matchAll(/\b\w/g)].join('')
  }

  getTodaysConsult(){
    this.http.get('consultation/cn-records',{params:{consult_done: 0}}).subscribe({
      next: (data: any) => {
        this.today_consults = data.data;
        console.log(data);
      },
      error: err => console.log(err)
    })
  }

  openItr(patient_id){
    console.log(patient_id)
    this.router.navigate(['/itr', {id: patient_id}]);
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
        break;
      case 'cc':
        return 'Child Care';
        break;
      case 'mc':
        return 'Maternal Care';
        break;
      case 'dn':
        return 'Dental';
        break;
      case 'ncd':
        return 'Non Communicable Disease';
        break;
    }
  }

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTodaysConsult();
  }

}
