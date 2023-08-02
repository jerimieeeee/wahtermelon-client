import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faCaretLeft, faCaretRight, faCircleCheck, faInfoCircle, faPencil, faPlus, faSave, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';


@Component({
  selector: 'app-fphx',
  templateUrl: './fphx.component.html',
  styleUrls: ['./fphx.component.scss']
})
export class FphxComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;

  hx: any = [];
  pe_answers: any = [];
  hx_grouped = [];

  is_saving: boolean = false;

  category = [
    {"name" : "Abdomen"},
    {"name" : "History of any of the following"},
    {"name" : "Chest/Heart"},
    {"name" : "Extremities"},
    {"name" : "Genital"},
    {"name" : "HEENT"},
    {"name" : "Skin"},
  ];

  loadLibraries() {
    this.http.get('libraries/family-planning-history').subscribe(
      (data: any) => {
        // console.log(data.data)
        const list = data.data;

        console.log(list, 'history list')
        const groups = list.reduce((groups, item) => {
          const group = (groups[item.category.toLowerCase()] || []);
          group.push(item);
          groups[item.category.toLowerCase()] = group;
          return groups;
        }, {});

        this.hx_grouped = groups;
    
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
