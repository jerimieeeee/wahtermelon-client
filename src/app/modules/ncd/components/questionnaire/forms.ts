import { FormControl, FormGroup } from "@angular/forms";

export const questionnaireForm: FormGroup = new FormGroup({
  consult_ncd_risk_id: new FormControl<string| null>(null),
  patient_ncd_id: new FormControl<string| null>(null),
  consult_id: new FormControl<string| null>(null),
  patient_id: new FormControl<string| null>(null),
  question1: new FormControl<string| null>(null),
  question2: new FormControl<string| null>(null),
  question3: new FormControl<string| null>(null),
  question4: new FormControl<string| null>(null),
  question5: new FormControl<string| null>(null),
  question6: new FormControl<string| null>(null),
  question7: new FormControl<string| null>(null),
  question8: new FormControl<string| null>(null),
  angina_heart_attack: new FormControl<boolean| null>(null),
  stroke_tia: new FormControl<boolean| null>(null),
});
