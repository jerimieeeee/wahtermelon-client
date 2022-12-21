import { FormControl, FormGroup } from "@angular/forms";

export const glucoseForm: FormGroup = new FormGroup({
  consult_ncd_risk_id: new FormControl<string| null>(''),
  patient_ncd_id: new FormControl<string| null>(''),
  patient_id: new FormControl<string| null>(''),
  date_taken: new FormControl<string| null>(''),
  fbs: new FormControl<string| null>(''),
  rbs: new FormControl<string| null>(''),
  raised_blood_glucose: new FormControl<string| null>(''),
});

export const bloodLipidForm: FormGroup = new FormGroup({
  consult_ncd_risk_id: new FormControl<string| null>(''),
  patient_ncd_id: new FormControl<string| null>(''),
  patient_id: new FormControl<string| null>(''),
  date_taken: new FormControl<string| null>(''),
  total_cholesterol: new FormControl<string| null>(''),
  raised_lipid: new FormControl<string| null>(''),
});

export const urineKetonesForm: FormGroup = new FormGroup({
  consult_ncd_risk_id: new FormControl<string| null>(''),
  patient_ncd_id: new FormControl<string| null>(''),
  patient_id: new FormControl<string| null>(''),
  date_taken: new FormControl<string| null>(''),
  ketone: new FormControl<string| null>(''),
  presence_urine_ketone: new FormControl<string| null>(''),
});

export const urineProteinForm: FormGroup = new FormGroup({
  consult_ncd_risk_id: new FormControl<string| null>(''),
  patient_ncd_id: new FormControl<string| null>(''),
  patient_id: new FormControl<string| null>(''),
  date_taken: new FormControl<string| null>(''),
  protein: new FormControl<string| null>(''),
  presence_urine_protein: new FormControl<string| null>(''),
});
