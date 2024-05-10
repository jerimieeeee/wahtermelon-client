import { Component, OnInit } from '@angular/core';
import { adult_tooth_conditions } from './libToothNumber';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {
  adult_tooth_conditions = adult_tooth_conditions

  modals: any = [];
  is_saving: boolean = false;
  saveCondition() {

  }

  onRightClick(name){
    alert('right click');
    return false;
  }

  selected_tooth: number;

  tooth_legend: any = [
    {color: 'bg-blue-500', desc: 'Decayed'},
    {color: 'bg-gray-200', desc: 'Filled'},
    {color: 'bg-yellow-500', desc: 'Jacket Crown'},
    {color: 'bg-gray-900', desc: 'Missing'},
    {color: '', desc: 'Pontic'},
    {color: '', desc: 'Supernumerary'},
    {color: '', desc: 'Unerupted'}, //all
    {color: 'bg-red-500', desc: 'For Extraction'}, //all
    {color: 'bg-green-500', desc: 'Sound/Sealed'}//all
  ];

  toggleModal(name, data?) {
    this.selected_tooth = data;
    this.modals[name] = !this.modals[name];
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log('test')
  }
}
