import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-uploaded-xml',
    templateUrl: './uploaded-xml.component.html',
    styleUrls: ['./uploaded-xml.component.scss'],
    standalone: false
})
export class UploadedXmlComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() xml_to_view;

  is_loading: boolean = false;
  faSpinner = faSpinner;
  show_form: boolean = false;

  enlistments: any = [];
  accordion: any = [];

  toggleAccordion(name){
    this.accordion[name] = !this.accordion[name]
  }

  closeModal(){
    this.toggleModal.emit({name: 'uploaded-xml', data: null});
  }

  constructor() { }


  ngOnInit(): void {
    this.show_form = true;
  }

}
