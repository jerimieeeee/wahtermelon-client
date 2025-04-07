import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { faBoxesPacking, faCapsules, faCircleInfo, faCommentSms, faFileArrowUp, faFileMedical, faFlaskVial, faHouseMedical, faSquarePollHorizontal, faStethoscope, faTableList, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: false
})
export class AdminComponent implements OnInit {
  // faUsers = faUsers;
  locations = [
    /* {
      loc: 'account-list',
      name: 'Account List',
      icon: faUsers
    }, */
    {
      loc: 'facility-config',
      name: 'Facility Configuration',
      icon: faHouseMedical
    },
    /* {
      loc: 'lab-config',
      name: 'Laboratory Config',
      icon: faFlaskVial
    }, */
    {
      loc: 'drugs',
      name: 'Medicine List',
      icon: faCapsules
    },
    {
      loc: 'item-list',
      name: 'Item Supplies',
      icon: faBoxesPacking
    },
    /* {
    {
      loc: 'eclaims',
      name: 'eClaims',
      icon: faUsers
    },
    {
      loc: 'sms',
      name: 'WAH4P',
      icon: faCommentSms
    },
    {
      loc: 'survey',
      name: 'Survey',
      icon: faSquarePollHorizontal
    }, */
    {
      loc: 'facility-accred',
      name: 'Facility Accreditation',
      icon: faHospital
    },
    {
      loc: 'konsulta',
      name: 'Konsulta',
      icon: faStethoscope
    },
    {
      loc: 'konsulta-masterlist',
      name: 'Konsulta Masterlist',
      icon: faTableList
    },
    {
      loc: 'xml-upload',
      name: 'XML Import',
      icon: faFileArrowUp
    },
    {
      loc: 'eclaims',
      name: 'eClaims List',
      icon: faFileMedical
    }/* ,
    {
      loc: 'eclaims-rth',
      name: 'eClaims RTH',
      icon: faCircleInfo
    } */
  ]

  selected_route: string;

  navigateTo(loc){
    this.selected_route = loc;
    this.router.navigate(['/admin/'+loc]);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // console.log(this.router.url.split('/'))
    const url = this.router.url.split('/');
    if(url[2]) this.selected_route = url[2];
  }
}
