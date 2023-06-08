import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-physical-examination',
  templateUrl: './physical-examination.component.html',
  styleUrls: ['./physical-examination.component.scss']
})
export class PhysicalExaminationComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;
  show_error: boolean = false;
  locations = [];
  types = [];


  onSubmit(){}

  closeModal(){
    this.toggleModal.emit('physical-examination');
  }

  ngOnInit() {
   this.locations=[
    {id: "01", name:"Head"},
    {id: "02", name:"Ears"},
    {id: "03", name:"Dysuria"},
    {id: "04", name:"Oral Cavity"},
    {id: "05", name:"Eyes"},
    {id: "06", name:"Retina"},
    {id: "07", name:"Nose"},
    {id: "08", name:"Mouth, Lips"},
    {id: "09", name:"Neck"},
    {id: "10", name:"Chest"},
    {id: "11", name:"Abdomen"},
    {id: "12", name:"Back"},
    {id: "13", name:"Flanks"},
    {id: "14", name:"Buttocks"},
    {id: "15", name:"Extremities"},
    {id: "16", name:"Internal Organ"},
    {id: "16", name:"Other"},
   ]

   this.types=[
    {id: "01", name:"Abrasion"},
    {id: "02", name:"Bite"},
    {id: "03", name:"Bleeding"},
    {id: "04", name:"Bruise"},
    {id: "05", name:"Bum"},
    {id: "06", name:"Discharge, pus"},
    {id: "07", name:"Discharge, serous"},
    {id: "08", name:"Fracture"},
    {id: "09", name:"Hair Loss"},
    {id: "10", name:"Hematoma"},
    {id: "11", name:"Hemorrhage"},
    {id: "12", name:"Laceration"},
    {id: "13", name:"Mark, scar"},
    {id: "14", name:"Petechiae"},
    {id: "15", name:"Rash"},
    {id: "16", name:"Redness"},
    {id: "16", name:"Swelling"},
    {id: "16", name:"Tooth Damage"},
    {id: "16", name:"Tenderness"},
    {id: "16", name:"Other"},
   ]
  }
  
}