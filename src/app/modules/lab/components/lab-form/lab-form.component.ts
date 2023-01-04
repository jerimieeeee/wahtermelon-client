import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { faSave, faSpider } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss']
})
export class LabFormComponent implements OnChanges {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_lab;
  @Input() patient_details;

  faSave = faSave;
  faSpinner = faSpider;

  is_saving: boolean = false;
  fields: any;

  lab_form: any = [];

  loadForm(){
    if(this.selected_lab) {
      this.http.get('libraries/laboratories/'+this.selected_lab.lab_code).subscribe({
        next: (data: any) => {
          console.log(data.data)
          this.trimForm(data.data.category);
        },
        error: err => console.log(err)
      })
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
        console.log(vals.range_cat)
        if(cat === vals.range_cat) {
          fields.push(vals)
        }
      } else {
        console.log(vals.range_cat)
        fields.push(vals)
      }
    });
    console.log(fields)
    this.fields = fields;
  }

  onSubmit(){
    this.is_saving = true;
    let result = {
      id: this.selected_lab.id,
      type: this.selected_lab.type
    }

    this.http.post('url', result).subscribe({
      next: (data: any) => {
        console.log(data);
        this.is_saving = false;
        this.toastr.success('Lab result was recorded!','Laboratory Result');
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('add');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadForm()
  }

}
