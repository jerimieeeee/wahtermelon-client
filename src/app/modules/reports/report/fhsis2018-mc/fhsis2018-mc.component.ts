import { Component, Input, OnChanges } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-fhsis2018-mc',
  templateUrl: './fhsis2018-mc.component.html',
  styleUrls: ['./fhsis2018-mc.component.scss']
})
export class Fhsis2018McComponent implements OnChanges {
  @Input() report_data;

  faCircleNotch = faCircleNotch;

  stats : any;
  name_list: any = [];

  constructor( ) { }

  openList:boolean = false;
  toggleModal(name_list, name_list2?, name_list3?){
    let list = [];
    if(name_list2 || name_list3) {
      if(name_list2 && name_list3) {
        list = name_list.concat(name_list2,name_list3)
      } else {
        list = name_list2 ? name_list.concat(name_list2) : name_list.concat(name_list3);
      }
    } else {
      list = name_list
    }

    this.name_list = list;
    this.openList = !this.openList;
  }

  ngOnChanges(): void {
    this.stats = this.report_data;
  }
}
