import {Component, Input, OnInit} from '@angular/core';
import {faInfoCircle, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {casdtForm} from "../casdt/form";
import {HttpService} from "../../../../shared/services/http.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {forkJoin} from "rxjs";
import {casdt2Form} from "./casdt2form";
import {faSave} from "@fortawesome/free-regular-svg-icons";
import {riskAssessForm} from "../risk-assessment/forms";

@Component({
  selector: 'app-casdt2',
  templateUrl: './casdt2.component.html',
  styleUrls: ['./casdt2.component.scss']
})
export class Casdt2Component implements OnInit {
  @Input() patient_id;
  @Input() consult_details;
  @Input() vaccine_details;

  casdt2Forms:FormGroup=casdt2Form();

  faInfoCircle = faInfoCircle;

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  show_form: boolean = false;

  eye_complaints: any[] = [];
  eye_refer: any[] = [];
  eye_vision_screen: any
  eye_refer_prof: any

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

  createForm() {
    this.casdt2Forms = this.formBuilder.nonNullable.group({
      id: [''],
      consult_ncd_risk_id: [this.consult_details.id, [Validators.required]],
      patient_ncd_id: [this.consult_details.patient_ncd_id, [Validators.required]],
      consult_id: [this.consult_details.consult_id, [Validators.required]],
      patient_id: [this.consult_details.patient_id, [Validators.required]],
      complaint: this.formBuilder.array([]), // Initialize as empty FormArray
      eye_refer: [null, Validators.required],
      unaided: [null, Validators.required],
      pinhole: [null, Validators.required],
      improved: [null, Validators.required],
      aided: [null, Validators.required],
      eye_refer_prof: [null, Validators.required],
    });
  }

  // Method to add eye_complaint item to the casdt FormArray
  addEyeComplaint(value: string) {
    const casdtArray = this.casdt2Forms.get('complaint') as FormArray;
    casdtArray.push(this.formBuilder.group({
      eye_complaint: [value]
    }));
  }

  // Method to remove eye_complaint item from the casdt FormArray
  removeEyeComplaint(index: number) {
    const casdtArray = this.casdt2Forms.get('complaint') as FormArray;
    casdtArray.removeAt(index);
  }

  // Example method to handle checkbox selection
  handleCheckboxSelection(value: string, isChecked: boolean) {
    if (isChecked) {
      this.addEyeComplaint(value);
    } else {
      const index = (this.casdt2Forms.get('complaint') as FormArray).controls.findIndex(
        control => control.value.eye_complaint === value
      );
      if (index !== -1) {
        this.removeEyeComplaint(index);
      }
    }
  }

  is_saving: boolean = false;
  onSubmit() {
    console.log(this.casdt2Forms, 'eto');
    console.log(this.casdt2Forms.value, 'hahah');
    this.is_saving = true;

    if(this.casdt2Form.valid){
      this.http.post('non-communicable-disease/risk-casdt2', this.casdt2Forms.value).subscribe({
        next: (data: any) => {
          this.toastr.success('Recorded successfully!','Casdt2');
          this.is_saving = false;
        },
        error: err => { this.http.showError(err.error.message, 'Casdt2'); }
      })
    }
  }

  ngOnInit(): void {
    this.lodFormLibraries();
  }

  protected readonly casdt2Form = casdtForm;
  protected readonly faSave = faSave;
  protected readonly faSpinner = faSpinner;
  protected readonly riskAssessForm = riskAssessForm;
}
