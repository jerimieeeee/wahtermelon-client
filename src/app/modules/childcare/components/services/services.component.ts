import { Component, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  
  services2 : any

  checkBoxValue: any = false;

  saved: boolean;

  faSearch = faSearch;
  faPlus = faPlus;

  form: FormGroup;

  eservices: Array <any> = [
    { id: 1, name: 'Cord Clamping', checked: false},
    { id: 2, name: 'Drying', checked: false},
    { id: 3, name: 'Non-Separation', checked: false},
    { id: 4, name: 'Prophylaxis', checked: false},
    { id: 5, name: 'Skin to Skin', checked: false},
    { id: 6, name: 'Vitamin K', checked: false},
    { id: 7, name: 'Weighing', checked: false},
  ];

 showEssentialModal = false;
  toggleEssentialModal(){
    this.showEssentialModal = !this.showEssentialModal;
  }

  showServiceModal = false;
  toggleServiceModal(){
    this.showServiceModal = !this.showServiceModal;
  }

  showVaccineModal = false;
  toggleVaccineModal(){
    this.showVaccineModal = !this.showVaccineModal;
  }

  onCheckboxChange(e: any) {
    const eServices: FormArray = this.form.get('eServices') as FormArray;
    if (e.target.checked) {
      eServices.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      eServices.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          eServices.removeAt(i);
          return;
        }
        i++;
        
      });
    }
  }

  submitForm() {
    console.log(this.form.value);
    localStorage.setItem('eservice', JSON.stringify(this.form.value));
  }
  

  constructor(private fb: FormBuilder) { 
    
    this.form = this.fb.group({
      eServices: this.fb.array([], [Validators.required]),
    });
    
    
    

    this.services2 = [
      { id: 1, name: 'Complimentary Feeding', checked: false},
      { id: 2, name: 'Dental Check-up', checked: false},
      { id: 3, name: 'Newborn Hearing Screening', checked: false},
      { id: 4, name: 'Iron Intake', checked: false},
      { id: 5, name: 'Received Micronutrient Powder (MNP)', checked: false},
      { id: 6, name: 'Newborn Screening (Referred)', checked: false},
      { id: 7, name: 'Newborn Screening (Done)', checked: false},
      { id: 8, name: 'Vitamin A', checked: false},
      { id: 9, name: 'Deworming', checked: false},
    ]


  }

  public service_list = [];

  

  ngOnInit(): void {
  }
}
