import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-anogenital',
  templateUrl: './anogenital.component.html',
  styleUrls: ['./anogenital.component.scss']
})
export class AnogenitalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_exam;
  @Input() intake_id;
  @Input() patient_id;

  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;
  show_error: boolean = false;

  medical_exam: any = {
    1: [],
    2: []
    
  };

  onSubmit(){
    let exams: any = [];
    Object.entries(this.medical_exam).forEach(([key, value], index) => {
      Object.entries(value).forEach(([k, v]: any, i) => {
        if(v) {
          exams.push({
            anogenital_symptoms_id: k,
            info_source_id: key,
            remarks: ''
          })
        }
      });
    });

    let params = {
      patient_id: this.patient_id,
      patient_gbv_intake_id: this.intake_id,
      anogenital_array: exams
    }
    console.log(exams, 'test EXAMS');
    console.log(params, 'test ito ung isubmit');

    this.http.post('gender-based-violence/'+this.selected_exam.save_url, params).subscribe({
      next: (data: any) => {
        console.log(data, 'data ng anogenital');
        console.log(this.selected_exam.save_url, 'test URL');
        console.log(params, 'test PARAMS');
        this.toastr.success('Successfully recorded', this.selected_exam.act_title);
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('anogenital');
  }

  exams: any =[];

  loadLibraries(){
    this.http.get('libraries/'+this.selected_exam.url).subscribe({
      next: (data: any) => {
        this.exams = data.data;
        console.log(this.exams, 'test 1')
        console.log(this.selected_exam.url, 'test 2')

        // if(this.selected_exam.abused_data) this.loadAbusedData()
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
    console.log(this.medical_exam, 'test modals')
  }
  
}

