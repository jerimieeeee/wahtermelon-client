import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rapid-heeadsss',
  templateUrl: './rapid-heeadsss.component.html',
  styleUrl: './rapid-heeadsss.component.scss'
})
export class RapidHeeadsssComponent implements OnInit, OnChanges {
@Input() compre_questions: any;
@Input() client_types: any;
@Input() patient_id: any;
@Input() asrh_visit_history: any;

  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;


  is_saving: boolean = false;

  show_form = false;

  physicians: any;

  rapid_questions: any = [];

  rapid_ans: { [key: number]: string } = {};

  rapidForm: any = {

    rapid_status: [],

  };

  visitForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    assessment_date: new FormControl<string| null>(''),
    client_type: new FormControl<string| null>(''),
    lib_asrh_client_type_code: new FormControl<string| null>(''),
    other_client_type: new FormControl<string| null>(''),
    refer_to_user_id: new FormControl<string| null>(''),
    status: new FormControl<string| null>(''),
  });

  createRapid(){
    this.http.post('asrh/rapid', this.visitForm.value).subscribe({
      next: () => {
        // this.toastr.success('Successfully recorded!','Vaccine record')
        // this.loadData.emit('vaccines');
        // this.closeModal();
        console.log(this.visitForm)
      },
      error: err => console.log(err),
      complete: () => console.log('success')
    })
  }

  onSubmit(){
    var rapid_arr = [];

    console.log(this.rapid_ans, 'test')
    Object.entries(this.rapid_ans).forEach(([key, value]) => {
      if(value != '-'){
        let ans = {
          lib_rapid_questionnaire_id: key,
          answer: value
        };

        rapid_arr.push(ans);
        console.log(rapid_arr)
      }
    })

    if(rapid_arr.length > 0){
      let user_id = this.http.getUserID();
      var rapid_form ={
        consult_asrh_rapid_id: this.asrh_visit_history[0].id,
        patient_id: this.patient_id,
        user_id: user_id,
        answers: rapid_arr
      }

      console.log(rapid_form)

      this.http.post('asrh/rapid-answer', rapid_form).subscribe({
        next: () => {
          // this.toastr.success('Successfully recorded!','Vaccine record')
          // this.loadData.emit('vaccines');
          // this.closeModal();
          // this.loadSelected();
             this.loadRapidDetails();
        },
        error: err => console.log(err),
        complete: () =>
          console.log('success'),
      })
    }else{

    }
  }

  type_client = [
    { name: 'walk-in', id:'1' },
    { name: 'referred', id:'2' },

  ];

  statuses = [
    { name: 'done', id:'1' },
    { name: 'refused', id:'2' },

  ];

  loadRapidLib(){
    // let params = {
    //   patient_id: this.patient_id,
    //   per_page: 'all'
    // };

    this.http.get('libraries/rapid-questionnaire').subscribe({
      next: (data: any) => {
        this.rapid_questions = data.data;
        console.log(this.rapid_questions)
        // this.loadSelected();
      },
      error: err => console.log(err)
    });
  }

  loadRapidDetails(){

    if(this.asrh_visit_history.length >= 1) {
      this.visitForm.patchValue({
      assessment_date: this.asrh_visit_history[0].assessment_date,
      lib_asrh_client_type_code:this.asrh_visit_history[0].lib_asrh_client_type_code,
      client_type: this.asrh_visit_history[0].client_type,
      other_client_type: this.asrh_visit_history[0].other_client_type,
      refer_to_user_id: this.asrh_visit_history[0].refer_to_user_id,
      status: this.asrh_visit_history[0].status,
      });
      // this.show_form = true;
      console.log(this.asrh_visit_history[0].answers,'load rapid working')
      this.loadSelected();
    }
  }

  validateForm(){
    this.visitForm = this.formBuilder.group({
      id: [''],
      patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
      assessment_date: ['', [Validators.required, Validators.minLength(1)]],
      lib_asrh_client_type_code: ['', [Validators.required, Validators.minLength(1)]],
      client_type: ['', [Validators.required, Validators.minLength(1)]],
      other_client_type: ['', [Validators.required]],
      refer_to_user_id: [, [Validators.required]],
      status: ['', [Validators.required]],

    });

    this.loadRapidDetails();
    // this.show_form = true;
  }

  loadSelected() {
    this.asrh_visit_history[0].answers.forEach((item) => {
      this.rapid_ans[item.question.id] = item.answer // Default to an empty string if no answer
    });


    console.log(this.rapid_ans, 'get rapid 12')

  }

  loadUsers(){
    this.http.get('users', {params:{per_page: 'all', doctors_list: 1}}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        this.physicians = data.data
        console.log(this.physicians, 'users')
      },
      error: err => console.log(err)
    })
  }


  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    // private router: Router
  ) { }

  ngOnChanges(): void{
    this.visitForm.get('client_type').valueChanges
    .subscribe(selectedClient => {
        if (selectedClient != 'referred') {
            this.visitForm.get('lib_asrh_client_type_code').reset();
            this.visitForm.get('lib_asrh_client_type_code').disable();
        }
        else {
            this.visitForm.get('lib_asrh_client_type_code').enable();
        }
    });

    this.visitForm.get('lib_asrh_client_type_code').valueChanges
    .subscribe(selectedType => {
        if (selectedType != 99) {
            this.visitForm.get('other_client_type').reset();
            this.visitForm.get('other_client_type').disable();
        }
        else {
            this.visitForm.get('other_client_type').enable();
        }
    });
    console.log('test changes')
  }

ngOnInit(): void {
    console.log(this.patient_id)
    this.loadRapidLib();
    this.validateForm();
    this.ngOnChanges();
    this.loadUsers();

    // console.log(this.asrh_visit_history[0].answers)
  }
}
