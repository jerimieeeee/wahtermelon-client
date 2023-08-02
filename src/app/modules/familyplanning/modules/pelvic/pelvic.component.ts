import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faCaretLeft, faCaretRight, faCircleCheck, faInfoCircle, faPencil, faPlus, faSave, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-pelvic',
  templateUrl: './pelvic.component.html',
  styleUrls: ['./pelvic.component.scss']
})
export class PelvicComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;
  focused: boolean;
  flippable: boolean;
  saved: boolean;
  fppelvic_typing: boolean;

  hx: any = [];
  pe_grouped = [];

  is_saving: boolean = false;

  category = [
    {"name" : "Adnexa"},
    {"name" : "Cervix"},
    {"name" : "Color"},
    {"name" : "Consistency"},
    {"name" : "Perinium"},
    {"name" : "Uterus Position"},
    {"name" : "Uterus Size"},
    {"name" : "Vagina"},
  ];


  loadLibraries() {
    this.http.get('libraries/family-planning-pelvic-exam').subscribe(
      (data: any) => {
        // console.log(data.data)
        const list = data.data;

        console.log(list)
        const groups = list.reduce((groups, item) => {
          const group = (groups[item.category.toLowerCase()] || []);
          group.push(item);
          groups[item.category.toLowerCase()] = group;
          return groups;
        }, {});

        this.pe_grouped = groups;
        console.log(this.pe_grouped, 'grouped')
      }
    );
  }

  constructor(
    private http: HttpService,
    // private formBuilder: FormBuilder,
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }

}