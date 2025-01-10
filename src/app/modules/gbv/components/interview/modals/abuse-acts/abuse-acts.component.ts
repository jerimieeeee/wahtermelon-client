import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-abuse-acts',
    templateUrl: './abuse-acts.component.html',
    styleUrls: ['./abuse-acts.component.scss'],
    standalone: false
})
export class AbuseActsComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_abused;
  @Input() intake_id;
  @Input() patient_id;

  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;
  show_error: boolean = false;

  abused_acts: any = {
    1: [],
    2: [],
    3: []
  };

  onSubmit(){
    let abuses: any = [];
    Object.entries(this.abused_acts).forEach(([key, value], index) => {
      Object.entries(value).forEach(([k, v]: any, i) => {
        if(v) {
          abuses.push({
            info_source_id: key,
            abused_id: k
          })
        }
      });
    });

    let params = {
      patient_id: this.patient_id,
      intake_id: this.intake_id,
      abused_array: abuses
    }

    console.log(params);

    this.http.post('gender-based-violence/'+this.selected_abused.save_url, params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Successfully recorded', this.selected_abused.act_title);
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }


  abuses: any =[];

  loadLibraries(){
    this.http.get('libraries/'+this.selected_abused.url).subscribe({
      next: (data: any) => {
        this.abuses = data.data;
        if(this.selected_abused.abused_data) this.loadAbusedData()
      },
      error: err => console.log(err)
    })
  }

  loadAbusedData() {
    Object.entries(this.selected_abused.abused_data).forEach(([key, value]: any, index) => {
      if(value.info_source_id === 1) this.abused_acts[1][value[this.selected_abused.abused_id_name]] = true;
      if(value.info_source_id === 2) this.abused_acts[2][value[this.selected_abused.abused_id_name]] = true;
      if(value.info_source_id === 3) this.abused_acts[3][value[this.selected_abused.abused_id_name]] = true;
    })

    console.log(this.abused_acts)
  }

  closeModal(){
    this.toggleModal.emit('abuse_acts');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      this.loadLibraries();
  }
}
