import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { rapidForm } from './rapidForm';

@Component({
    imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
    selector: 'app-rapid-onsite',
    templateUrl: './rapid-onsite.component.html',
    styleUrls: ['./rapid-onsite.component.scss']
})
export class RapidOnsiteComponent implements OnInit{

  rapidForm = rapidForm;

  connectivity_list = [
    { question: 'Do all WAH end-users have signed an NDA?', var_name: 'nda'},
    { question: 'Does the facility have the NPC Certification displayed?', var_name: 'npc'},
    { question: 'Is the Facility using the updated MHD-WAH Patient Consent (ver. 07.2024)', var_name: 'consent'}
  ];

  onSubmit() {

  }

  closeModal() {

  }

  ngOnInit(): void {
    console.log('test')
  }
}
