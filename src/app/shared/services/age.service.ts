import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgeService {

  constructor() { }

  calcuateAge(birthday): any{
    let age_value: any;
    let birthdate = new Date(birthday);
    let timeDiff = Math.abs(Date.now() - birthdate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

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
