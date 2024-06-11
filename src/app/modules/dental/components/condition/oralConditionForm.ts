import { FormControl, FormGroup } from "@angular/forms";

export function oralCOnditionForm() {
  return new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    consult_id: new FormControl<string| null>(null),

    healthy_gums_flag: new FormControl<boolean| null>(false),
    orally_fit_flag: new FormControl<boolean| null>(false),
    oral_rehab_flag: new FormControl<boolean| null>(false),
    dental_caries_flag: new FormControl<boolean| null>(false),
    gingivitis_flag: new FormControl<boolean| null>(false),
    periodontal_flag: new FormControl<boolean| null>(false),
    debris_flag: new FormControl<boolean| null>(false),
    calculus_flag: new FormControl<boolean| null>(false),
    abnormal_growth_flag: new FormControl<boolean| null>(false),
    cleft_lip_flag: new FormControl<boolean| null>(false),
    supernumerary_flag: new FormControl<boolean| null>(false),
    dento_facial_flag: new FormControl<string| null>(''),
    others_flag: new FormControl<string| null>(''),
    remarks: new FormControl<string| null>(''),
  });
}
