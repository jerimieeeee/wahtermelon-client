import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { AgeService } from 'app/shared/services/age.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss']
})
export class ExportPdfComponent implements OnInit {
  @Output() toggleExportPDF = new EventEmitter<any>();
  @Input() selected_gbv_case;
  

  is_saving: boolean = false;

  faCircleNotch = faCircleNotch;

  patient_details: any;

  patient_age: any;

  pdf_exported: boolean = false;

  exams2: any;

  first_exam = [
    {id: 1,   desc: 'Yes'},
    {id: 0,   desc: 'No'},
  ];

  general_surveys = [
    {id: 1,   desc: 'Normal',               var_name: 'general_survey_normal'},
    {id: 2,   desc: 'Abnormal',             var_name: 'general_survey_abnormal'},
    {id: 3,   desc: 'Stunting',             var_name: 'general_survey_stunting'},
    {id: 4,   desc: 'Wasting',              var_name: 'general_survey_wasting'},
    {id: 5,   desc: 'Dirty, Unkempt',       var_name: 'general_survey_dirty_unkempt'},
    {id: 6,   desc: 'Stuporous',            var_name: 'general_survey_stuporous'},
    {id: 7,   desc: 'Pale',                 var_name: 'general_survey_pale'},
    {id: 8,   desc: 'Non-ambulant',         var_name: 'general_survey_non_ambulant'},
    {id: 9,   desc: 'Drowsy, Irritable',    var_name: 'general_survey_drowsy'},
    {id: 10,  desc: 'Respiratory Distress', var_name: 'general_survey_respiratory'},
    {id: 11,  desc: 'Other Abnormality',    var_name: 'general_survey_others'}
  ];

  closeModal(){
    this.toggleExportPDF.emit('export_pdf');
    console.log('check modal')
  }

  getAge(){
    if(this.patient_details && this.patient_details.birthdate){
      let age_value = this.ageService.calcuateAge(this.patient_details.birthdate);
      this.patient_age = age_value;
      return age_value.age + ' ' + age_value.type+(age_value.age>1 ? 's old' : ' old' );
    }
  }

  exportAsPdf: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'medForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      jsPDF: {
        orientation: 'portrait',
        format: 'a4',
        precision: 16
      }
    }
  }

  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'GBV Medical').subscribe(() => {
      // save started
    });
  }



  constructor(private http: HttpService,
              private ageService: AgeService, 
              private exportAsService: ExportAsService
  ) { }
  
  ngOnInit() {
    this.patient_details = this.http.getPatientInfo();
    console.log(this.patient_details,'export modal patient')
    console.log(this.selected_gbv_case,'export modal')
  }

}
