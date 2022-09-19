import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  is_saving: boolean = false;

  constructor() { }

  saveConsult(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  ngOnInit(): void {
  }

}
