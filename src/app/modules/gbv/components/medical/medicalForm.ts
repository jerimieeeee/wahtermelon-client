import { FormControl, FormGroup } from "@angular/forms";

export function medicalForm() {
  return new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    patient_gbv_intake_id: new FormControl<string| null>(null),

    patient_temp: new FormControl<number| null>(null),
    patient_heart_rate: new FormControl<number| null>(null),
    patient_weight: new FormControl<number| null>(null),
    patient_height: new FormControl<number| null>(null),
    taking_medication_flag: new FormControl<boolean| null>(null),
    taking_medication_remarks: new FormControl<string| null>(null),

    general_survey_normal: new FormControl<boolean| null>(null),
    general_survey_abnormal: new FormControl<boolean| null>(null),
    general_survey_stunting: new FormControl<boolean| null>(null),
    general_survey_wasting: new FormControl<boolean| null>(null),
    general_survey_dirty_unkempt: new FormControl<boolean| null>(null),
    general_survey_stuporous: new FormControl<boolean| null>(null),
    general_survey_pale: new FormControl<boolean| null>(null),
    general_survey_non_ambulant: new FormControl<boolean| null>(null),
    general_survey_drowsy: new FormControl<boolean| null>(null),
    general_survey_respiratory: new FormControl<boolean| null>(null),
    general_survey_others: new FormControl<boolean| null>(null),
    gbv_general_survey_remarks: new FormControl<string| null>(null),

    menarche_flag: new FormControl<boolean| null>(null),
    menarche_age: new FormControl<boolean| null>(null),
    lmp_date: new FormControl<string| null>(null),
    genital_discharge_uti_flag: new FormControl<boolean| null>(null),
    past_hospitalizations_flag: new FormControl<boolean| null>(null),
    past_hospital_remarks: new FormControl<string| null>(null),
    scar_physical_abuse_flag: new FormControl<boolean| null>(null),
    pertinent_med_history_flag: new FormControl<boolean| null>(null),
    medical_history_remarks: new FormControl<string| null>(null),
    summary_non_abuse_findings: new FormControl<string| null>(null)
  });
}
