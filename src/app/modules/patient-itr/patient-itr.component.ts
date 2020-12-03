import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-itr',
  templateUrl: './patient-itr.component.html',
  styleUrls: ['./patient-itr.component.scss']
})
export class PatientItrComponent implements OnInit {
  medical_journal = [
    {
      visit_date: "July 01, 2020",
      visits: [
        {
          visit_type: "GENERAL CONSULTATION",
          assessed_by: "John Doe",
          diagnosed_by: "Dr. Moira Santos"
        },
        {
          visit_type: "LABORATORY - URINALYSIS",
          assessed_by: "John Doe",
          diagnosed_by: "Dr. Francis Gamboa"
        }
      ]
    },
    {
      visit_date: "March 09, 2020",
      visits: [
        {
          visit_type: "FAMILY PLANNING",
          assessed_by: "Midwife 1",
          diagnosed_by: "Nurse 1"
        }
      ]
    },
    {
      visit_date: "March 01, 2020",
      visits: [
        {
          visit_type: "FAMILY PLANNING",
          assessed_by: "Midwife 1",
          diagnosed_by: "Nurse 1"
        }
      ]
    },
    {
      visit_date: "Feb 14, 2020",
      visits: [
        {
          visit_type: "GENERAL CONSULTATION",
          assessed_by: "Procorpio Pepito",
          diagnosed_by: "Pepito Sampu"
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
