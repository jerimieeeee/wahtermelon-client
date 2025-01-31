import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rapid-heeadsss',
  templateUrl: './rapid-heeadsss.component.html',
  styleUrl: './rapid-heeadsss.component.scss'
})
export class RapidHeeadsssComponent implements OnInit, OnChanges {
@Input() patient_id: any;
@Input() client_types: any;
@Input() selected_asrh_consult;
@Input() patient_asrh_history: any;
@Output() loadASRH2 = new EventEmitter<any>();
@Output() updateSelectedASRH = new EventEmitter<any>();
@Output() updateSelectedASRH2 = new EventEmitter<any>();



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
  is_saving2: boolean = false;

  show_form = false;
  showModal = false;

  physicians: any;

  rapid_questions: any = [];

  rapid_ans: { [key: number]: string } = {};

  rapidForm: any = {

    rapid_status: [],

  };

  modals: any = [];

  type_client = [
    { name: 'walk-in', id:'1' },
    { name: 'referred', id:'2' },

  ];

  statuses = [
    { name: 'done', id:'1' },
    { name: 'refused', id:'2' },

  ];

  visitForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    assessment_date: new FormControl<string| null>(''),
    client_type: new FormControl<string| null>(''),
    lib_asrh_client_type_code: new FormControl<string| null>(''),
    other_client_type: new FormControl<string| null>(''),
    refused_flag: new FormControl<boolean>(false),
    // refer_to_user_id: new FormControl<string| null>(''),
    // status: new FormControl<string| null>(''),
  });

  createRapid(){
    this.is_saving = true;
    if(this.selected_asrh_consult === null){
      this.http.post('asrh/rapid', this.visitForm.value).subscribe({
        next: (data : any) => {
          this.is_saving = false;
          this.toastr.success('Rapid Assessment Details was saved Successfuly')

            this.updateSelectedASRH2.emit(data.data.id);
          // console.log(this.selected_asrh_consult, 'checker current selected')
        },
        error: err => console.log(err),
        complete: () => console.log('success')
      })
    } else {
      this.http.update('asrh/rapid/', this.selected_asrh_consult.id, this.visitForm.value).subscribe({
        next: (data : any) => {
          this.is_saving = false;
          this.toastr.success('Rapid Assessment Details was Updated Successfuly')

            this.updateSelectedASRH.emit(data);
            console.log(data, 'rapid details')

          // console.log(this.selected_asrh_consult, 'checker current selected')
        },
        error: err => console.log(err),
        complete: () => console.log('success')
      })
    }

  }

  onSubmit(){
    var rapid_arr = [];

    console.log(this.selected_asrh_consult, 'test')
    Object.entries(this.rapid_ans).forEach(([key, value]) => {
      if(value != '-'){
        let ans = {
          lib_rapid_questionnaire_id: key,
          answer: value
        };

        rapid_arr.push(ans);
        // console.log(rapid_arr)
      }
    })

    if(rapid_arr.length > 1){
      let user_id = this.http.getUserID();
      var rapid_form ={
        consult_asrh_rapid_id: this.selected_asrh_consult.id,
        patient_id: this.patient_id,
        user_id: user_id,
        answers: rapid_arr
      }

      console.log(rapid_form)
      this.is_saving2 = true;
      this.http.post('asrh/rapid-answer', rapid_form).subscribe({
        next: (data : any) => {
          this.is_saving2 = false;
          this.toastr.success('Rapid Assessment Answers was ' + (this.selected_asrh_consult?.answers?.length !== 0 ? 'updated' : 'saved') + ' successfuly', 'Success')
          console.log(data, 'display save rapid answers')
          // if(this.selected_asrh_consult !== null)
             this.updateSelectedASRH.emit(data);
            //  this.loadASRH.emit();
            //  console.log(this.selected_asrh_consult, 'checker current selected')

        },
        error: err => console.log(err),

        complete: () =>
          console.log('success'),
      })
    }
  }

  reloadData(){
    let params = {
      patient_id: this.patient_id
    }

    this.http.get('asrh/rapid', {params}).subscribe({
      next: (data: any) => {
        this.selected_asrh_consult = data.data;
        this.updateSelectedASRH.emit(this.selected_asrh_consult);

        // console.log(this.selected_asrh_consult, 'reload data asrh rapid')
      },
      error: err => console.log(err)
    });
  }

  patchData(){

    if(this.selected_asrh_consult) {
      this.visitForm.patchValue({
        assessment_date: this.selected_asrh_consult?.assessment_date,
        lib_asrh_client_type_code: this.selected_asrh_consult?.lib_asrh_client_type_code,
        client_type: this.selected_asrh_consult?.client_type,
        other_client_type: this.selected_asrh_consult?.other_client_type,
        refused_flag: this.selected_asrh_consult?.refused_flag
        // refer_to_user_id: this.selected_asrh_consult?.refer_to_user_id,
        // status: this.selected_asrh_consult?.status,
      });
      console.log(this.selected_asrh_consult, 'patch data working selected asrh')
      console.log('patch data working')
      this.loadSelected();
      this.show_form = true;
    }
  }

  validateForm(){
    this.visitForm = this.formBuilder.group({
      id: [''],
      patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
      assessment_date: ['', [Validators.required, Validators.minLength(1)]],
      lib_asrh_client_type_code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]],
      client_type: ['', [Validators.required, Validators.minLength(1)]],
      other_client_type: [{ value: '', disabled: true }, [Validators.required]],
      refused_flag: [''],
      // refer_to_user_id: ['', [Validators.required]],
      // status: ['', [Validators.required]],



    });



   this.disableForm();
   this.disableForm2();
   this.disableForm3();
   this.patchData();
   this.show_form = true;
  }

  disableForm(){
    this.visitForm.get('client_type')?.valueChanges.subscribe((value) => {
      const libAsrhClientTypeCodeControl = this.visitForm.get('lib_asrh_client_type_code');
      if (value === 'walk-in' || value === '') {
        libAsrhClientTypeCodeControl?.reset();
        libAsrhClientTypeCodeControl?.disable();
      } else {
        libAsrhClientTypeCodeControl?.enable();
      }

    });
  }

  disableForm2() {
    this.visitForm.get('lib_asrh_client_type_code')?.valueChanges.subscribe((value) => {
      const otherClientControl = this.visitForm.get('other_client_type');
      if (value != 99) {
        otherClientControl?.reset();
        otherClientControl?.disable();
      } else {
        otherClientControl?.enable();
      }
    });
  }

  disableForm3() {
    const length = this.selected_asrh_consult?.answers?.length || 0;
    const statusControl = this.visitForm.get('status');
    const referControl = this.visitForm.get('refer_to_user_id');
    if (length === 0 || null) {
      statusControl?.reset();
      statusControl?.disable();
      referControl?.reset();
      referControl?.disable();
    } else {
      statusControl?.enable();
      referControl?.enable();
    }
  }

  getSelectedAsrhAnswersLength(): number {
    return this.selected_asrh_consult?.answers?.length || 0;
  }


  loadSelected() {
    if(this.selected_asrh_consult) {
      this.selected_asrh_consult?.answers.forEach((item: any) => {
        this.rapid_ans[item.question.id] = item.answer // Default to an empty string if no answer
      });
    }
    // console.log(this.rapid_ans, 'get existing rapid 12')
  }

  loadRapidLib(){
    this.http.get('libraries/rapid-questionnaire').subscribe({
      next: (data: any) => {
        this.rapid_questions = data.data;
       this.show_form = true;
        this.loadUsers();
        // this.validateForm();
        // this.loadASRH.emit();
      },
      error: err => console.log(err)
    });
  }

  loadUsers(){
    this.http.get('users', {params:{per_page: 'all', aja_flag: 1}}).subscribe({
      next: (data: any) => {
        // console.log(data.data)
        this.physicians = data.data
        console.log(this.physicians, 'users')
      },
      error: err => console.log(err)
    })
  }

  allQuestionsAnswered(): boolean {
    if(this.selected_asrh_consult === null || this.selected_asrh_consult?.answers?.length === 0)
      return this.rapid_questions.every((question: any) => this.rapid_ans[question.id] && this.rapid_ans[question.id] !== '');
    if(this.selected_asrh_consult?.answers?.length !== 0)
      return this.selected_asrh_consult?.answers?.some((item: any) => (this.rapid_ans[item.question.id] || '') !== (item.answer || '')) ?? false;


  }

  toggleModal(name){
    this.modals[name] = !this.modals[name];
    console.log('toggle modal')
  }

  openModal() {
    // Listen for changes to the checkbox

      console.log('toggle modal')
      this.toggleServiceModal();
  }

  closeModal() {
    this.showModal = false;  // Close the modal when the close button is clicked
    this.visitForm.get('refused_flag')?.setValue(false);  // Optionally uncheck the checkbox
  }

  showServiceModal = true;
  toggleServiceModal(){
    this.showServiceModal = !this.showServiceModal;
    this.visitForm.get('refused_flag')?.setValue(false);
  }

  acceptModal(){
    this.showServiceModal = !this.showServiceModal;
    this.visitForm.get('refused_flag')?.setValue(true);
  }

  // hasChanges(): boolean {


  // }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    // private router: Router
  ) { }

ngOnChanges(change: SimpleChanges): void{
    this.patchData();
    this.disableForm3();
    this.openModal();
  }

ngOnInit(): void {
    console.log(this.selected_asrh_consult, 'selected asrh in rapid')
    this.validateForm();
    this.loadRapidLib();

  }
}
