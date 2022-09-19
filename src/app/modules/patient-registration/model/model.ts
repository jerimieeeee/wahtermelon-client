export interface Patient {
  facility_id?: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  suffix_name: string;
  birthdate: string;
  mothers_name: string;
  gender: string;
  mobile_number: string;
  pwd_status_code: string;
  indegenous_flag: string;
  blood_type_code: string;
  regligion_code: string;
  occupation_code: string;
  education_code: string;
  civil_status_code: string;
  conset_flag: boolean;
  image_url?: string;
}

export interface Family {
  region: string;
  province: string;
  municipality: string;
  brgy: string;
}
