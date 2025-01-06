import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBook, faBookOpen, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss'],
    standalone: false
})
export class SupportComponent implements OnInit {
  faBook = faBook;
  faBookOpen = faBookOpen;
  faEnvelope = faEnvelope;
  faEnvelopeOpen = faEnvelopeOpen

  locations = [
    {
      loc: 'ticketing',
      name: 'Tickets',
      icon: faEnvelope
    },
    {
      loc: 'manual',
      name: 'Documentation',
      icon: faBook
    }
  ]

  selected_route: string;

  navigateTo(loc){
    console.log(loc)
    this.selected_route = loc;
    this.router.navigate(['/support/'+loc]);
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    if(url[2]) this.selected_route = url[2];
  }
}
