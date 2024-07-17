import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faChevronCircleUp, faChevronCircleDown, faSave, faSpinner, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-physical-exam',
  templateUrl: './physical-exam.component.html',
  styleUrls: ['./physical-exam.component.scss']
})
export class PhysicalExamComponent implements OnInit, OnChanges {
  @Input() toggle_content;
  @Input() consult_details;
  @Input() allowed_to_edit;

  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  consult_notes: any;
  pe_grouped:any = {};
  physical_codes: any = [];
  pe_item: any = [];

  physical_remarks = {
    id: null,
    abdomen_remarks: null,
    breast_remarks: null,
    chest_remarks: null,
    extremities_remarks: null,
    genitourinary_remarks: null,
    heart_remarks: null,
    heent_remarks: null,
    neuro_remarks: null,
    pelvic_remarks: null,
    rectal_remarks: null,
    skin_remarks: null,
    remarks: null
  }

  show_content: boolean =false;
  consult_done: boolean = false;
  is_saving: boolean = false;
  is_normal: boolean = false;

  toggleItems(item) {
    this.pe_item[item] = !this.pe_item[item];
  }

  toggleNormal() {
    this.is_normal = !this.is_normal;

    // console.log(this.pe_grouped)
    this.physical_codes = [];
    this.physical_codes = {
      'ABDOMEN12': this.is_normal,
      'CHEST06': this.is_normal,
      'GENITOURINARY01': this.is_normal,
      'HEART05': this.is_normal,
      'HEENT11': this.is_normal,
      'NEURO06': this.is_normal,
      'RECTAL01': this.is_normal,
      'SKIN15': this.is_normal,
    }
  }

  onSubmit(){
    this.is_saving = true;

    if(Object.keys(this.physical_codes).length > 0) {
      let pe_codes = [];
      Object.entries(this.physical_codes).forEach(([key, value], index) => {
        if(value === true) pe_codes.push(key);
      });
      this.saveCodes(pe_codes)
    } else {
      this.saveNotes();
    }
  }

  saveCodes(codes) {
    let physical_exam = {
      notes_id: this.consult_notes.id,
      physical_exam: codes
    }

    this.http.post('consultation/physical-exam', physical_exam).subscribe({
      next: (data: any) => {
        this.saveNotes();
      },
      error: err => console.log(err)
    })
  }

  saveNotes(){
    this.physical_remarks['notes_id'] = this.consult_notes.id;
    this.physical_remarks['patient_id'] = this.consult_details.patient.id;
    let query;
    // console.log(this.physical_remarks);
    if(this.physical_remarks.id === null){
      query = this.http.post('consultation/physical-exam-remarks', this.physical_remarks);
    } else {
      query = this.http.update('consultation/physical-exam-remarks/', this.physical_remarks.id, this.physical_remarks);
    }

    query.subscribe({
      next: (data: any) => {
        this.is_saving = false;
        this.showToastr();
      },
      error: err => console.log(err)
    })
  }

  showToastr(){
    this.toastr.success('Successfully updated!','Physical exam')
  }

  loadLibraries() {
    this.http.get('libraries/pe').subscribe(
      (data: any) => {
        const list = data.data;
        const groups = list.reduce((groups, item) => {
          let pe_enable: boolean = true;
          if((item.category_id === 'BARTHOLINS' || item.category_id === 'SPECULUM') && this.consult_details.patient.gender === 'M') pe_enable = false;

          if(pe_enable) {
            const group = (groups[item.category_id.toLowerCase()] || []);
            group.push(item);
            groups[item.category_id.toLowerCase()] = group;
          }
          return groups;
        }, {});

        this.pe_grouped = groups;

        /* if(this.consult_details.patient.gender === 'F') {
          const orderedGroups = {bartholins: {}, speculum: {}};

          for(const key in groups) {
            if(key !== 'bartholins' && key !== 'speculum') orderedGroups[key] = groups[key];
          }

          if('bartholins' in groups) orderedGroups.bartholins = groups['bartholins'];
          if('speculum' in groups) orderedGroups.speculum = groups['speculum'];

          this.pe_grouped = orderedGroups;
        } else {
          this.pe_grouped = groups;
        } */

      }
    );
  }

  loadSelected() {
    if(Object.keys(this.consult_notes.physical_exam).length > 0) {
      Object.entries(this.consult_notes.physical_exam).forEach(([key, value], index) => {
        let val: any = value;
        this.physical_codes[val.pe_id] = true;
      });

      this.checkIsNormal();
    }
  }

  checkIsNormal() {
    if(this.physical_codes.ABDOMEN12 && this.physical_codes.CHEST06 &&
      this.physical_codes.GENITOURINARY01 && this.physical_codes.HEART05 &&
      this.physical_codes.HEENT11 && this.physical_codes.NEURO06 &&
      this.physical_codes.RECTAL01 && this.physical_codes.SKIN15) {
        this.is_normal = true;
    } else {
      this.is_normal = false;
    }
  }
  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    if(this.consult_details) {
      this.consult_notes = this.consult_details.consult_notes;
      this.consult_done = this.consult_details.consult_done;
      this.loadSelected();

      if(this.consult_notes.physical_exam_remarks) {
        this.physical_remarks = this.consult_notes.physical_exam_remarks;
      }
    }
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
