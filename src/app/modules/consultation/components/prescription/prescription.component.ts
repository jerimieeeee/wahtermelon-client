import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit, OnChanges {
  @Input() toggle_content;

  show_content: boolean = true;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
