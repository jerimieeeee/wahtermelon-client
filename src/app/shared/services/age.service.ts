import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgeService {

  constructor() { }

  calcuateAge(birthday, end_date?): any{
    let age_value: any;
    let birthdate = new Date(birthday);
    let date;
    if(end_date){
      date = new Date(end_date);
    } else {
      date = Date.now()
    }

    let timeDiff = Math.abs(date - birthdate.getTime());
    // let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    let age = Number(Math.round(parseFloat(((timeDiff / (1000 * 3600 * 24))/365.25) + 'e' + 2)) + 'e-' + 2)
    if(age < 1){
      let age = Math.floor((timeDiff / (1000 * 3600 * 24))/30);
      if(age < 1){
        let age = Math.floor(timeDiff / (1000 * 3600 * 24));
        age_value={age: age, type: 'day'};
      }else{
        age_value={age: age, type: 'month'};
      }
    } else {
      age_value={age: age, type: 'year'};
    }

    return age_value;
  }
}
