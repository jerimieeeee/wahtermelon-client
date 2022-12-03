import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
// import { AnyNaptrRecord } from 'd/ns';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faCircleCheck, faClose, faInfoCircle, faPencilSquare, faPenToSquare, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  focused: boolean;

  services_form: FormGroup = new FormGroup({
    service_date: new FormControl<string | null>(''),
    service_qty: new FormControl<string | null>(''),
    intake_penicillin: new FormControl<string | null>(''),
    positive_result: new FormControl<string | null>(''),
  });

  @Input() lib_services;
  @Input() visit_type;
  @Input() patient_details;
  @Input() patient_mc_record;
  @Input() module;
  @Output() modalStats = new EventEmitter<boolean>();

  today: Date;
  // modal = false;
  modal: boolean;
  saved: boolean;

  constructor(private http: HttpService, private formBuilder: FormBuilder) { }

  faTimes = faTimes;
  faSave = faSave;
  faInfoCircle = faInfoCircle;
  faPenToSquare = faPenToSquare;
  faTimesCircle = faTimesCircle
  faCircleCheck = faCircleCheck
  user_id: any
  facility_code: any

  public serviceChanges = [];
  public service_array = [];
  public service_list = [];
  public array_form = [];
  public group_list = [
    { name: 'G1', qty: true, pos: false, pos_name: '', pen: false, service: []  },
    { name: 'G2', qty: false, pos: false, pos_name: '', pen: false, service: [] },
    { name: 'G3', qty: false, pos: true, pos_name: 'Positive', pen: true, service: []  },
    { name: 'G4', qty: false, pos: true, pos_name: 'Positive', pen: false, service: []  },
    { name: 'G5', qty: false, pos: true, pos_name: 'Anemia', pen: false, service: []  },
  ];

  ngOnInit() {
    this.user_id = this.http.getUserID();
    this.facility_code = this.http.getUserFacility();
    this.createForm()
    for(let x = 0 ; x < 11 ; x++){
      this.serviceChanges.push(this.services_form.value);
    }
    this.getServices()
    this.tagServiceGroup()

    this.today = new Date();
    this.modal = false;
  }
  saveForm() {
    // maternal-care/mc-services
    console.log(this.serviceChanges);

    this.serviceChanges.forEach(s => {
      // console.log(s.service_id != "");

      if (s.service_id != "") {
        console.log(this.serviceChanges.map(z => z.service_id).indexOf(s.service_id), " logging index of with id")
        console.log("commiting to save ", s);

        this.http.post('maternal-care/mc-services', s).subscribe({
          next: (data: any) => {
            console.log(data.data, " data from saving services")
            this.getServices();
            // this.service_list.push(data.data)
            // this.services_form = data.data;
          },
          error: err => console.log(err),
          complete: () => {
            // this.is_saving = false;
            this.saved = true
            setTimeout(() => {
              this.saved = false;
              this.closeModal();
            }, 1500);
          }
        })

      }
    })
    this.createForm();
  }
  getServices() {
    this.http.get('maternal-care/mc-services?filter[patient_mc_id]=' + this.patient_mc_record.id).subscribe({
      next: (data: any) => {
        console.log(data, " get services");
        this.service_list = data.data;
        this.service_list.forEach(s => {
          if (s.service.id == 'DENT' || s.service.id == 'HIV') {
            s.group = this.group_list[1]
          } else if (s.service.id == 'IRON' || s.service.id == 'VITA' || s.service.id == 'CALC' || s.service.id == 'IODN' || s.service.id == 'DWRMG') {
            s.group = this.group_list[0]
          } else if (s.service.id == 'SYP') {
            s.group = this.group_list[2]
          } else if (s.service.id == 'HEPB' || s.service.id == 'DIBTS') {
            s.group = this.group_list[3]
          } else if (s.service.id == 'CBC') {
            s.group = this.group_list[4]
          }
        })

        console.log(this.service_list, " get service after pushing group");
        

      },
      error: err => console.log(err),

    })
  }

  tagServiceGroup() {
    this.lib_services.forEach(s => {
      if (s.id == 'DENT' || s.id == 'HIV') {
        this.group_list[1].service.push(s)
      } else if (s.id == 'IRON' || s.id == 'VITA' || s.id == 'CALC' || s.id == 'IODN' || s.id == 'DWRMG') {
        this.group_list[0].service.push(s)
      } else if (s.id == 'SYP') {
        this.group_list[2].service.push(s)
      } else if (s.id == 'HEPB' || s.id == 'DIBTS') {
        this.group_list[3].service.push(s)
      } else if (s.id == 'CBC') {
        this.group_list[4].service.push(s)
      }
    })

    console.log(this.group_list, ' after tagging groups');

  }

  createForm() {
   
    this.lib_services.forEach(lib =>  this.array_form.push(
      {
        service_date: new Date().toISOString().substring(0, 10),
        visit_type_code: '',
        visit_status: this.module == 3 ? 'Prenatal' : (this.module == 4 ? 'Postpartum' : 'Services'),
        service_qty:'',
        positive_result: false,
        intake_penicillin: false,
        service_id: lib.id,
      }
    )
      );
    this.services_form = this.formBuilder.group({
      service_date: [new Date().toISOString().substring(0, 10), [Validators.required]],
      visit_type_code: ['', [Validators.required]],
      visit_status: [this.module == 3 ? 'Prenatal' : (this.module == 4 ? 'Postpartum' : 'Services')],
      service_qty:[0],
      positive_result: [false],
      intake_penicillin: [false],
      service_id: [''],
    });
    


  }
  getNG(id, x){
    return this.serviceChanges[this.array_form.map(s => s.service_id).indexOf(id)][x];
  }
  // getGroupList(){
  //   return this.group_list
  // }
  onChange(desc, id, item) {
    let i = this.array_form.map(s => s.service_id).indexOf(id);
    this.serviceChanges[i] = {
      patient_mc_id: this.patient_mc_record.id,
      facility_code: this.facility_code,
      patient_id: this.patient_details.id,
      user_id: this.user_id,
      visit_type_code: item == 'visit_type_code' ? this.services_form.value[item] : this.serviceChanges[i].visit_type_code,
      visit_status: this.services_form.value.visit_status,
      intake_penicillin: item == 'intake_penicillin' ? this.services_form.value[item] : this.serviceChanges[i].intake_penicillin,
      positive_result: item == 'positive_result' ? this.services_form.value[item] : this.serviceChanges[i].positive_result,
      service_date: item == 'service_date' ? this.services_form.value[item] : this.serviceChanges[i].service_date,
      service_qty: item == 'service_qty' ? this.services_form.value[item] : this.serviceChanges[i].service_qty,
      service_id: id,
    };

    console.log(this.serviceChanges, " these are the changes with the description: ", desc);

  }
  openModal() {
    console.log("opening modal");
    this.modal = !this.modal;
    this.modalStats.emit(this.modal);
    this.createForm()
  }

  closeModal() {
    console.log("opening modal");
    this.modal = false;
    this.modalStats.emit(this.modal);
  }
}
