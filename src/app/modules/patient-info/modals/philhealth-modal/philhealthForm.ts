import { FormControl, FormGroup } from "@angular/forms";

export function philhealthForm() {
  return new FormGroup({
    philhealth_id: new FormControl<string| null>(''),
    facility_code: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    user_id: new FormControl<string| null>(''),
    enlistment_date: new FormControl<string| null>(''),
    effectivity_year: new FormControl<string| null>(''),
    enlistment_status_id: new FormControl<string| null>(''),
    package_type_id: new FormControl<string| null>(''),
    membership_type_id: new FormControl<string| null>(''),
    membership_category_id: new FormControl<string| null>(''),
    member_pin: new FormControl<string| null>(''),
    member_last_name: new FormControl<string| null>(''),
    member_first_name: new FormControl<string| null>(''),
    member_middle_name: new FormControl<string| null>(''),
    member_suffix_name: new FormControl<string| null>(''),
    member_birthdate: new FormControl<string| null>(''),
    member_gender: new FormControl<string| null>(''),
    member_relation_id: new FormControl<string| null>(''),
    employer_pin: new FormControl<string| null>(''),
    employer_name: new FormControl<string| null>(''),
    employer_address: new FormControl<string| null>(''),
    member_pin_confirmation: new FormControl<string| null>(''),
    philhealth_id_confirmation: new FormControl<string| null>(''),
    authorization_transaction_code: new FormControl<string| null>(''),
    walkedin_status: new FormControl<boolean| null>(null)
  });
}
