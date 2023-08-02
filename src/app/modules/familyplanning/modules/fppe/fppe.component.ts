import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faCaretLeft, faCaretRight, faCircleCheck, faInfoCircle, faPencil, faPlus, faSave, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';



@Component({
  selector: 'app-fppe',
  templateUrl: './fppe.component.html',
  styleUrls: ['./fppe.component.scss']
})

export class FppeComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faPlus = faPlus;
  faSave = faSave;
  faTimes = faTimes;
  faPencil = faPencil;
  faCircleCheck = faCircleCheck;
  faCaretRight = faCaretRight;
  faInfoCircle = faInfoCircle;
  faSpinner = faSpinner;

  pes: any = [];
  pe_answers: any = [];
  pe_grouped = [];

  is_saving: boolean = false;

  abdomen_pes: any = [];
  breast_pes: any = [];
  conjunctiva_pes: any = [];
  extremities_pes: any = [];
  neck_pes: any = [];
  thorax_pes: any = [];

  category = [
    {"name" : "Conjunctiva"},
    {"name" : "Neck"},
    {"name" : "Breast"},
    {"name" : "Thorax"},
    {"name" : "Abdomen"},
    {"name" : "Extremities"}
  ];

  loadLibraries() {
    this.http.get('libraries/family-planning-physical-exam').subscribe(
      (data: any) => {
        // console.log(data.data)
        const list = data.data;

        const groups = list.reduce((groups, item) => {
          const group = (groups[item.category_id.toLowerCase()] || []);
          group.push(item);
          groups[item.category_id.toLowerCase()] = group;
          return groups;
        }, {});

        this.pe_grouped = groups;
        console.log(this.pe_grouped, 'grouped')
      }
    );
  }


  // loadLibraries(){
  //   this.http.get('libraries/family-planning-physical-exam').subscribe({
  //     next: (data: any) => {
        
  //       this.pes = data.data;

        
  //       this.abdomen_pes = this.pes.filter(t=>t.category_id ==='ABDOMEN');
  //       this.breast_pes = this.pes.filter(t=>t.category_id ==='BREAST');
  //       this.conjunctiva_pes = this.pes.filter(t=>t.category_id ==='CONJUNCTIVA');
  //       this.extremities_pes = this.pes.filter(t=>t.category_id ==='EXTREMITIES');
  //       this.neck_pes = this.pes.filter(t=>t.category_id ==='NECK');
  //       this.thorax_pes = this.pes.filter(t=>t.category_id ==='THORAX');

  //       console.log(this.pes, 'pes')
  //       console.log(this.abdomen_pes, 'pes abdomen')
        
  //     },
  //     error: err => console.log(err)
  //   });
  // }

  constructor(
    private http: HttpService,
    // private formBuilder: FormBuilder,
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }

}


