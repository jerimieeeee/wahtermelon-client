import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { dateHelper } from 'app/shared/services/date-helper.service';

@Component({
    selector: 'app-header-fhsis2018',
    templateUrl: './header-fhsis2018.component.html',
    styleUrls: ['./header-fhsis2018.component.scss']
})
export class HeaderFhsis2018Component implements OnChanges {
  @Input() brgys!: any;
  @Input() selectedBrgy!: any;
  @Input() selectedCode!: any;
  @Input() facility!: any;
  @Input() reportForm!: any;
  @Input() report_data!: any;
  @Input() submit_flag;

  brgy_result: any;
  selected_barangay : any;
  label_value: any;

  convertBrgy(){
    this.brgy_result = this.selectedBrgy?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  getLabelValue(){
    console.log(this.reportForm, this.report_data)
    this.label_value = this.dateHelper.getLabelValue(this.reportForm, this.report_data);
    console.log(this.label_value)
    if(this.selectedBrgy) this.convertBrgy();
  }

  constructor (
    private dateHelper: dateHelper
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getLabelValue();
  }

  /* ngOnInit(): void {
    this.getLabelValue();
  } */
}
