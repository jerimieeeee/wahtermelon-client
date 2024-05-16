import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faAnglesLeft, faAnglesRight, faCircleXmark, faSearch} from "@fortawesome/free-solid-svg-icons";
import {HttpService} from "../../../../../shared/services/http.service";

@Component({
  selector: 'app-final-dx',
  templateUrl: './final-dx.component.html',
  styleUrls: ['./final-dx.component.scss']
})
export class FinalDxComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() show_patient_data: any;
  // @Input() pending_fdx: any;

  closeModal() {
    this.toggleModal.emit();
  }

  ngOnInit(): void {
    // this.getData();
    console.log(this.show_patient_data, 'amen5u');
  }

  protected readonly faAnglesRight = faAnglesRight;
  protected readonly faAnglesLeft = faAnglesLeft;
  protected readonly Number = Number;
  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faSearch = faSearch;
}
