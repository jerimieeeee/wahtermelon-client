import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { faEdit, faSave} from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faPlus, faFilePdf, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';
import { medicalForm } from './medicalForm';
import { intakeForm } from '../intake/intakeForm';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
  @Output() updateSelectedGbv = new EventEmitter<any>();
  @Input() selected_gbv_case;
  @Input() patient_id;
  @Input() pos;

  faEdit = faEdit;
  faSave = faSave;
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;
  faFilePdf = faFilePdf;
  faFileContract = faFileContract;

  medicalForm:FormGroup=medicalForm();
  intakeForm: FormGroup=intakeForm();

  modals: any = [];
  anogenitals = [];
  info_sources: any;

  selected_exam = {
    exam_title: '',
    url: '',
    save_url: '',
    var_id: '',
    arr_var_name: '',
    data: ''
  };

  is_saving: boolean = false;

  pdf_exported: boolean = false;

  gbv_files: any = [];

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

  physical_exams = [
    {desc: 'Head and Neck',       var_name: 'pe_head_and_neck_remarks'},
    {desc: 'Chest and Lungs',     var_name: 'pe_chest_and_lungs_remarks'},
    {desc: 'Breast',              var_name: 'pe_breast_remarks'},
    {desc: 'Abdomen',             var_name: 'pe_abdomen_remarks'},
    {desc: 'Back',                var_name: 'pe_back_remarks'},
    {desc: 'Extremities',         var_name: 'pe_extremities_remarks'},
    {desc: 'Anogenital',          var_name: 'pe_anogenital_remarks'},
    {desc: 'External Genitalia',  var_name: 'pe_external_genitalia_remarks'},
    {desc: 'Anus',                var_name: 'pe_anus_remarks'},
    {desc: 'Hymen',               var_name: 'pe_hymen_remarks'}
  ]

  reloadData(){
    let params = {
      id: this.selected_gbv_case.id
    }

    this.http.get('gender-based-violence/patient-gbv', {params}).subscribe({
      next: (data: any) => {
        this.selected_gbv_case = data.data[0];
        this.updateSelectedGbv.emit(this.selected_gbv_case);
        this.patchData();
      },
      error: err => console.log(err)
    });
  }

  onSubmit() {
    this.is_saving = true;
    this.http.update('gender-based-violence/patient-gbv-intake/', this.intakeForm.value.id, this.intakeForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded!', 'Intake Form');
        this.is_saving = false;
        this.reloadData();
      },
      error: err => console.log(err)
    })
  }

  submitMedicalForm(){
    this.is_saving = true;
    this.medicalForm.patchValue({
      lmp_date: this.medicalForm.value.lmp_date ? formatDate(this.medicalForm.value.lmp_date, 'yyyy-MM-dd', 'en', 'Asia/Singapore') : null
    });

    this.http.post('gender-based-violence/patient-gbv-medical-history', this.medicalForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded!', 'Medical Form');
        this.is_saving = false;
        this.reloadData();
      },
      error: err => console.log(err)
    })
  }

  toggleFileModal(name) {
    this.modals[name] = !this.modals[name];

    if(!this.modals[name]) this.getFiles();
  }

  toggleExportPDF(name) {
    this.modals[name] = !this.modals[name];
  }

  toggleMedCert(name) {
    this.modals[name] = !this.modals[name];
  }

  selected_file_id: string;

  viewFile(id) {
    this.selected_file_id = id;
    this.modals.view_file = !this.modals.view_file;
  }

  toggleModal(name, act, url, save_url, var_id, arr_var_name, data?){
    switch(name) {
      case 'anogenital': {
        this.selected_exam = {
          exam_title: act,
          url: url,
          save_url: save_url,
          var_id: var_id,
          arr_var_name: arr_var_name,
          data: data
        }
        break;
      }
      default: {
        break;
      }
    }
    this.modals[name] = !this.modals[name];
    if(name==='anogenital' && !this.modals[name]) this.reloadData();
  }

  has_consent: boolean = false;

  patchData() {
    this.intakeForm.patchValue({...this.selected_gbv_case.gbvIntake});
    this.intakeForm.patchValue({
      case_date: this.selected_gbv_case.gbvIntake ? formatDate(this.selected_gbv_case.gbvIntake.case_date, 'yyyy-MM-dd', 'en', 'Asia/Singapore') : null
    });

    this.has_consent = this.intakeForm.value.consent_flag ? true : false;

    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_anogenital, 'anogenital_exam', 'anogenital');
    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_corporal, 'corporal_exam', 'corporal');
    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_behavioral, 'behavioral_exam', 'behavior');

    this.patchMedicalValue();
    this.getFiles();
  }

  anogenital_exam: any = [];
  corporal_exam: any =[];
  behavioral_exam: any =[];

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

  child_relations: object;
  medical_impressions: object;

  loadLibraries() {
    const getChildRelation = this.http.get('libraries/child-relation');
    const getMedicalImpression = this.http.get('libraries/gbv-medical-impression');

    forkJoin([getChildRelation, getMedicalImpression]).subscribe({
      next:([dataChildRelation, dataMedicalImpression]:any) => {
        this.child_relations = dataChildRelation.data;
        this.medical_impressions = dataMedicalImpression.data;
        console.log(dataMedicalImpression);
        this.patchData();
        this.createMedicalForm();
      },
      error: err => console.log(err)
    });
    /* this.http.get('libraries/child-relation').subscribe({
      next: (data:any) => {
        this.child_relations = data.data;
        this.patchData();
        this.createMedicalForm();
      },
      error: err => console.log(err)
    }) */
  }

  fetchingFiles: boolean = false;
  getFiles() {
    this.fetchingFiles = true;
    let params = {
      "filter[patient_id]": this.patient_id,
      "filter[patient_gbv_id]": this.selected_gbv_case.id
    }
    this.http.get('gender-based-violence/patient-gbv-file-upload', {params}).subscribe({
      next: (data: any) => {
        this.gbv_files = data.data;
        this.fetchingFiles = false;
      },
      error: err => console.log(err)
    })
  }

  createMedicalForm() {
    this.medicalForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.selected_gbv_case.patient_id],
      patient_gbv_intake_id: [this.selected_gbv_case.gbvIntake.id],

      patient_temp: [null],
      patient_heart_rate: [null],
      patient_resp_rate: [null],
      patient_weight: [null],
      patient_height: [null],
      taking_medication_flag: [null],
      taking_medication_remarks: [null],

      general_survey_normal: [false],
      general_survey_abnormal: [false],
      general_survey_stunting: [false],
      general_survey_wasting: [false],
      general_survey_dirty_unkempt: [false],
      general_survey_stuporous: [false],
      general_survey_pale: [false],
      general_survey_non_ambulant: [false],
      general_survey_drowsy: [false],
      general_survey_respiratory: [false],
      general_survey_others: [false],
      gbv_general_survey_remarks: [null],

      pe_head_and_neck_remarks: [null],
      pe_chest_and_lungs_remarks: [null],
      pe_breast_remarks: [null],
      pe_abdomen_remarks: [null],
      pe_back_remarks: [null],
      pe_extremities_remarks: [null],
      pe_anogenital_remarks: [null],
      pe_external_genitalia_remarks: [null],
      pe_anus_remarks: [null],
      pe_hymen_remarks: [null],
      medical_impression_id: [null],
      medical_impression_remarks: [null],

      menarche_flag: [false],
      menarche_age: [false],
      lmp_date: [null],
      genital_discharge_uti_flag: [false],
      past_hospitalizations_flag: [false],
      past_hospital_remarks: [null],
      scar_physical_abuse_flag: [false],
      pertinent_med_history_flag: [false],
      medical_history_remarks: [null],
      summary_non_abuse_findings: [null]
    });

    this.patchMedicalValue();
  }

  patchMedicalValue() {
    if(this.selected_gbv_case.gbvIntake.medical_history) {
      this.medicalForm.patchValue({...this.selected_gbv_case.gbvIntake.medical_history})
      console.log(this.medicalForm.value)
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
        orientation: 'landscape',
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

  get f(): { [key: string]: AbstractControl } {
    return this.medicalForm.controls;
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit() {
    this.loadLibraries();
    console.log(this.selected_gbv_case)
   }
 }
