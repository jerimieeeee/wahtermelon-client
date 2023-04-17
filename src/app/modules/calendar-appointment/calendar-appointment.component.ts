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

  events: CalendarEvent[] = [
    /* {
      title: 'Editable event',
      color: colors.yellow,
      start: new Date(),
      actions: [
        {
          label: 'test',
          onClick: (): void => {
            console.log('Edit event');
          },
        },
      ],
    },
    {
      title: 'Deletable event',
      color: colors.blue,
      start: new Date(),
      actions: [
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log('Event deleted', event);
          },
        },
      ],
    },
    {
      title: 'Non editable and deletable event',
      color: colors.red,
      start: new Date(),
    }, */
  ];

  handleEvent(action: string, event: CalendarEvent): void {
    let result: any = event;
    console.log(result);
    /* this.list_event = result.data;
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' }); */
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

  loadSchedules(){
    this.activeDayIsOpen = false;
    this.calendar_loading = true;
    this.selected_month = formatDate(this.viewDate, 'MM', 'en-us');
    this.selected_year = formatDate(this.viewDate, 'yyyy', 'en-us');

    let params = {
      month: this.selected_month,
      year: this.selected_year,
      per_page: 'all'
    };
    console.log(this.selected_month, this.selected_year);

    this.http.get('appointment/schedule', {params}).subscribe({
      next: (data: any) => {
        console.log(data);
        let list_of_sched:any[] = [];

        Object.entries(data.data).forEach(
        ([key, value]) => {
          console.log(key, value);
          Object.entries(value).forEach(
          ([key_facility, value_facility]) => {
            console.log(value_facility);
            let count_facility: any = value_facility;
            let sch: any = {
              start: new Date(key),
              title: count_facility.length+' - '+key_facility,
              color: colors.yellow,
              data: count_facility
            }
            list_of_sched.push(sch)
          });
        });

        this.calendar_loading = false;
        this.events = list_of_sched;
      }
    })
  }

  constructor (
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.loadSchedules();
  }
}
