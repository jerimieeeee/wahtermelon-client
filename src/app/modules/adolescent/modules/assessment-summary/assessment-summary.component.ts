import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { faChevronCircleDown, faChevronCircleUp, faSave, faSpinner, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-assessment-summary',
    templateUrl: './assessment-summary.component.html',
    styleUrl: './assessment-summary.component.scss',
    standalone: false
})
export class AssessmentSummaryComponent implements OnInit {
  @Input() patient_id: any;
  @Input() selected_asrh_consult: any;
  @Output() loadASRH = new EventEmitter<any>();
  @Output() updateSelectedASRH = new EventEmitter<any>();
  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;
  faChevronUp = faChevronUp
  faChevronDown = faChevronDown

  show_content: boolean = true;
  is_saving: boolean = false;
  toggle_content: boolean = true;

  asrh_visit_history: any = [];
  rapid_history: any = [];

  selected: any;

  physicians: any;

  max_date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en', 'Asia/Manila');

  date_today = formatDate(new Date(), 'MM/dd/yyyy', 'en', 'Asia/Manila');

  visitForm: FormGroup = new FormGroup({
      patient_id: new FormControl<string| null>(''),
      assessment_date: new FormControl<string| null>(''),
      client_type: new FormControl<string| null>(''),
      lib_asrh_client_type_code: new FormControl<string| null>(''),
      other_client_type: new FormControl<string| null>(''),
      refused_flag: new FormControl<boolean>(false),
      refer_to_user_id: new FormControl<string| null>(''),
      referral_date: new FormControl<string| null>(''),
      done_flag: new FormControl<boolean>(false),
      done_date: new FormControl<string| null>(''),
      algorithm_remarks: new FormControl<string| null>(''),
      lib_asrh_living_arrangement_type_id: new FormControl<string| null>('')
    });

    createRapid(){
      this.is_saving = true;

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

  selectVisit(){
    this.selected = this.selected_asrh_consult;
    this.validateForm();
  }

  parseReason(selected_asrh_consult) {
    console.log(selected_asrh_consult, 'parseReason')
    if(selected_asrh_consult) {
      let obj: any = typeof selected_asrh_consult === 'object' ? JSON.stringify(selected_asrh_consult) : selected_asrh_consult;
      let message: any = '';

      if(obj.charAt(0) === '[') {
        obj = JSON.parse(obj);
      } else {
        if(obj.charAt(0) === '{') {
          obj = JSON.parse(obj);
        } else {
          return obj;
        }
      }

      const parse = (obj: any) => {
        Object.entries(obj).forEach(([key, value]: any) => {
          if (typeof value === 'object' && value !== null) {
            parse(value);
          } else {
            message += `${value}<br>`;
          }
        });
      };

      parse(obj);
      return message;
    }
    return '';

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

  patchData() {
    if (this.selected_asrh_consult) {
      this.visitForm.patchValue({
        patient_id: this.patient_id,
        assessment_date: this.selected_asrh_consult?.assessment_date,
        client_type: this.selected_asrh_consult?.client_type,
        lib_asrh_client_type_code: this.selected_asrh_consult?.lib_asrh_client_type_code,
        other_client_type: this.selected_asrh_consult?.other_client_type,
        refused_flag: this.selected_asrh_consult?.refused_flag,
        refer_to_user_id: this.selected_asrh_consult?.refer_to_user_id,
        done_flag: this.selected_asrh_consult?.done_flag,
        done_date: this.selected_asrh_consult?.done_date || this.max_date,
        referral_date: this.selected_asrh_consult?.referral_date || this.max_date,
        algorithm_remarks: this.selected_asrh_consult?.algorithm_remarks,
        lib_asrh_living_arrangement_type_id: this.selected_asrh_consult?.lib_asrh_living_arrangement_type_id,
      });
      console.log(this.selected_asrh_consult, 'patch data working selected asrh');
      console.log('patch data working');
    }

  }

  validateForm(){
      const formControls = {
        patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
        assessment_date: [this.selected_asrh_consult?.assessment_date, [Validators.required, Validators.minLength(1)]],
        lib_asrh_client_type_code: [this.selected_asrh_consult?.lib_asrh_client_type_code || '', [Validators.required, Validators.minLength(1)]],
        client_type: [this.selected_asrh_consult?.client_type, [Validators.required, Validators.minLength(1)]],
        other_client_type: [this.selected_asrh_consult?.other_client_type || '', [Validators.required]],
        refer_to_user_id: [this.selected_asrh_consult?.refer_to_user_id || ''],
        done_flag: [this.selected_asrh_consult.done_flag, [Validators.required, Validators.minLength(1)]],
        done_date: [this.selected_asrh_consult?.done_date, [Validators.required, Validators.minLength(1)]],
        refused_flag: [this.selected_asrh_consult?.refused_flag, [Validators.required, Validators.minLength(1)]],
        referral_date: [this.selected_asrh_consult?.referral_date || ''],
        algorithm_remarks: [this.selected_asrh_consult?.algorithm_remarks, [Validators.required, Validators.minLength(50)]],
        lib_asrh_living_arrangement_type_id: [this.selected_asrh_consult?.lib_asrh_living_arrangement_type_id, [Validators.required, Validators.minLength(1)]],
      };

      if (this.selected_asrh_consult?.lib_asrh_client_type_code === null) {
        formControls.lib_asrh_client_type_code = [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]];
      }

      if (this.selected_asrh_consult?.other_client_type === null) {
        formControls.other_client_type = [{ value: '', disabled: true }, [Validators.required]];
      }

      this.visitForm = this.formBuilder.group(formControls);




     this.disableForm();
     this.disableForm2();
    //  this.disableForm3();
     this.patchData();
    //  this.show_form = true;
    }

    checkAnswers(answers): boolean {
      let showAlgo: boolean = false;
      Object.entries(answers).forEach(([key, value]: any, index) => {
        console.log(value.answer)
        if(value.answer === '1') {
          showAlgo = true;
        }
      });

      return showAlgo;
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


  constructor(
      private http: HttpService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      // private router: Router
    ) { }

  ngOnInit(): void {
    // this.loadASRH.emit();
  this.loadUsers();
  this.selectVisit();
    console.log(this.selected_asrh_consult, 'check mo selected rapid')
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnChanges(changes){
    this.show_content = this.toggle_content;

  }


}
