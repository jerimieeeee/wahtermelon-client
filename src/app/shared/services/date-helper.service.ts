import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class dateHelper {
  dateFormat(date) {
    try {
      return formatDate(date, 'yyyy-MM-dd', 'en', 'Asia/Manila');
    } catch (error) {
      return 'Date is not valid'
    }
  }

  timeFormatAmPm(date) {
    try {
      return formatDate(date, 'hh:mma', 'en', 'Asia/Manila');
    } catch (error) {
      return 'Date is not valid'
    }
  }

  timeFormat(date) {
    try {
      return formatDate(date, 'HH:mm:ss', 'en', 'Asia/Manila');
    } catch (error) {
      return 'Date is not valid'
    }
  }
}
