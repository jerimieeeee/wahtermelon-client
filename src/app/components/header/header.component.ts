import { Component, OnInit } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faChevronCircleDown = faChevronCircleDown;
  faBell = faBell;
  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
