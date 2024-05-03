import { FormControl, FormGroup } from "@angular/forms";

export function medicalSocialForm() {
  return new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),

    allergies_flag: new FormControl<boolean| null>(false),
    hypertension_flag: new FormControl<boolean| null>(false),
    diabetes_flag: new FormControl<boolean| null>(false),
    blood_disorder_flag: new FormControl<boolean| null>(false),
    heart_disease_flag: new FormControl<boolean| null>(false),
    thyroid_flag: new FormControl<boolean| null>(false),
    hepatitis_flag: new FormControl<boolean| null>(false),
    malignancy_flag: new FormControl<boolean| null>(false),
    blood_transfusion_flag: new FormControl<boolean| null>(false),
    tattoo_flag: new FormControl<boolean| null>(false),
    medical_others_flag: new FormControl<boolean| null>(false),
    medical_remarks: new FormControl<string| null>(''),

    sweet_flag: new FormControl<boolean| null>(false),
    tabacco_flag: new FormControl<boolean| null>(false),
    alcohol_flag: new FormControl<boolean| null>(false),
    nut_flag: new FormControl<boolean| null>(false),
    social_others_flag: new FormControl<boolean| null>(false),
    social_remarks: new FormControl<string| null>(''),
  });
}
