import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

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

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
