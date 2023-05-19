import { FormControl, FormGroup } from "@angular/forms";

export function perpetratorForm() {
  return new FormGroup({
    id: new FormControl<string| null>(null),
    patient_id: new FormControl<string| null>(null),
    intake_id: new FormControl<string| null>(null),
    gender: new FormControl<string| null>(null),
    perpetrator_unknown_flag: new FormControl<boolean| null>(null),
    perpetrator_name: new FormControl<string| null>(null),
    perpetrator_nickname: new FormControl<string| null>(null),
    perpetrator_age: new FormControl<number| null>(null),
    occupation_code : new FormControl<string| null>(null),
    known_to_child_flag: new FormControl<boolean| null>(null),
    relation_to_child_id: new FormControl<string| null>(null),
    location_id: new FormControl<string| null>(null),
    perpetrator_address: new FormControl<string| null>(null),
    // unknown_abused_flag: new FormControl<boolean| null>(null),
    abuse_alcohol_flag: new FormControl<boolean| null>(null),
    abuse_drugs_flag: new FormControl<boolean| null>(null),
    abuse_others_flag: new FormControl<boolean| null>(null),
    abuse_drugs_remarks: new FormControl<string| null>(null),
    abuse_others_remarks: new FormControl<string| null>(null),

    abused_as_child_flag: new FormControl<boolean| null>(null),
    abused_as_spouse_flag: new FormControl<boolean| null>(null),
    spouse_abuser_flag: new FormControl<boolean| null>(null),
    family_violence_flag: new FormControl<boolean| null>(null),
    criminal_conviction_similar_flag: new FormControl<boolean| null>(null),
    criminal_conviction_other_flag: new FormControl<boolean| null>(null),
    criminal_record_unknown_flag: new FormControl<boolean| null>(null),
    criminal_barangay_flag: new FormControl<boolean| null>(null),
    criminal_barangay_remarks: new FormControl<string| null>(null),
  });
}
