import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ekas',
  templateUrl: './ekas.component.html',
  styleUrls: ['./ekas.component.scss']
})
export class EkasComponent implements OnInit, OnDestroy {
  @Output() toggleModal = new EventEmitter<any>();

  faPrint = faPrint;

  timeout:any;
  printForm(form_name) {
    let printContents = document.getElementById(form_name).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    this.timeout = setTimeout(() => {
      window.print();
      document.body.innerHTML = originalContents;
    }, 250)
    // window.print();
    // document.body.innerHTML = originalContents;
  }

  closeModal(){
    this.toggleModal.emit('ekas');
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.timeout.unsubscribe();
  }
}
