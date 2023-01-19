import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-uploaded-xml',
  templateUrl: './uploaded-xml.component.html',
  styleUrls: ['./uploaded-xml.component.scss']
})
export class UploadedXmlComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() xmlData;

  is_loading: boolean = false;
  faSpinner = faSpinner;
  show_form: boolean = false;

  enlistments: any = [];
  loadData(){
    let enlist_arr = []
    Object.entries(this.xmlData.PCB.ENLISTMENTS).forEach(([key, value], index) => {
      // patient_id.push(key)
      let val: any = [value];
      console.log(val)
      enlist_arr.push(val[0])
    })
    console.log(enlist_arr)
    this.enlistments = enlist_arr[0].length > 1 ? enlist_arr[0] : enlist_arr;
    console.log(this.enlistments)
    this.show_form = true;
  }

  closeModal(){
    this.toggleModal.emit({name: 'uploaded-xml', data: this.enlistments});
  }

  constructor() { }


  ngOnInit(): void {
    this.enlistments = this.xmlData.PCB.ENLISTMENTS;
    console.log(this.enlistments)
    console.log(typeof this.enlistments)
    setTimeout(() => {
      this.loadData();
    }, 3000);
  }

}
