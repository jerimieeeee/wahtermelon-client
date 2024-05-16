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
  condition: string;

  saveCondition() {
    console.log(this.condition)
  }

  onRightClick(name){
    alert('right click');
    return false;
  }

  selected_tooth: number;

  tooth_legend: any = [
    {id: 'D',   color: 'bg-blue-500',   desc: 'Decayed'},
    {id: 'F',   color: 'bg-gray-200',   desc: 'Filled'},
    {id: 'JC',  color: 'bg-yellow-500', desc: 'Jacket Crown'},
    {id: 'M',   color: 'bg-gray-900',   desc: 'Missing'},
    {id: 'P',   color: 'bg-gray-900',   desc: 'Pontic'},
    {id: 'S',   color: 'bg-gray-900',   desc: 'Supernumerary'},
    {id: 'Un',  color: 'bg-gray-900',   desc: 'Unerupted'}, //all
    {id: 'Dx',  color: 'bg-red-500',    desc: 'For Extraction'}, //all
    {id: 'Y',   color: 'bg-green-500',  desc: 'Sound/Sealed'}//all
  ];

  toggleModal(name, data?, event?) {
    if(event) event.preventDefault();
    // $event.preventDefault();
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
