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

  getLabelValue(data, report_data): Object {
    const startDate = new Date(data.value.start_date);
    const endDate = new Date(data.value.end_date);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    let labelValue = {
      labelType: null,
      labelDate: formatDate(data.value.start_date, 'MMM dd, yyyy', 'en', 'Asia/Manila')  + ' to ' + formatDate(data.value.end_date, 'MMM dd, yyyy', 'en', 'Asia/Manila'),
      labelYear: startYear === endYear ? startYear : startYear + ' to ' + endYear,
      labelPopulation: this.getPop(report_data, endYear)
    };

    if((startDate.getDate() === 1 && this.isLastDayOfMonth(endDate)) && (startYear === endYear)) {
      const startMonth = startDate.getMonth()+1;
      const endMonth = endDate.getMonth()+1;

      labelValue.labelYear = startYear;
      if((startMonth === endMonth)) {
        labelValue.labelType = 'M1';
        labelValue.labelDate = formatDate(startDate, 'MMMM', 'en', 'Asia/Manila');
      } else {
        const concatMonth: string = startMonth + '-' + endMonth;
        switch (concatMonth) {
          case '1-3':
            labelValue.labelType = 'Q1';
            labelValue.labelDate = '1st Quarter';
            break;
          case '4-6':
            labelValue.labelType = 'Q1';
            labelValue.labelDate = '2nd Quarter';
            break;
          case '7-9':
            labelValue.labelType = 'Q1';
            labelValue.labelDate = '3rd Quarter';
            break;
          case '10-12':
            labelValue.labelType = 'Q1';
            labelValue.labelDate = '4th Quarter';
            break;
          case '1-12':
            labelValue.labelType = 'A1';
            labelValue.labelDate = 'January to December';
            break;
          default:
            break;
        }
      }
    }

    return labelValue;
  }

  isLastDayOfMonth(date: Date): boolean {
    const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    return nextDay.getDate() === 1;
  }

  getPop(data, year) {
    if(data.projected_population[0]) {
      if(+data.projected_population[0].year === year) {
        return data.projected_population[0].total_population ?? '-';
      }
    }

    return '-';
  }
}
