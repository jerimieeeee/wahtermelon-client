import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import { HttpService } from 'app/shared/services/http.service';
import { EventColor } from 'calendar-utils';
import { isSameDay, isSameMonth } from 'date-fns';
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-calendar-appointment',
  templateUrl: './calendar-appointment.component.html',
  styleUrls: ['./calendar-appointment.component.scss']
})
export class CalendarAppointmentComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faCircleNotch = faCircleNotch;

  selected_month: any;
  selected_year: any;

  calendar_loading: boolean = false;
  activeDayIsOpen: boolean = false;

  events: CalendarEvent[] = [];

  handleEvent(action: string, event: CalendarEvent): void {
    let result: any = event;
    // console.log(result)
    if(result.data){
      this.name_list = result.data ? result.data : result.day.events[0].data;
      this.modal['name-list'] = !this.modal['name-list'];
    } else if(result.day.events.length > 0) {
      this.name_list = result.day.events[0].data;
      this.modal['name-list'] = !this.modal['name-list'];
    }
  }

  toggleModal() {
    this.modal['name-list'] = !this.modal['name-list'];
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  name_list: any = [];
  modal: any = [];

  loadSchedules(){
    this.activeDayIsOpen = false;
    this.calendar_loading = true;
    this.selected_month = formatDate(this.viewDate, 'MM', 'en-us');
    this.selected_year = formatDate(this.viewDate, 'yyyy', 'en-us');

    let params = {
      month: this.selected_month,
      year: this.selected_year,
      disable_filter: 1,
      per_page: 'all',
      facility_code: this.facility_code,
      referral_facility_code: this.facility_code,
      filter_type: 'calendar'
    };

    this.http.get('appointment/schedule', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        let list_of_sched:any[] = [];

        Object.entries(data[0]).forEach(
        ([key, value]) => {
          let val: any = value;
          let sch: any = {
            start: new Date(key),
            title: val.length,
            color: colors.yellow,
            data: val
          }
          list_of_sched.push(sch)
        });

        this.calendar_loading = false;
        this.events = list_of_sched;
      }
    })
  }

  constructor (
    private http: HttpService
  ) { }

  facility_code: string;
  ngOnInit(): void {
    this.facility_code = this.http.getUserFacility()
    console.log(this.facility_code);
    this.loadSchedules();
  }
}
