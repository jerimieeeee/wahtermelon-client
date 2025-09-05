import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import { formatDate } from '@angular/common';
import { faCalendarDay, faPlus, faSave, faTimes, faPencil, faCircleCheck, faCaretRight, faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { el } from 'date-fns/locale';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-rapid-heeadsss',
    templateUrl: './rapid-heeadsss.component.html',
    styleUrl: './rapid-heeadsss.component.scss',
    standalone: false
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

  refusal_reasons: any = [];
 living_conditions: any = [];

  rapid_ans: { [key: number]: string } = {};

  rapidForm: any = {

    rapid_status: [],

  };

  modals: any = [];

  refusal_options: any;

  type_client = [
    { name: 'walk-in', id:'1' },
    { name: 'referred', id:'2' },

  ];

  // living_conditions = [
  //   { name: 'living in with partner', id:'1' },
  //   { name: 'living with family', id:'2' },
  //   { name: 'living with extended family', id:'3' },
  //   { name: 'living alone', id:'4' },
  //   { name: 'in a shelter', id:'5' },

  // ];

  // refusal_reasons = [
  //   { name: 'trust issues', id:'1' },
  //   { name: 'fear of judgement', id:'2' },
  //   { name: 'under estimation of the tools importance', id:'4' },
  //   { name: 'others, specify', id:'5' }

  // ];

  statuses = [
    { name: 'done', id:'1' },
    { name: 'refused', id:'2' },

  ];

  max_date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');
  today_date: string; // or Date, depending on how you handle the input

  visitForm: FormGroup = new FormGroup({
    patient_id: new FormControl<string| null>(''),
    assessment_date: new FormControl<string| null>(''),
    client_type: new FormControl<string| null>(''),
    lib_asrh_client_type_code: new FormControl<string| null>(''),
    other_client_type: new FormControl<string| null>(''),
    lib_asrh_living_arrangement_type_id: new FormControl<string| null>(''),
    refused_flag: new FormControl<boolean>(false),
    done_flag: new FormControl<boolean>(false),
    done_date: new FormControl<string| null>(''),
    lib_asrh_refusal_reason_id: new FormControl<string| null>(''),
    refusal_reason_other: new FormControl<string| null>(''),
    // algorithm_remarks: new FormControl<string| null>('')
    // refer_to_user_id: new FormControl<string| null>(''),
    // status: new FormControl<string| null>(''),
  });

  // createRapid(){
  //   this.is_saving = true;
  //   if(this.selected_asrh_consult === null){
  //     this.http.post('asrh/rapid', this.visitForm.value).subscribe({
  //       next: (data : any) => {
  //         this.is_saving = false;
  //         this.toastr.success('Rapid Assessment Details was saved successfully');
  //         this.updateSelectedASRH2.emit(data.data.id);
  //       },
  //       error: err => {
  //         this.is_saving = false;
  //         console.log(err);
  //       },
  //       complete: () => console.log('success')
  //     });
  //   } else {
  //     this.http.update('asrh/rapid/', this.selected_asrh_consult.id, this.visitForm.value).subscribe({
  //       next: (data : any) => {
  //         this.is_saving = false;
  //         this.toastr.success('Rapid Assessment Details was updated successfully');
  //         this.updateSelectedASRH.emit(data);
  //         console.log(data, 'rapid details');
  //       },
  //       error: err => {
  //         this.is_saving = false;
  //         console.log(err);
  //       },
  //       complete: () => console.log('success')
  //     });
  //   }
  // }

  onSubmit(){
    var rapid_arr = [];

    // console.log(this.selected_asrh_consult, 'test')
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

      // console.log(rapid_form)
      this.is_saving2 = true;
      this.http.post('asrh/rapid-answer', rapid_form).subscribe({
        next: (data : any) => {
          this.is_saving2 = false;
          this.toastr.success('Rapid Assessment Answers was ' + (this.selected_asrh_consult?.answers?.length !== 0 ? 'updated' : 'saved') + ' successfuly', 'Success')
          // console.log(data, 'display save rapid answers')
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
        lib_asrh_living_arrangement_type_id: this.selected_asrh_consult?.lib_asrh_living_arrangement_type_id,
        refused_flag: this.selected_asrh_consult?.refused_flag,
        done_flag: this.selected_asrh_consult?.done_flag,
        done_date: this.selected_asrh_consult?.done_date,
        lib_asrh_refusal_reason_id: this.selected_asrh_consult?.lib_asrh_refusal_reason_id,
        refusal_reason_other: this.selected_asrh_consult?. refusal_reason_other,
        // referral_date: this.selected_asrh_consult?.referral_date,
        // algorithm_remarks: this.selected_asrh_consult?.algorithm_remarks
        // refer_to_user_id: this.selected_asrh_consult?.refer_to_user_id,
        // status: this.selected_asrh_consult?.status,
      });
      // console.log(this.selected_asrh_consult, 'patch data working selected asrh')
      // console.log('patch data working')
      this.loadSelected();
      this.show_form = true;
    }
    else {
      this.visitForm.patchValue({
        assessment_date: this.max_date,
      });
    }
  }

  validateForm() {
    this.visitForm = this.formBuilder.group({
      id: [''],
      patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
      assessment_date: ['', [Validators.required, Validators.minLength(1), this.noFutureDateValidator]],
      lib_asrh_client_type_code: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]],
      client_type: ['', [Validators.required, Validators.minLength(1)]],
      other_client_type: [{ value: '', disabled: true }, [Validators.required]],
      refused_flag: [false],
      lib_asrh_living_arrangement_type_id: ['', [Validators.required, Validators.minLength(1)]],
      done_flag: [false],
      done_date: [''],
      lib_asrh_refusal_reason_id: [{value: '', disabled: true}, [Validators.required, Validators.minLength(1)]],
      refusal_reason_other: [{value: '', disabled: true}, [Validators.required, Validators.minLength(1)]],
      // referral_date: ['', [Validators.required, Validators.minLength(1)]],
      // algorithm_remarks: ['', [Validators.required]],
      // refer_to_user_id: ['', [Validators.required]],
      // status: ['', [Validators.required]],


    });

    // if (this.selected_asrh_consult?.refused_flag === true) {
    //   this.visitForm.addControl(
    //     'done_date',
    //     new FormControl<string | null>(this.selected_asrh_consult?.refusal_reason, [
    //       Validators.required,
    //       Validators.minLength(1),
    //     ])
    //   );
    // } else {
    //   this.visitForm.addControl('refusal_reason', new FormControl(null)); // Or set it as null if done_flag is not 1
    // }

    // if (this.selected_asrh_consult?.refusal_reason === 'others') {
    //   this.visitForm.addControl(
    //     'other_refusal',
    //     new FormControl<string | null>(this.selected_asrh_consult?.other_refusal, [
    //       Validators.required,
    //       Validators.minLength(1),
    //     ])
    //   );
    // } else {
    //   this.visitForm.addControl('other_refusal', new FormControl(null)); // Or set it as null if done_flag is not 1
    // }


    this.disableForm();
    this.disableForm2();
    this.disableForm3();
    this.disableForm4();
    this.disableForm5();
    this.patchData();
    this.patchData();
    this.show_form = true;
  }

  noFutureDateValidator(control: FormControl) {
    const inputDate = new Date(control.value);
    const today = new Date();
    if (inputDate > today) {
      return { futureDate: true };
    }
    return null;
  }

  createRapid() {
    const newAssessmentDate = this.visitForm.get('assessment_date')?.value;

    // Check if assessment_date already exists
    const dateExists = this.patient_asrh_history.some(
      (record) => record.assessment_date === newAssessmentDate
    );

    if (dateExists && this.patient_asrh_history.done_flag === 1) {
      alert('Assessment date already exists! Choose a different date.');
    } else {


    this.is_saving = true;
    const formValue = { ...this.visitForm.value };
    if (!formValue.done_flag) {
      delete formValue.done_date;
    }
    if (this.selected_asrh_consult === null) {
      this.http.post('asrh/rapid', formValue).subscribe({
        next: (data: any) => {
          this.is_saving = false;
          this.toastr.success('Rapid Assessment Details was saved successfully');
          this.updateSelectedASRH2.emit(data.data.id);
        },
        error: err => {
          this.is_saving = false;
          console.log(err);
        },
        // complete: () => console.log('success')
      });
    } else {
      this.http.update('asrh/rapid/', this.selected_asrh_consult.id, formValue).subscribe({
        next: (data: any) => {
          this.is_saving = false;
          this.toastr.success('Rapid Assessment Details was updated successfully');
          this.updateSelectedASRH.emit(data);
          // console.log(data, 'rapid details');
        },
        error: err => {
          this.is_saving = false;
          console.log(err);
        },
        // complete: () => console.log('success')
      });
    }
  }
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

  disableForm4(){
    this.visitForm.get('refused_flag')?.valueChanges.subscribe((value) => {
      const libAsrhClientTypeCodeControl = this.visitForm.get('lib_asrh_refusal_reason_id');
      if (value !== true || value === '') {
        libAsrhClientTypeCodeControl?.reset();
        libAsrhClientTypeCodeControl?.disable();
      } else {
        libAsrhClientTypeCodeControl?.enable();
      }

    });
  }

  disableForm5(){
    this.visitForm.get('lib_asrh_refusal_reason_id')?.valueChanges.subscribe((value) => {
      const OtherReasonControl = this.visitForm.get('refusal_reason_other');
      if (value != 99 || value === '') {
        OtherReasonControl?.reset();
        OtherReasonControl?.disable();
      } else {
        OtherReasonControl?.enable();
      }

    });
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

       this.loadLibraries();
        this.loadUsers();
        this.show_form = true;
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
        // console.log(this.physicians, 'users')
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
    // console.log('toggle modal')
  }

  openModal() {
    // Listen for changes to the checkbox

        this.toggleServiceModal();

  }

  closeModal() {
    this.showModal = false;  // Close the modal when the close button is clicked
    this.visitForm.get('refused_flag')?.setValue(false);  // Optionally uncheck the checkbox
  }

  showServiceModal = false;
  toggleServiceModal() {
    this.showServiceModal = !this.showServiceModal;
    this.visitForm.get('refused_flag')?.setValue(false);
  }


  acceptModal(){
    this.showServiceModal = !this.showServiceModal;
    this.visitForm.get('refused_flag')?.setValue(true);
  }

  dateToday() {
    const today = new Date();
    this.today_date = today.toISOString().split('T')[0]; // Formats date as YYYY-MM-DD
  }

  isDuplicateDate(): boolean {
    const newAssessmentDate = this.visitForm.get('assessment_date')?.value;
    const newAssessmentStatus = this.visitForm.get('done_flag')?.value;
    return this.patient_asrh_history.some(
      (record: { assessment_date: string; done_flag: boolean }) =>
        record.assessment_date === newAssessmentDate &&
        (record.done_flag !== newAssessmentStatus || record.done_flag === newAssessmentStatus) &&
        record.assessment_date !== this.selected_asrh_consult?.assessment_date
    );
  }

  disableEnterKey(event: KeyboardEvent) {
    event.preventDefault();
  }

  loadLibraries() {
      const getRefusal = this.http.get('libraries/refusal-reason');
      const getLiving = this.http.get('libraries/living-arrangement');

      forkJoin([getRefusal, getLiving]).subscribe({
        next: ([dataRefusal, dataLiving]: any) => {
          this.refusal_reasons = dataRefusal.data;
          this.living_conditions = dataLiving.data;
          this.show_form = true;
          // console.log(this.living_conditions, this.client_types, 'libraries')
          // console.log(this.refusal_reasons, this.client_types, 'libraries')
        },
        error: err => console.log(err)
      });
    }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    // private router: Router
  ) { }

ngOnChanges(change: SimpleChanges): void{
    this.patchData();
    this.disableForm3();
    this.disableForm5();
    // this.openModal();
  }

ngOnInit(): void {
    // console.log(this.patient_asrh_history, 'patient asrh history main')
    this.validateForm();
    this.loadRapidLib();
    // this.loadLibraries();
    // this.refusal_options = this.refusal_reasons;
  }
}
