import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faEdit, faSave} from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
  @Input() selected_gbv_case;
  @Input() patient_id;
  @Input() pos;

  faEdit = faEdit;
  faSave = faSave;
  faPlus = faPlus;

  modals: any = [];
  anogenitals = [];
  info_sources: any;

  selected_exam = {
    exam_title: '',
    url: '',
    save_url: '',
    // exam_data: null,
    // exam_id_name: ''
  };
  

  toggleModal(name, act?, url?, save_url?){
    switch(name) {
      case 'anogenital': {
        this.selected_exam = {
          exam_title: act,
          url: url,
          save_url: save_url,
          // exam_data: data,
          // exam_id_name: exam_id_name
        }
        // this.reloadData()
        break;
      }
      
      default: {

        break;
      }
    }
    this.modals[name] = !this.modals[name];
    // if(name==='abuse_acts' && !this.modals[name]) this.reloadData();
    // if(name==='interview_notes' && !this.modals[name]) this.reloadData();
    // if(name==='perpetrators' && !this.modals[name]) this.reloadData();
  }

  // patchData(data?) {
  //   // console.log(this.selected_gbv_case.gbvIntake);//interview_perpetrator
  //   if(data) {
  //     this.interviewForm.patchValue({...data});
  //   } else {
  //     if(this.selected_gbv_case.gbvIntake.interview) {
  //       this.interviewForm.patchValue({...this.selected_gbv_case.gbvIntake.interview})
  //     }

  //     this.loadExams(this.selected_gbv_case.gbvIntake.interview_sexual_abuses, 'anogenital_exam', 'sexual');
  //     this.loadExams(this.selected_gbv_case.gbvIntake.interview_physical_abuses, 'corporal_exam', 'physical');
  //     this.loadExams(this.selected_gbv_case.gbvIntake.interview_neglect_abuses, 'behavioral_exam', 'neglect');

  //   }
  // }

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
    console.log(lib_var, 'test data')
  }

  loadLibraries(){
    
    const getInfoSource = this.http.get('libraries/gbv-info-source');
    

    forkJoin( [getInfoSource]).subscribe({
      next: ([dataInfoSource]: any) => {
       
        this.info_sources = dataInfoSource.data;
        console.log(this.info_sources, 'load library')
       
      },
      error: err => console.log(err)
    });
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
   
  ) { }

  ngOnInit() {
    this.loadLibraries();
   }
   
 }
