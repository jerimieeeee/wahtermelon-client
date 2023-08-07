import { FormControl, FormGroup } from "@angular/forms";

export function preExposureForm() {
  return new FormGroup({
    id: new FormControl<string|null>(null),
    patient_id: new FormControl<string|null>(null),
    indication_option_code: new FormControl<string|null>(null),
    indication_option_remarks: new FormControl<string|null>(''),
    day0_date: new FormControl<string|null>(null),
    day0_vaccine_code: new FormControl<string|null>(null),
    day0_vaccine_route_code: new FormControl<string|null>(null),
    day7_date: new FormControl<string|null>(null),
    day7_vaccine_code: new FormControl<string|null>(null),
    day7_vaccine_route_code: new FormControl<string|null>(null),
    day21_date: new FormControl<string|null>(null),
    day21_vaccine_code: new FormControl<string|null>(null),
    day21_vaccine_route_code: new FormControl<string|null>(null),
    remarks: new FormControl<string|null>(null)
  })
}
