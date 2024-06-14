import {Component, Input, OnInit} from '@angular/core';
import { faSearch,faBalanceScale,faPlus,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {questionnaireForm} from "../questionnaire/forms";
import {casdtForm} from "../casdt/form";
import {HttpService} from "../../../../shared/services/http.service";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-casdt2',
  templateUrl: './casdt2.component.html',
  styleUrls: ['./casdt2.component.scss']
})
export class Casdt2Component implements OnInit {
  @Input() patient_id;
  @Input() consult_details;

  faInfoCircle = faInfoCircle;

  eye = [
    {code: 'BLUR', desc: 'Blurred (Malabo, maupal o mausok)'},
    {code: 'FLOAT', desc: 'Floaters (May lumulutang)'},
    {code: 'TEAR', desc: 'Tearing (Pagluluha)'},
    {code: 'PAIN', desc: 'Pain (Mahapdi, masakit o mabigat sa pakiramdam)'},
    {code: 'RED', desc: 'Redness (Namumula)'},
    {code: 'GLARE', desc: 'Glare (Nasisilaw)'},
    {code: 'DISCH', desc: 'Discharge (May muta)'},
    {code: 'PHOTOP', desc: 'Photopsia (May kumikislap)'},
    {code: 'ITCH', desc: 'Itchiness (Makati)'}
  ];

  opthal = [
    {code: 'INJURY', desc: 'Eye Injury'},
    {code: 'FOREIGN', desc: 'Foreign Body'}
  ];

  vision_eye = [
    {code: 'RIGHT', desc: 'Right Eye'},
    {code: 'LEFT', desc: 'Left Eye'},
    {code: 'BOTH', desc: 'Both Eye'},
    {code: 'NONE', desc: 'None'}
  ];

  refer = [
    {code: 'IMPROVE', desc: 'If VA is 20/40 to 20/100 but IMPROVES WITH PINHOLE: Refer to OPTOMETRIST'},
    {code: 'NOTIMPROVE', desc: 'If VA is 20/40 to 20/100 but DOES NOT IMPROVE WITH PINHOLE: Refer to OPHTHALMOLOGIST'},
    {code: 'WORSE', desc: 'If VA is 20/200 or worse: Refer to OPHTHALMOLOGIST'}
  ];

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  is_saving: boolean = false;
  show_form: boolean = false;

  eye_complaints: any
  eye_refer: any
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

        // this.createForm();
      },
      error: err => console.log(err)
    })
  }

  onSubmit() {
    this.is_saving = true;

    if(this.casdt2Form.valid){
      this.http.post('non-communicable-disease/risk-questionnaire', this.casdt2Form.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success('Recorded successfully!','Questionnaire');
          this.is_saving = false;
        },
        error: err => console.log(err)
      })
    }
  }

  ngOnInit(): void {
    // console.log(this.patient_id, 'amen')
    console.log(this.consult_details, 'amen')
    this.lodFormLibraries();
  }

  protected readonly casdt2Form = casdtForm;
}
