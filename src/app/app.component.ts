import { Component } from '@angular/core';
import { faChevronCircleDown, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wahtermelon-client';
  faChevronCircleDown = faChevronCircleDown;
  faBell = faBell;
  faSearch = faSearch;

}
