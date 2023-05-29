import { FormControl, FormGroup } from "@angular/forms";

export function interviewForm() {
  return new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    patient_gbv_intake_id: new FormControl<string| null>(''),
    recant_flag: new FormControl<string| null>(''),
    recant_datetime: new FormControl<string| null>(''),
    recant_remarks: new FormControl<string| null>(''),
    interview_datetime: new FormControl<string| null>(''),
    deferred: new FormControl<boolean| null>(false),
    deferral_datetime: new FormControl<boolean| null>(false),
    deferral_reason_id : new FormControl<number| null>(null),
    deferral_previous_interviewer_id : new FormControl<number| null>(null),
    deferral_interviewer_remarks: new FormControl<string| null>(''),

    source_from_victim_flag: new FormControl<boolean| null>(false),
    source_from_historian_flag: new FormControl<boolean| null>(false),
    source_from_sworn_statement_flag: new FormControl<boolean| null>(false),
    mental_age_id: new FormControl<string| null>(''),

    incident_first_datetime: new FormControl<string| null>(''),
    incident_first_remarks : new FormControl<string| null>(''),
    incident_recent_datetime : new FormControl<string| null>(''),
    incident_recent_remarks: new FormControl<string| null>(''),

    abused_episode_id  : new FormControl<string| null>(''),
    abused_episode_count  : new FormControl<number| null>(null),
    abused_site_id : new FormControl<string| null>(''),
    abused_site_remarks : new FormControl<string| null>(''),
    disclosed_flag : new FormControl<boolean| null>(false),
    disclosed_type : new FormControl<string| null>(''),
    disclosed_relation_id : new FormControl<string| null>(''),
    initial_disclosure : new FormControl<string| null>(''),

    relation_to_child : new FormControl<string| null>(''),
    child_behavior_id : new FormControl<string| null>(''),
    child_caretaker_present_flag : new FormControl<boolean| null>(false),
    child_behavior_remarks : new FormControl<string| null>(''),
    dev_screening_id : new FormControl<string| null>(''),
    dev_screening_remarks : new FormControl<string| null>(''),
  });
}
