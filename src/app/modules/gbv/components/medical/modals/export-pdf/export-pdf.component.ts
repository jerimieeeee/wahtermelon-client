import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { AgeService } from 'app/shared/services/age.service';
import { forkJoin } from 'rxjs';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
    selector: 'app-export-pdf',
    templateUrl: './export-pdf.component.html',
    styleUrls: ['./export-pdf.component.scss'],
    standalone: false
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

  last_referral: any;

  conv_facility: any;

  conv_relation: any;

  conv_referral_facility: any;

  anogenital_list: any =[];
  corporal_list: any =[];
  behavioral_list: any =[];

  impression_list: any;

  relations_list: any;

  conv_impression: any;

  userInfo: any;

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
    // console.log('check modal')
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
    elementIdOrContent: 'mainForm',
    options: {
      image: { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 3},
      margin:  [1, 1, 1, 1],
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before:['#medForm2', '#medForm3']},
      jsPDF: {
        orientation: 'portrait',
        format: 'a4',
        precision: 16
      }
    }
  }

  exportP() {
    this.pdf_exported = true;
    this.exportAsService.save(this.exportAsPdf, 'Medico Legal').subscribe(() => {
      // save started
    });
  }

  loadAnogenital(){
    this.http.get('libraries/'+'gbv-symptoms-anogenital').subscribe({
      next: (data: any) => {
        this.anogenital_list = data.data;
        this.patchData()
      },
      error: err => console.log(err)
    })
  }

  loadCorporal(){
    this.http.get('libraries/'+'gbv-symptoms-anogenital').subscribe({
      next: (data: any) => {
        this.corporal_list = data.data;
        this.patchData()
      },
      error: err => console.log(err)
    })
  }

  loadBeahavioral(){
    this.http.get('libraries/'+'gbv-symptoms-anogenital').subscribe({
      next: (data: any) => {
        this.behavioral_list = data.data;
        this.patchData()
      },
      error: err => console.log(err)
    })
  }

  // loadImpression() {
  //   this.http.get('libraries/gbv-medical-impression').subscribe({
  //     next:(data:any) => {
  //       this.impression_list = data.data;
  //       // console.log(this.impression_list,'test impressions')
  //       // console.log(this.userInfo,'test impressions user')
  //       // console.log(this.patient_details,'test impressions patient')
  //       this.convertImpression()

  //     },
  //     error: err => console.log(err)
  //   });
  // }

  loadLibraries() {
    const getChildRelation = this.http.get('libraries/child-relation');
    const getMedicalImpression = this.http.get('libraries/gbv-medical-impression');

    forkJoin([getChildRelation, getMedicalImpression]).subscribe({
      next:([dataChildRelation, dataMedicalImpression]:any) => {
        this.relations_list = dataChildRelation.data;
        this.impression_list = dataMedicalImpression.data;
        console.log(this.relations_list, 'new function');
        console.log(this.impression_list, 'new function');
        this.convertImpression();
      },
      error: err => console.log(err)
    });
  }


  loadExams(data, var_name, lib_var) {
    let exams: any = [];
    Object.entries(data).forEach(([key, value]: any, index) => {
      if(!exams[value[lib_var].desc]) {
        exams[value[lib_var].desc] = [];
      }
      exams[value[lib_var].desc][value.info_source_id] = true;
    });

    this[var_name] = exams;
  }

  anogenital_exam: any = [];
  corporal_exam: any =[];
  behavioral_exam: any =[];

  patchData() {

    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_anogenital, 'anogenital_exam', 'anogenital');
    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_corporal, 'corporal_exam', 'corporal');
    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_behavioral, 'behavioral_exam', 'behavior');
    // console.log(this.anogenital_exam, 'test anogenital')
  }

  loadLibs(){
    this.loadAnogenital()
    this.loadCorporal()
    this.loadBeahavioral()

  }

  convertImpression(){
    this.conv_impression = this.impression_list.filter(x => x.id === this.selected_gbv_case?.gbvIntake?.medical_history?.medical_impression_id);
    this.conv_relation = this.relations_list.filter(x => x.id === this.selected_gbv_case?.gbvIntake?.consent_relation_to_child_id);
    this.last_referral = this.selected_gbv_case?.gbvReferral[Object.keys(this.selected_gbv_case?.gbvReferral).length - 1];

    console.log(this.conv_relation, 'relationship')

    this.conv_facility = this.userInfo.facility.facility_name.split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
    // console.log(this.conv_facility, 'test proper case');

    this.conv_referral_facility = this.last_referral.facility.facility_name.split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
    // console.log(this.last_referral,'test last referral')
  }


  constructor(
    private http: HttpService,
    private ageService: AgeService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit() {
    this.loadLibs();
    this.loadLibraries();
    this.patient_details = this.http.getPatientInfo();
    this.userInfo = this.http.getUserFromJSON();
    // console.log(this.selected_gbv_case,'export modal')
    // console.log(this.anogenital_list,'test hugot')
  }

}
