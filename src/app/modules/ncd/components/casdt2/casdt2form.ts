import {FormControl, FormGroup, Validators} from "@angular/forms";

export function casdt2Form() {
  return new FormGroup({
    id: new FormControl<string| null>(null),
    consult_ncd_risk_id: new FormControl<string| null>(null),
    patient_ncd_id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    consult_id: new FormControl<string| null>(null),

    complaint: new FormControl<string| null>(null),
    eye_complaint: new FormControl<string| null>(null),
    eye_refer: new FormControl<string| null>(null),
    unaided: new FormControl<string| null>(null),
    pinhole: new FormControl<string| null>(null),
    improved: new FormControl<string| null>(null),
    aided: new FormControl<string| null>(null),
    eye_refer_prof: new FormControl<string| null>(null),
  });
}
