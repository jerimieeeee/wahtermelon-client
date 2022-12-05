import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VitalsChartsService {

  constructor() { }

  getLatestToday(details){
    // console.log(details)
    let latest_vitals = details[0];

    Object.entries(details).every(([keys, values], indexes) => {
      let val:any = values;

      if(!latest_vitals.patient_height && val.patient_height) latest_vitals.patient_height = val.patient_height;
      if(!latest_vitals.patient_weight && val.patient_weight) latest_vitals.patient_weight = val.patient_weight;

      let vitals_date = formatDate(val.vitals_date, 'yyyy-MM-dd','en', 'en')
      let date_today = formatDate(new Date(), 'yyyy-MM-dd','en', 'en')
      // console.log(vitals_date, date_today)
      if(vitals_date === date_today){
        if(!latest_vitals.bp_systolic && val.bp_systolic){
          latest_vitals.bp_systolic = val.bp_systolic;
          latest_vitals.bp_diastolic = val.bp_diastolic;
        }

        if(!latest_vitals.patient_spo2 && val.patient_spo2) latest_vitals.patient_spo2 = val.patient_spo2;
        if(!latest_vitals.patient_temp && val.patient_temp) latest_vitals.patient_temp = val.patient_temp;
        if(!latest_vitals.patient_heart_rate && val.patient_heart_rate) latest_vitals.patient_heart_rate = val.patient_heart_rate;
        if(!latest_vitals.patient_respiratory_rate && val.patient_respiratory_rate) latest_vitals.patient_respiratory_rate = val.patient_respiratory_rate;
        if(!latest_vitals.patient_pulse_rate && val.patient_pulse_rate) latest_vitals.patient_pulse_rate = val.patient_pulse_rate;

        if(!latest_vitals.patient_head_circumference && val.patient_head_circumference) latest_vitals.patient_head_circumference = val.patient_head_circumference;
        if(!latest_vitals.patient_muac && val.patient_muac) latest_vitals.patient_muac = val.patient_muac;
        if(!latest_vitals.patient_chest && val.patient_chest) latest_vitals.patient_chest = val.patient_chest;
        if(!latest_vitals.patient_abdomen && val.patient_abdomen) latest_vitals.patient_abdomen = val.patient_abdomen;
        if(!latest_vitals.patient_waist && val.patient_waist) latest_vitals.patient_waist = val.patient_waist;
        if(!latest_vitals.patient_hip && val.patient_hip) latest_vitals.patient_hip = val.patient_hip;
        if(!latest_vitals.patient_limbs && val.patient_limbs) latest_vitals.patient_limbs = val.patient_limbs;
        if(!latest_vitals.patient_skinfold_thickness && val.patient_skinfold_thickness) latest_vitals.patient_skinfold_thickness = val.patient_skinfold_thickness;
      }

      if(latest_vitals.patient_height > 0 && latest_vitals.patient_weight > 0 &&
        latest_vitals.bp_systolic > 0 && latest_vitals.patient_heart_rate > 0 &&
        latest_vitals.patient_respiratory_rate > 0 && latest_vitals.patient_pulse_rate > 0 &&
        latest_vitals.patient_waist > 0){
        return false;
      }
      return true;
    });

    return latest_vitals;
  }
}
