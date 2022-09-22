import { FormControl, FormGroup } from "@angular/forms";

export interface Patient {
  facility_id?: FormControl<string>;
  last_name: FormControl<string>;
  first_name: FormControl<string>;
  middle_name?: FormControl<string>;
  suffix_name: FormControl<string>;
  birthdate: FormControl<string>;
  mothers_name: FormControl<string>;
  gender: FormControl<string>;
  mobile_number: FormControl<string>;
  pwd_type_code: FormControl<string>;
  indegenous_flag: FormControl<boolean>;
  blood_type_code: FormControl<string>;
  religion_code: FormControl<string>;
  occupation_code: FormControl<string>;
  education_code: FormControl<string>;
  civil_status_code: FormControl<string>;
  consent_flag: FormControl<boolean>;
  image_url?: FormControl<string>;
  family?: {
    region: FormControl<string>;
    province: FormControl<string>;
    municipality: FormControl<string>;
    brgy: FormControl<string>;
  }
}

export interface Family {
  region: FormControl<string>;
  province: FormControl<string>;
  municipality: FormControl<string>;
  brgy: FormControl<string>;
}
