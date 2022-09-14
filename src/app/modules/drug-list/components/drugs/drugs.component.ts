import { Component, OnInit } from '@angular/core';
import { faSearch, faBalanceScale, faPlus, faCalendar, faInfoCircle, faCircleNotch, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent implements OnInit {

  faSearch = faSearch;
  faPlus = faPlus;
  faClose = faClose


  is_searching: boolean = true;
  is_searching2: boolean = false;

  is_searching3: boolean = true;
  is_searching4: boolean = false;

  filterTerm!: string;
  filterTerm2!: string;

  showDrugListModal = false;
  showAddDrugModal = false;
  
  toggleDrugListModal(){
    this.showDrugListModal = !this.showDrugListModal;
  }

  toggleAddDrugModal(){
    this.showAddDrugModal = !this.showAddDrugModal;
    this.showDrugListModal = !this.showDrugListModal;
  }

  toggleCloseModal(){
    this.showAddDrugModal = !this.showAddDrugModal
    this.toggleSearchRev();
    this.toggleSearchRev2();
  }

  toggleSearch(){
    this.is_searching = false;
    this.is_searching2= true;
  }

  toggleSearch2(){
    this.is_searching3 = false;
    this.is_searching4= true;
  }

  toggleSearchRev(){
    this.is_searching = true;
    this.is_searching2= false;
    this.filterTerm = null;
  }

  toggleSearchRev2(){
    this.is_searching3 = true;
    this.is_searching4= false;
    this.filterTerm2 = null;
  }

  lib_drugs = [
    {code: '01', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '02', bname: 'Cephalexin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '03', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '04', bname: 'Biogeic', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '05', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '06', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '07', bname: 'Cephalexin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '08', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '09', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '10', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '12', bname: 'Cephalexin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '13', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '14', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '15', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '16', bname: 'Cephalexin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '17', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '18', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '19', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '20', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '21', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '22', bname: 'Cephalexin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '23', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '24', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '25', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '26', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '27', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '28', bname: 'Cephalexin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '29', bname: 'Cephalexin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '30', bname: 'Bio-Flu', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
    {code: '31', bname: 'Citirizin', gname:'Vitamin B', drugstr:'250mg', drugf:'Capsule', dosage:'2.00', dosageuom:'mG', dosagereg:'OD', duration:'2', frequency: 'Week'},
  ];

  constructor() { 

    document.addEventListener('keydown', evt => {
      if (evt.key === 'Escape') {
        this.showDrugListModal = false;
        this.showAddDrugModal = false;
      }
  });
  
  }

  ngOnInit(): void {
  }

}
