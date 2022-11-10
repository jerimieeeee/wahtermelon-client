import { Component, OnInit } from '@angular/core';
import { faQuestionCircle, faChevronDown, faFolderOpen, faHeart, faFlask, faNotesMedical, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

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

  today_consults = [/*
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
   */]
  constructor() { }

  ngOnInit(): void {
  }

}
