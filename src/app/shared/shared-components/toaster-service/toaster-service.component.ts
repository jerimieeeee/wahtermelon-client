import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toaster-service',
  templateUrl: './toaster-service.component.html',
  styleUrls: ['./toaster-service.component.scss']
})
export class ToasterServiceComponent implements OnInit {
  @Input() type;
  @Input() message;

  faCheck = faCheck;
  faXmark = faXmark;

  show = {
    success: false,
    error: false,
    warn: false
  }

  closeToaster(toast) {
    this.show[toast] = false;
  }

  constructor() { }

  closePrompt(prompt){
    setTimeout(() => {
      this.show[prompt] = false;
    }, 5000);
  }

  ngOnInit(): void {
    if(this.type == 'success' && this.message){
      this.show.success = true;
      // this.closePrompt('success');
    }
  }
}
