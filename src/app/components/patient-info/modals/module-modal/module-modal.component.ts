import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-modal',
  templateUrl: './module-modal.component.html',
  styleUrls: ['./module-modal.component.scss']
})
export class ModuleModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;

  list_modules = [
    {
      group: 'General',
      modules: [
        {
          name: 'Patient ITR',
          location: 'itr'
        },
        {
          name: 'Consultation',
          location: 'consultation'
        },
        {
          name: 'Child Care',
          location: 'cc'
        },
        {
          name: 'Maternal Care',
          location: 'mc'
        },
        /* {
          name: 'Family Planning',
          location: 'fp'
        }, */
       /*  {
          name: 'Dental',
          location: 'dental'
        }, */
      ]
    },
    /* {
      group: 'Others',
      modules: [
        {
          name: 'Laboratory',
          location: 'consultation'
        },
        {
          name: 'Animal Bite',
          location: 'consultation'
        },
        {
          name: 'Tuberculosis',
          location: 'consultation'
        },
        {
          name: 'NCD',
          location: 'consultation'
        },
      ]
    } */
  ]

  onSubmit(loc){
    this.router.navigate(['/'+loc, {id: this.patient_info.id}])
  }

  closeModal(){
    this.toggleModal.emit('vaccine-moodal');
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
