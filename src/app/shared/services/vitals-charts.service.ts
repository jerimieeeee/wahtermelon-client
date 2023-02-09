import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VitalsChartsService {

  constructor() { }

  getLatestToday(details, date?){
    // console.log(details)
    let latest_vitals = details[0];

    Object.entries(details).reverse().forEach(([keys, values], indexes) => {
      let val:any = values;

      if(!latest_vitals.patient_height && val.patient_height) latest_vitals.patient_height = val.patient_height;
      if(!latest_vitals.patient_weight && val.patient_weight) latest_vitals.patient_weight = val.patient_weight;

      let vitals_date = formatDate(val.vitals_date, 'yyyy-MM-dd','en', 'en')
      let date_today;
      if(date) {
        date_today = formatDate(date, 'yyyy-MM-dd','en', 'en')
      } else {
        date_today = formatDate(new Date(), 'yyyy-MM-dd','en', 'en')
      }

      // console.log(vitals_date, date_today)
      if(vitals_date === date_today){

        if(val.bp_systolic){
          latest_vitals.bp_systolic = val.bp_systolic;
          latest_vitals.bp_diastolic = val.bp_diastolic;
        }

        if(val.patient_spo2) latest_vitals.patient_spo2 = val.patient_spo2;
        if(val.patient_temp) latest_vitals.patient_temp = val.patient_temp;
        if(val.patient_heart_rate) latest_vitals.patient_heart_rate = val.patient_heart_rate;
        if(val.patient_respiratory_rate) latest_vitals.patient_respiratory_rate = val.patient_respiratory_rate;
        if(val.patient_pulse_rate) latest_vitals.patient_pulse_rate = val.patient_pulse_rate;

        if(val.patient_head_circumference) latest_vitals.patient_head_circumference = val.patient_head_circumference;
        if(val.patient_muac) latest_vitals.patient_muac = val.patient_muac;
        if(val.patient_chest) latest_vitals.patient_chest = val.patient_chest;
        if(val.patient_abdomen) latest_vitals.patient_abdomen = val.patient_abdomen;
        if(val.patient_waist) latest_vitals.patient_waist = val.patient_waist;
        if(val.patient_hip) latest_vitals.patient_hip = val.patient_hip;
        if(val.patient_limbs) latest_vitals.patient_limbs = val.patient_limbs;
        if(val.patient_skinfold_thickness) latest_vitals.patient_skinfold_thickness = val.patient_skinfold_thickness;
      }
    });

    return latest_vitals;
  }
}
