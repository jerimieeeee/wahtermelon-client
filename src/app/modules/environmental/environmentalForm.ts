import { FormControl, FormGroup } from "@angular/forms";

export function eclaimsForm() {
  return new FormGroup({
    household_folder_id: new FormControl<string|null>(null),
    number_of_families: new FormControl<number|null>(null),
    registration_date: new FormControl<string|null>(null),
    effectivity_year: new FormControl<string|null>(null),
    water_type_code: new FormControl<string|null>(null),
    safety_managed_flag: new FormControl<boolean|null>(false),
    sanitation_managed_flag: new FormControl<boolean|null>(false),
    satisfaction_management_flag: new FormControl<boolean|null>(false),
    complete_sanitation_flag: new FormControl<boolean|null>(false),
    located_premises_flag: new FormControl<boolean|null>(false),
    availability_flag: new FormControl<boolean|null>(false),
    microbiological_result: new FormControl<string|null>(null),
    validation_date: new FormControl<string|null>(null),
    arsenic_result: new FormControl<string|null>(null),
    arsenic_date: new FormControl<string|null>(null),
    open_defecation_flag: new FormControl<boolean|null>(false),
    toilet_facility_code: new FormControl<string|null>(null),
    toilet_shared_flag: new FormControl<boolean|null>(false),
    sewage_code: new FormControl<string|null>(null),
    waste_management_code: new FormControl<string|null>(null),
    remarks: new FormControl<string|null>(null),
    end_sanitation_flag: new FormControl<boolean|null>(false),
  });
}
