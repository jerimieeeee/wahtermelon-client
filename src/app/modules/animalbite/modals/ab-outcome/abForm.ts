import { FormControl, FormGroup } from "@angular/forms";

export function abForm() {
  return new FormGroup({
    id: new FormControl<string|null>(null),
    patient_id: new FormControl<string|null>(null),
    consult_date: new FormControl<string|null>(null),
    exposure_date: new FormControl<string|null>(null),
    ab_treatment_outcome_id: new FormControl<number|null>(null),
    date_outcome: new FormControl<string|null>(null),
    ab_death_place_id: new FormControl<number|null>(null),
    manifestations: new FormControl<string|null>(null),
    date_onset: new FormControl<string|null>(null),
    date_dies: new FormControl<string|null>(null),
    death_remarks: new FormControl<string|null>(null)
  })
}
