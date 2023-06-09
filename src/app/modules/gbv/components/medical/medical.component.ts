import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faEdit, faSave} from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { intakeForm } from '../intake/intakeForm';
import { formatDate } from '@angular/common';

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

  intakeForm:FormGroup=intakeForm();

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

  gbv_files: any = [];

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
    this.http.update('gender-based-violence/patient-gbv-intake/', this.intakeForm.value.id, this.intakeForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded!', 'Intake Form');
        this.reloadData();
      },
      error: err => console.log(err)
    })
  }

  toggleFileModal() {

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
      case_date: this.selected_gbv_case.gbvIntake ? formatDate(this.selected_gbv_case.gbvIntake.case_date, 'yyyy-MM-dd', 'en') : null
    });

    this.has_consent = this.intakeForm.value.consent_flag ? true : false;

    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_anogenital, 'anogenital_exam', 'anogenital');
    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_corporal, 'corporal_exam', 'corporal');
    this.loadExams(this.selected_gbv_case.gbvIntake.symptoms_behavioral, 'behavioral_exam', 'behavior');
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
    console.log(this.behavioral_exam);
  }

  child_relations: any;
  loadLibraries() {
    this.http.get('libraries/child-relation').subscribe({
      next: (data:any) => {
        console.log(data)
        this.child_relations = data.data;
        this.patchData();
      },
      error: err => console.log(err)
    })
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadLibraries();
    console.log(this.selected_gbv_case)
   }
 }
