import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-first-visit',
  templateUrl: './first-visit.component.html',
  styleUrls: ['./first-visit.component.scss']
})

export class FirstVisitComponent implements OnInit {

  faSearch = faSearch;
  faBalanceScale = faBalanceScale;

  title ='localstorage';
  weight!: any;
  myform!: any;

  ngOnInit(){
   this.myform = new FormGroup({
     weight: new FormControl('')

   });

    this.display();
  }

  display() {
    this.weight = localStorage.getItem('formdata');  
  }

  onSubmit() {
    localStorage.setItem("formdata", JSON.stringify(this.myform.value));
  }

}
