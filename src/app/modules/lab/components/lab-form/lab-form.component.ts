import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { faSave, faSpider, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss']
})
export class LabFormComponent implements OnChanges, OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_lab;
  @Input() patient_details;
  @Input() lab_statuses;
  @Input() lab_cxray_findings;
  @Input() lab_cxray_observation;
  @Input() lab_findings;
  @Input() lab_sputum_collection;
  @Input() lab_result_pn;
  faSave = faSave;
  faSpinner = faSpinner;

  is_saving: boolean = false;
  show_form: boolean = false;
  fields: any;

  lab_form: any = {};
  max_date = formatDate(new Date, 'yyyy-MM-dd', 'en');

  spl_val = ['observation_code', 'findings_code', 'data_collection_code'];

  loadForm(){
    // console.log(this.selected_lab)
    if(this.selected_lab) {
      this.http.get('libraries/laboratories/'+this.selected_lab.laboratory.code).subscribe({
        next: (data: any) => {
          // console.log(data.data)
          this.trimForm(data.data.category);
        },
        error: err => console.log(err)
      });
    }
  }

  trimForm(data){
    let birthdate:any = new Date(this.patient_details.birthdate);
    let request_date:any = new Date(this.selected_lab.request_date);
    let days = (request_date - birthdate) / (1000*60*60*24);
    let cat = days <= 28 ? 'NB' : this.patient_details.gender;

    let fields: any = [];
    Object.entries(data).forEach(([key, value], index) => {
      let vals: any = value;
      if(vals.range_cat) {
        if(cat === vals.range_cat) {
          fields.push(vals)
          this.lab_form[vals.field_name] = null
        }
      } else {
        fields.push(vals)
        this.lab_form[vals.field_name] = null
      }
    });

    this.fields = fields;

    if(this.selected_lab.result) {
      this.fillCodes(this.selected_lab)
    }

    this.show_form = true;
  }

  fillCodes(data){
    console.log(data)
    this.lab_form = this.selected_lab.result;
    switch (data.laboratory.code) {
      case 'CXRAY':
        this.lab_form['findings_code'] = this.lab_form.findings.code;
        this.lab_form['observation_code'] = this.lab_form.observation.code;
        break;
      case 'ECG':
        this.lab_form['findings_code'] = this.lab_form.findings.code;
        break;
      case 'SPTM':
        this.lab_form['findings_code'] = this.lab_form.findings.code;
        this.lab_form['data_collection_code'] = this.lab_form.data_collection.code;
        break;
      default:
        break;
    }
  }

  onSubmit(){
    console.log(this.selected_lab)
    this.is_saving = true;

    let url: string = this.http.getURL(this.selected_lab.laboratory.code);

    if(url || url !== null || url !== ''){
      let query;
      if(this.lab_form.request_id) {
        query = this.http.update(url+'/', this.lab_form.id, this.lab_form)
      } else {
        this.lab_form['patient_id'] = this.selected_lab.patient_id;
        this.lab_form['request_id'] = this.selected_lab.id;
        if(this.selected_lab.consult_id) this.lab_form['consult_id'] = this.selected_lab.consult_id;

        query = this.http.post(url, this.lab_form)
      }

      query.subscribe({
        next: (data: any) => {
          console.log(data);
          this.is_saving = false;
          this.toastr.success('Lab result was recorded!','Laboratory Result');
          this.closeModal();
        },
        error: err => console.log(err)
      })
    } else {
      this.is_saving = false;
      this.toastr.error('Laboratory does not exist','Lab form')
    }
  }

  closeModal(){
    this.toggleModal.emit('add');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.loadLibraries()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadForm()
  }

}
