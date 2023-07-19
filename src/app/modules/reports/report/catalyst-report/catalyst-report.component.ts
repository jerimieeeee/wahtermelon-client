import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-catalyst-report',
  templateUrl: './catalyst-report.component.html',
  styleUrls: ['./catalyst-report.component.scss']
})
export class CatalystReportComponent implements OnChanges {
  @Input() report_data;

  stats : any;

  entries: any;

  barangay_list: any;

  indicators = [
    {id: 0,   desc: 'Sexual'},
    {id: 1,   desc: 'Physical'},
    {id: 2,   desc: 'Neglect'},
    {id: 3,   desc: 'Emotional'},
    {id: 4,   desc: 'Economic'},
    {id: 5,   desc: 'Unable to Validate'},
    {id: 6,   desc: 'Multiple Abuse'},
    {id: 7,   desc: 'Others'},
  ];

  x = 
    {
      'sexual_abuse': [
        'male_age_0_to_5',
        'female_age_0_to_5',

        'male_age_6_to_11',
        'female_age_6_to_11',        
      ],

      'economic_abuse': [
        'male_age_0_to_5',
        'female_age_0_to_5',

        'male_age_6_to_11',
        'female_age_6_to_11',        
]
  
    }
  

  barangays = [
    {id: 1,   desc: 'Barangay 1'},
    {id: 2,   desc: 'Barangay 2'},
    {id: 3,   desc: 'Barangay 3'},
    {id: 4,   desc: 'Barangay 4'},
    {id: 5,   desc: 'Barangay 5'},
    {id: 6,   desc: 'Barangay 6'},
    {id: 7,   desc: 'Barangay 7'},
    {id: 8,   desc: 'Barangay 8'},
    
  ];

  getReport(){
    const entries = Object.entries(this.stats.sexual_abuse.female_age_0_to_5);
    this.barangay_list = entries
    console.log(entries);
  }
 

  ngOnChanges(): void {
    this.stats = this.report_data;
    console.log(this.stats, 'test report data')
    this.getReport();
  }

}
