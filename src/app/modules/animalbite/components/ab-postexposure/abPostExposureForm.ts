import { FormControl, FormGroup } from "@angular/forms";

export function abPostExposureForm() {
  return new FormGroup({
    id: new FormControl<string|null>(null),
    patient_id: new FormControl<string|null>(null),
    patient_ab_id: new FormControl<string|null>(null),
    weight: new FormControl<number|null>(null),
    animal_status_code: new FormControl<string|null>(null),
    animal_status_date: new FormControl<string|null>(null),
    rig_type_code: new FormControl<string|null>(null),
    rig_type_date: new FormControl<string|null>(null),
    booster_1_flag: new FormControl<boolean|null>(false),
    booster_2_flag: new FormControl<boolean|null>(false),
    other_vacc_date: new FormControl<string|null>(null),
    other_vacc_dec: new FormControl<string|null>(null),
    other_vacc_route_code: new FormControl<string|null>(null),
    day0_date: new FormControl<string|null>(null),
    day0_vaccine_code: new FormControl<string|null>(null),
    day0_vaccine_route_code: new FormControl<string|null>(null),
    day3_date: new FormControl<string|null>(null),
    day3_vaccine_code: new FormControl<string|null>(null),
    day3_vaccine_route_code: new FormControl<string|null>(null),
    day7_date: new FormControl<string|null>(null),
    day7_vaccine_code: new FormControl<string|null>(null),
    day7_vaccine_route_code: new FormControl<string|null>(null),
    day14_date: new FormControl<string|null>(null),
    day14_vaccine_code: new FormControl<string|null>(null),
    day14_vaccine_route_code: new FormControl<string|null>(null),
    day28_date: new FormControl<string|null>(null),
    day28_vaccine_code: new FormControl<string|null>(null),
    day28_vaccine_route_code: new FormControl<string|null>(null),
  })
}
