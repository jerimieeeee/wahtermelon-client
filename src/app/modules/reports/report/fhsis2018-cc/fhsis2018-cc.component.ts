import { Component, Input, OnChanges } from '@angular/core';
import { faCircleNotch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { options } from 'app/modules/patient-registration/patient-registration.module';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import moment from 'moment';
import { dateHelper } from 'app/shared/services/date-helper.service';

@Component({
    selector: 'app-fhsis2018-cc',
    templateUrl: './fhsis2018-cc.component.html',
    styleUrls: ['./fhsis2018-cc.component.scss'],
    standalone: false
})

export class Fhsis2018CcComponent implements OnChanges {
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

  vaccines : any;
  fic_cic : any;
  cpab : any;
  bfed : any;
  ebf : any;
  services : any;
  vitals : any;
  deworm : any;
  sick : any;
  sick_with_meds : any;
  brgy_result: any;
  reportform_data : any;
  selected_barangay : any;
  convertedMonth : any;
  brgys_info : any;
  name_list: any = [];
  url: any = 'reports-2018/child-care/name-list';

  exportAsExcel: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'reportForm',
    options: {

    }
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

  exportX() {
    this.exportAsService.save(this.exportAsExcel, 'Childcare M1').subscribe(() => {
      // save started
    });
  }

  pdf_exported: boolean = false;
  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Childcare M1').subscribe(() => {
      // save started
    });
  }

  constructor(
    private exportAsService: ExportAsService,
    private dateHelper: dateHelper
  ) { }

  name_list_params: {};
  openList:boolean = false;

  showNameList(gender: string, indicator: string, sequence?: number, routine?: string) {
    // Create the name_list_params object dynamically
    this.name_list_params = {
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      category: this.reportForm.value.report_class,
      per_page: 10,
      indicator: indicator,
      sequence: sequence,
      ...(routine !== undefined && { routine: routine }), // Add 'routine' only if it's defined
      gender: gender,
    };
    this.openList = true;
  };

  showNameList2(gender: string, indicator: string) {
    // Create the name_list_params object dynamically
    this.name_list_params = {
      start_date: this.reportForm.value.start_date,
      end_date: this.reportForm.value.end_date,
      category: this.reportForm.value.report_class,
      per_page: 10,
      indicator: indicator,
      gender: gender,
    };
    this.openList = true;
  };

  toggleModal(){
    let list = [];

    this.name_list = list;
    this.openList = !this.openList;
  }
  convertDate(){
    this.convertedMonth = moment(this.reportForm.value.month, 'M').format('MMMM');
  }

  convertBrgy(){
    this.brgy_result = this.selected_barangay?.map((code) => this.brgys.find((el) => el.code == code).name);
  }

  label_value: {};
  ngOnChanges(): void {

    this.current_submit_flag = this.submit_flag;
    if(this.current_submit_flag){
      this.show_stats = false;
      this.vaccines = this.report_data.data.vaccines[0];
      this.fic_cic = this.report_data.data.fic_cic[0];
      this.cpab = this.report_data.data.cpab[0];
      this.bfed = this.report_data.data.init_bfed[0];
      this.ebf = this.report_data.data.bfed[0];
      this.services = this.report_data.data.ccdev_services[0];
      this.vitals = this.report_data.data.vitals[0];
      this.deworm = this.report_data.data.deworm[0];
      this.sick = this.report_data.data.sick_infant_children[0];
      this.sick_with_meds = this.report_data.data.sick_infant_children_with_meds[0];
      this.brgys_info = this.brgys;
      this.pdf_exported = false;
      this.label_value = this.dateHelper.getLabelValue(this.reportForm, this.report_data);
      if(this.selectedBrgy) this.convertBrgy();
      this.show_stats = true;
    }
  }
}
