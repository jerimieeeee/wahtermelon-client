import {Component, Input, OnInit} from '@angular/core';
import {faInfoCircle, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {HttpService} from "../../../../shared/services/http.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {forkJoin} from "rxjs";
import {casdt2Form} from "./casdt2form";
import {faSave} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-casdt2',
  templateUrl: './casdt2.component.html',
  styleUrls: ['./casdt2.component.scss']
})
export class Casdt2Component implements OnInit {
  @Input() patient_id;
  @Input() consult_details;
  @Input() vaccine_details;

  casdt2Form:FormGroup=casdt2Form();

  faSave = faSave;
  faSpinner = faSpinner;
  faInfoCircle = faInfoCircle;




  show_form: boolean = false;

  eye_complaints: any[] = [];
  eye_refer: any[] = [];
  eye_vision_screen: any
  eye_refer_prof: any
  complaints: any = [];

  is_saving: boolean = false;
  onSubmit() {
    this.is_saving = true;

    let complaint_arr: any = [];
    Object.entries(this.complaints).forEach(([key, value]:any, index) => {
      if(value) complaint_arr.push({ eye_complaint: key });
    });

    this.casdt2Form.patchValue({complaint: complaint_arr});

    console.log(this.casdt2Form)
    if(this.casdt2Form.valid){
      this.http.post('non-communicable-disease/risk-casdt2', this.casdt2Form.value).subscribe({
        next: () => {
          this.toastr.success('Recorded successfully!','Casdt2');
          this.is_saving = false;
        },
        error: err => { this.http.showError(err.error.message, 'Casdt2'); }
      })
    }
  }

  createForm() {
    this.casdt2Form = this.formBuilder.nonNullable.group({
      id: [''],
      consult_ncd_risk_id: [this.consult_details.id, [Validators.required]],
      patient_ncd_id: [this.consult_details.patient_ncd_id, [Validators.required]],
      consult_id: [this.consult_details.consult_id, [Validators.required]],
      patient_id: [this.consult_details.patient_id, [Validators.required]],
      eye_complaint: [null],
      complaint: [null], // Initialize as empty FormArray
      eye_refer: [null],
      unaided: [null, Validators.required],
      pinhole: [null, Validators.required],
      improved: [null, Validators.required],
      aided: [null, Validators.required],
      eye_refer_prof: [null, Validators.required],
    });

    if(this.consult_details.riskCasdt2) this.casdt2Form.patchValue({...this.consult_details.riskCasdt2[0]});
    if(this.consult_details && this.consult_details.eye_complaints.length > 0) {
      Object.entries(this.consult_details.eye_complaints).forEach(([key, value]:any, index) => {
        this.complaints[value.eye_complaint] = true;
      });
    }

    console.log(this.casdt2Form.value)
  }

  lodFormLibraries() {
    const getEyeComplaints = this.http.get('libraries/ncd-eye-complaint');
    const getEyeRefer = this.http.get('libraries/ncd-eye-refer');
    const getEyeVisionScreen = this.http.get('libraries/ncd-eye-vision-screen');
    const getEyeReferProf = this.http.get('libraries/ncd-eye-refer-prof');

    forkJoin([
      getEyeComplaints,
      getEyeRefer,
      getEyeVisionScreen,
      getEyeReferProf
    ]).subscribe({
      next: ([dataEyeComplaints, dataEyeRefer, dataEyeVisionScreen, dataEyeReferProf]: any) => {
        this.eye_complaints = dataEyeComplaints.data;
        this.eye_refer = dataEyeRefer.data;
        this.eye_vision_screen = dataEyeVisionScreen.data;
        this.eye_refer_prof = dataEyeReferProf.data;
        this.show_form = true;

        this.createForm();
      },
      error: err => { this.http.showError(err.error.message, 'Casdt2 Library'); }
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.consult_details)
    this.lodFormLibraries();
  }
}
