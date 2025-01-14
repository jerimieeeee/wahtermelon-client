import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { dateHelper } from './date-helper.service';

@Injectable({
  providedIn: 'root'
})
export class VitalsChartsService {

  constructor(
    private dateHelper: dateHelper
  ) { }

  getLatestToday(details, date?){
    let latest_vitals = details[0];

    Object.entries(details).reverse().forEach(([keys, values], indexes) => {
      let val:any = values;

      if(!latest_vitals.patient_height && val.patient_height) latest_vitals.patient_height = val.patient_height;
      if(!latest_vitals.patient_weight && val.patient_weight) latest_vitals.patient_weight = val.patient_weight;

      if(!latest_vitals.patient_right_vision_acuity && val.patient_right_vision_acuity) latest_vitals.patient_right_vision_acuity = val.patient_right_vision_acuity;
      if(!latest_vitals.patient_left_vision_acuity && val.patient_left_vision_acuity) latest_vitals.patient_left_vision_acuity = val.patient_left_vision_acuity;

      let vitals_date = this.dateHelper.dateFormat(val.vitals_date);// formatDate(val.vitals_date, 'yyyy-MM-dd','en', 'Asia/Manila')
      let date_today;
      if(date) {
        date_today = formatDate(date, 'yyyy-MM-dd','en', 'Asia/Manila')
      } else {
        date_today = formatDate(new Date(), 'yyyy-MM-dd','en', 'Asia/Manila')
      }

      // console.log(vitals_date, date_today)
      if(vitals_date === date_today){

        if(val.bp_systolic){
          latest_vitals.bp_systolic = val.bp_systolic;
          latest_vitals.bp_diastolic = val.bp_diastolic;

          latest_vitals.bp_color = this.getChartColor(latest_vitals);
        }

        if(val.patient_spo2 !== null) latest_vitals.patient_spo2 = val.patient_spo2;
        if(val.patient_temp) latest_vitals.patient_temp = val.patient_temp;
        if(val.patient_heart_rate) latest_vitals.patient_heart_rate = val.patient_heart_rate;
        if(val.patient_respiratory_rate) latest_vitals.patient_respiratory_rate = val.patient_respiratory_rate;
        if(val.patient_pulse_rate) latest_vitals.patient_pulse_rate = val.patient_pulse_rate;

        if(val.patient_head_circumference) latest_vitals.patient_head_circumference = val.patient_head_circumference;
        if(val.patient_muac) latest_vitals.patient_muac = val.patient_muac;
        if(val.patient_chest) latest_vitals.patient_chest = val.patient_chest;
        if(val.patient_abdomen) latest_vitals.patient_abdomen = val.patient_abdomen;
        if(val.patient_waist) latest_vitals.patient_waist = val.patient_waist;``
        if(val.patient_hip) latest_vitals.patient_hip = val.patient_hip;
        if(val.patient_limbs) latest_vitals.patient_limbs = val.patient_limbs;
        if(val.patient_skinfold_thickness) latest_vitals.patient_skinfold_thickness = val.patient_skinfold_thickness;
      } else {
        if(val.bp_systolic) latest_vitals.bp_color = this.getChartColor(latest_vitals);
      }
    });

    if(latest_vitals) {
      latest_vitals.oxygen_color = this.getBloodOxygenColor(latest_vitals);
      latest_vitals.temp_color = this.getTempColor(latest_vitals);
    }
    return latest_vitals;
  }

  getChartColor(details): string {
    if(details.bp_systolic) {
      if((details.bp_systolic >= 140) || (details.bp_diastolic >= 90)) {
        return 'text-red-500 font-semibold'
      };

      if((details.bp_systolic >= 121 && details.bp_systolic <= 139) ||
        (details.bp_diastolic >= 81 && details.bp_diastolic <= 89)) {
        return 'text-yellow-500 font-semibold'
      };

      if((details.bp_systolic >= 90 && details.bp_systolic <= 120) ||
        (details.bp_diastolic >= 60 && details.bp_diastolic <= 80)) {
          return 'text-green-500 font-semibold';
      }
    } else {
      return 'text-gray-800';
    }
  }

  getBloodOxygenColor(details): string {
    if(details.patient_spo2) {
      if(details.patient_spo2 >= 95 && details.patient_spo2 <= 100) return 'text-green-500 font-semibold';
      if(details.patient_spo2 >= 90 && details.patient_spo2 <= 94) return 'text-yellow-500 font-semibold';
      if(details.patient_spo2 < 90) return 'text-red-500 font-semibold';
    } else {
      return 'text-gray-800';
    }
  }

  getTempColor(details): string {
    if(details.patient_temp) {
      if(details.patient_temp > 37.5) return 'text-red-500 font-semibold';
    } else {
      return 'text-gray-800';
    }
  }
}
