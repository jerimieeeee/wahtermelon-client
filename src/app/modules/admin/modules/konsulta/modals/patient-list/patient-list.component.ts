import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  @Output() showReturn = new EventEmitter<any>();
  @Output() toggleList = new EventEmitter<any>();
  @Input() patient_list;

  constructor() { }


  closeModal(){
    this.toggleList.emit();
  }

  ngOnInit(): void {
    console.log(this.patient_list)
  }

}
