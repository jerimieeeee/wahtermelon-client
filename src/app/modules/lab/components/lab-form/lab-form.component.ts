import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { NameHelperService } from 'app/shared/services/name-helper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss']
})
export class LabFormComponent implements OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() cancelModal = new EventEmitter<any>();
  @Input() selected_lab;
  @Input() patient_details;
  @Input() lab_statuses;
  @Input() lab_cxray_findings;
  @Input() lab_cxray_observation;
  @Input() lab_findings;
  @Input() lab_sputum_collection;
  @Input() lab_result_pn;
  @Input() lab_stool_blood;
  @Input() lab_stool_color;
  @Input() lab_stool_consistency;
  @Input() user_facility;
  @Input() for_history;
  @Input() lab_biopsy_type;
  @Input() lab_ultrasound_type;
  @Input() lab_syphilis_method;
  @Input() blood_types;
  @Input() lab_malaria_parasite;
  @Input() lab_gene_mtb;
  @Input() lab_gene_rif;

  faSave = faSave;
  faSpinner = faSpinner;

  is_saving: boolean = false;
  show_form: boolean = false;
  fields: any;
  request_status_code: boolean;

  lab_form: any = {};
  max_date = formatDate(new Date, 'yyyy-MM-dd', 'en', 'Asia/Manila');

  spl_val = ['mtb_code', 'rif_code', 'parasite_type_code', 'observation_code', 'findings_code', 'data_collection_code', 'blood_code', 'color_code', 'consistency_code', 'type', 'method_code', 'blood_type_code'];

  submit_errors: any;

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
    // console.log(data);
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

    this.request_status_code = this.selected_lab.request_status_code === 'RF' ? true : false;
    if(this.selected_lab.lab_result) {
      this.fillCodes(this.selected_lab)
    }

    this.show_form = true;
  }

  fillCodes(data){
    // console.log(this.selected_lab)
    // console.log(this.request_status_code)

    this.lab_form = this.selected_lab.lab_result;
    switch (data.laboratory.code) {
      case 'CXRAY':
        this.lab_form['findings_code'] = this.lab_form.findings_code;
        this.lab_form['observation_code'] = this.lab_form.observation_code;
        break;
      case 'ECG':
        this.lab_form['findings_code'] = this.lab_form.findings_code;
        break;
      case 'SPTM':
        this.lab_form['findings_code'] = this.lab_form.findings_code;
        this.lab_form['data_collection_code'] = this.lab_form.data_collection_code;
        break;
      case 'FOBT':
        this.lab_form['findings_code'] = this.lab_form.findings_code;
        break;
      case 'PPD':
        this.lab_form['findings_code'] = this.lab_form.findings_code;
        break;
      case 'FCAL':
        this.lab_form['blood_code'] = this.lab_form.blood_code;
        this.lab_form['color_code'] = this.lab_form.color_code;
        this.lab_form['consistency_code'] = this.lab_form.consistency_code;
        break;
      default:
        break;
    }
  }

  form_with_findings_pn = ['FOBT', 'PPD', 'SYPH']
  form_with_finding_code = ['ECG'];
  onSubmit(){
    // console.log(this.lab_form)
    this.is_saving = true;

    if(!this.request_status_code) {
      let url: string = this.nameHelper.getURL(this.selected_lab.laboratory.code);
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
            if(this.selected_lab.request_status_code === 'RF') {
              this.updateLabReq('RQ');
            } else {
              this.toastr.success('Lab result was recorded!','Laboratory Result');
              this.closeModal();
            }
          },
          error: err => console.log(err)
        })
      } else {
        this.is_saving = false;
        this.toastr.error('Laboratory does not exist','Lab form')
      }
    } else {
      this.updateLabReq('RF');
    }
  }

  updateLabReq(request_status_code){
    let params = {
      lab_code: this.selected_lab.laboratory.code,
      patient_id: this.selected_lab.patient_id,
      recommendation_code: this.selected_lab.recommendation_code,
      request_date: this.selected_lab.request_date,
      request_status_code: request_status_code,
    }

    this.http.update('laboratory/consult-laboratories/', this.selected_lab.id, params).subscribe({
      next: () => {
        this.toastr.success('Lab record was updated!','Lab Record');
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.is_saving = false;
    this.toggleModal.emit('add');
  }

  cancelThisModal(){
    this.cancelModal.emit('add');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private nameHelper: NameHelperService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadForm()
  }

}
