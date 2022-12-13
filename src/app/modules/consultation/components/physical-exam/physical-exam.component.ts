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

  faSave = faSave;
  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faSpinner = faSpinner;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  consult_notes: any;
  pe_grouped = [];
  physical_codes: any = [];
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
  }

  show_content: boolean =false;
  consult_done: boolean = false;
  is_saving: boolean = false;

  pe_item: any = [];
  toggleItems(item) {
    this.pe_item[item] = !this.pe_item[item];
  }

  onSubmit(){
    console.log(this.physical_remarks);
    console.log(this.physical_codes);
    this.is_saving = true;

    if(Object.keys(this.physical_codes).length > 0) {
      let pe_codes = [];
      Object.entries(this.physical_codes).forEach(([key, value], index) => {
        pe_codes.push(key);
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

    console.log(physical_exam);
    this.http.post('consultation/physical-exam', physical_exam).subscribe({
      next: (data: any) => {
        console.log(data);
        this.saveNotes();
      },
      error: err => console.log(err)
    })
  }

  saveNotes(){
    this.physical_remarks['notes_id'] = this.consult_notes.id;
    this.physical_remarks['patient_id'] = this.consult_details.patient.id;
    let query;
    if(this.physical_remarks.id === null){
      query = this.http.post('consultation/physical-exam-remarks', this.physical_remarks);
    } else {
      query = this.http.update('consultation/physical-exam-remarks/', this.physical_remarks.id, this.physical_remarks);
    }

    query.subscribe({
      next: (data: any) => {
        console.log(data);
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
          const group = (groups[item.category_id.toLowerCase()] || []);
          group.push(item);
          groups[item.category_id.toLowerCase()] = group;
          return groups;
        }, {});

        this.pe_grouped = groups;
        // console.log(this.pe_grouped);
      }
    );
  }

  loadSelected() {
    if(Object.keys(this.consult_notes.physical_exam).length > 0) {
      Object.entries(this.consult_notes.physical_exam).forEach(([key, value], index) => {
        let val: any = value;
        this.physical_codes[val.pe_id] = true;
      });
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
