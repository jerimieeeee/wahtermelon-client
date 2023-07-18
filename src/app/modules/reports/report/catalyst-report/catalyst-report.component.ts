import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-catalyst-report',
  templateUrl: './catalyst-report.component.html',
  styleUrls: ['./catalyst-report.component.scss']
})
export class CatalystReportComponent implements OnChanges {
  @Input() report_data;

  stats : any;

  general_surveys = [
    {id: 1,   desc: 'Sexual',               var_name: 'Sexual', sexual: ['10','10','20', '30'] , physical: '100'},
    {id: 2,   desc: 'Physical',             var_name: 'Physical', sexual: '10', physical: '10'},
    {id: 3,   desc: 'Neglect',             var_name: 'Neglect', sexual: '10', physical: '10'},
    {id: 4,   desc: 'Emotional',              var_name: 'Emotional', sexual: '10', physical: '10'},
    {id: 5,   desc: 'Economic',       var_name: 'Economic', sexual: '10', physical: '10'},
    {id: 6,   desc: 'Unable to Validate',            var_name: 'Unable to Validate', sexual: '10', physical: '10'},
    {id: 7,   desc: 'Multiple Abuse',                 var_name: 'Multiple Abuse', sexual: '10', physical: '10'},
    {id: 8,   desc: 'Others',         var_name: 'Others', sexual: '10', physical: '10'},
    
  ];

  barangays = [
    {id: 1,   desc: 'Barangay 1',               var_name: 'Sexual'},
    {id: 2,   desc: 'Barangay 2',             var_name: 'Physical'},
    {id: 3,   desc: 'Barangay 3',             var_name: 'Neglect'},
    {id: 4,   desc: 'Barangay 4',              var_name: 'Emotional'},
    {id: 5,   desc: 'Barangay 5',       var_name: 'Economic'},
    {id: 6,   desc: 'Barangay 6',            var_name: 'Unable to Validate'},
    {id: 7,   desc: 'Barangay 7',                 var_name: 'Multiple Abuse'},
    {id: 8,   desc: 'Barangay 8',         var_name: 'Others'},
    
  ];

  getReport(){
  
  }
 

  ngOnChanges(): void {
    this.stats = this.report_data;
    console.log(this.stats, 'test report data')
    this.getReport();
  }

}
