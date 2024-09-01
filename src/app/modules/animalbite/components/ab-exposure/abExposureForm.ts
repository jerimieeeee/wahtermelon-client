import { FormControl, FormGroup } from "@angular/forms";

export function abExposureForm() {
  return new FormGroup({
    id: new FormControl<string|null>(null),
    patient_id: new FormControl<string|null>(null),
    consult_date: new FormControl<string|null>(null),
    exposure_date: new FormControl<string|null>(null),
    patient_ab_id: new FormControl<string|null>(null),
    animal_type_id: new FormControl<number|null>(null),
    animal_type_remarks: new FormControl<string|null>(null),
    exposure_place: new FormControl<string|null>(null),
    bite_flag: new FormControl<boolean|null>(false),
    animal_ownership_id: new FormControl<number|null>(null),
    animal_vaccine_date: new FormControl<number|null>(null),
    feet_flag: new FormControl<boolean|null>(false),
    leg_flag: new FormControl<boolean|null>(false),
    arms_flag: new FormControl<boolean|null>(false),
    hand_flag: new FormControl<boolean|null>(false),
    knee_flag: new FormControl<boolean|null>(false),
    neck_flag: new FormControl<boolean|null>(false),
    head_flag: new FormControl<boolean|null>(false),
    others_flag: new FormControl<boolean|null>(false),
    al_remarks: new FormControl<string|null>(null),
    category_id : new FormControl<string|null>(null),
    exposure_type_code : new FormControl<string|null>(null),
    wash_flag: new FormControl<boolean|null>(false),
    pep_flag: new FormControl<boolean|null>(false),
    tandok_name: new FormControl<string|null>(null),
    tandok_date: new FormControl<string|null>(null),
    tandok_addresss: new FormControl<string|null>(null),
    remarks: new FormControl<string|null>(null),
  })
}
