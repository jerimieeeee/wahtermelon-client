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

  exams: any =[];
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
            [this.selected_exam.var_id]: k,
            info_source_id: key
          })
        }
      });
    });

    let params = {
      patient_id: this.patient_id,
      patient_gbv_intake_id: this.intake_id,
      [this.selected_exam.arr_var_name]: exams
    }

    console.log(params);
    this.http.post('gender-based-violence/'+this.selected_exam.save_url, params).subscribe({
      next: (data: any) => {
        this.toastr.success('Successfully recorded', this.selected_exam.act_title);
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  loadSymptoms() {
    if(this.selected_exam.data){
      Object.entries(this.selected_exam.data).forEach(([key, value]: any, index) => {
        if(value.info_source_id === 1) this.medical_exam[1][value[this.selected_exam.var_id]] = true;
        if(value.info_source_id === 2) this.medical_exam[2][value[this.selected_exam.var_id]] = true;
      })
    }

    console.log(this.medical_exam);
  }

  loadLibraries(){
    this.http.get('libraries/'+this.selected_exam.url).subscribe({
      next: (data: any) => {
        this.exams = data.data;
        this.loadSymptoms();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('anogenital');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadLibraries();
    console.log(this.selected_exam)
  }
}

