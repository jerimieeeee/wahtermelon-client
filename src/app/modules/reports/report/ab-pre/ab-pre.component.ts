import { Component, Input, OnChanges } from '@angular/core';
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { dateHelper } from 'app/shared/services/date-helper.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import {HttpService} from "../../../../shared/services/http.service";

@Component({
    selector: 'app-ab-pre',
    templateUrl: './ab-pre.component.html',
    styleUrls: ['./ab-pre.component.scss'],
    standalone: false
})
export class AbPreComponent implements OnChanges {
  @Input() report_data;
  @Input() reportForm;
  @Input() selectedBrgy;
  @Input() selectedCode!: any;
  @Input() brgys;
  @Input() facility;
  @Input() submit_flag;
  current_submit_flag: boolean = false;
  show_stats: boolean = false;

  faCircleNotch = faCircleNotch;
  faFileExcel = faFileExcel;
  faFilePdf = faFilePdf;

  userInfo: any = {};
  stats : any[];
  sum_total: {
    population: number,
    male: number,
    female: 0,
    male_female_total: 0,
    less_than_15: 0,
    greater_than_15: 0,
    category1: 0,
    category2: 0,
    category3: 0,
    total_cat2_and_cat3: 0,
    total_cat1_cat2_cat3: 0,
    prep_total: 0,
    prep_completed: 0,
    tandok: 0,
    pep_completed: 0,
    tcv: 0,
    HRIG: 0,
    ERIG: 0,
    dog: 0,
    cat: 0,
    others: 0,
    total_biting_animal: 0
  };

  stats_others : any[];
  previous : any[];
  previous_others : any[];
  brgy_result: any;
  reportform_data : any;
  selected_barangay : any;
  convertedMonth : any;
  brgys_info : any;
  name_list: any = [];
  params: any = [];
  url: any = 'reports-2018/animal-bite/pre-exposure-name-list';

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'reportForm',
    options: { }
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'reportForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'landscape',
        format: 'a4',
        precision: 16
      }
    }
  }

  name_list_params: {};
  showNameList(params, barangay_code) {
    this.params = params;
    this.name_list_params = {
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      category: this.reportForm.value.report_class,
      params: this.params,
      per_page: 10,
      code: barangay_code
    };
    this.openList = true;
  };

  initializeSumTotal() {
    this.sum_total = {
      population: 0,
      male: 0,
      female: 0,
      male_female_total: 0,
      less_than_15: 0,
      greater_than_15: 0,
      category1: 0,
      category2: 0,
      category3: 0,
      total_cat2_and_cat3: 0,
      total_cat1_cat2_cat3: 0,
      prep_total: 0,
      prep_completed: 0,
      tandok: 0,
      pep_completed: 0,
      tcv: 0,
      HRIG: 0,
      ERIG: 0,
      dog: 0,
      cat: 0,
      others: 0,
      total_biting_animal: 0
    };
  }

  sumTotal($variable: 'stats' | 'stats_others') {
    this.initializeSumTotal();
    // Define the keys you want to sum
    const keysToSum = [
      'population', 'male', 'female', 'male_female_total', 'less_than_15', 'greater_than_15',
      'category1', 'category2', 'category3', 'total_cat2_and_cat3', 'total_cat1_cat2_cat3',
      'prep_total', 'prep_completed', 'tandok', 'pep_completed', 'tcv', 'HRIG', 'ERIG', 'dog', 'cat',
      'others', 'total_biting_animal'
    ];

    // Use dynamic object reference based on $variable
    const selectedStats = this[$variable];

    // Loop through the selected stats and accumulate totals
    Object.entries(selectedStats).forEach(([key, value]: [string, any]) => {
      Object.entries(value).forEach(([k, v]: [string, any]) => {
        keysToSum.forEach((keyToSum) => {
          this.sum_total[keyToSum] = this.sum_total[keyToSum] + +v[keyToSum];
        });
      });
      // Update the selected stats with the accumulated sum
      selectedStats[key] = [this.sum_total];
      this.initializeSumTotal();
    });
  }

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Post-Exposure').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Post-Exposure').subscribe(() => {
      // save started
    });
  }

  openList:boolean = false;

  toggleModal(){
    let list = [];

    this.name_list = list;
    this.openList = !this.openList;
  }

  constructor(
    private exportAsService: ExportAsService,
    private dateHelper: dateHelper,
    private http: HttpService
  ) { }

  label_value: {};
  reportFlag: string;
  ngOnChanges(): void {
    this.current_submit_flag = this.submit_flag;
    this.userInfo = this.http.getUserFromJSON();
    this.reportFlag = this.userInfo.reports_flag === 1 ? '1' : null;
    this.selected_barangay = this.selectedBrgy;
    this.show_stats = false;
    this.stats = this.report_data.data;
    this.stats_others = this.report_data.data1_others;
    this.previous = this.report_data.data2;
    this.previous_others = this.report_data.data2_others;
    this.sumTotal('stats');
    this.sumTotal('stats_others');
    // this.sumTotalPrevious('previous');
    // this.sumTotalPrevious('previous_others');
    console.log(this.stats, 'stats');
    this.brgys_info = this.brgys;
    this.pdf_exported = false;
    this.label_value = this.dateHelper.getLabelValue(this.reportForm, this.report_data);
    this.show_stats = true;
  }
}
