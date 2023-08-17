import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class dateHelper {
  dateFormat(date) {
    return formatDate(date, 'yyyy-MM-dd', 'en', 'Asia/Manila');
  }
}
