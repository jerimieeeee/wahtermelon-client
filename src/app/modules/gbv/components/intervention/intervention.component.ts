import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent implements OnInit {
  @Output() updateSelectedGbv = new EventEmitter<any>();
  @Input() selected_gbv_case;
  @Input() patient_id;

  faPlus = faPlus;
  faEdit = faEdit;
  faSave = faSave;
  show_form: boolean = true;

  modals: any = [];

  selected_data: any;

  reloadData(){
    let params = {
      id: this.selected_gbv_case.id,
    }

    this.http.get('gender-based-violence/patient-gbv', {params}).subscribe({
      next: (data: any) => {
        this.selected_gbv_case = data.data[0];
        this.updateSelectedGbv.emit(this.selected_gbv_case);
      },
      error: err => console.log(err)
    });
  }

  toggleModal(name, data?){
    this.selected_data = data ? data : null;
    this.modals[name] = !this.modals[name];
    if(!this.modals[name]) this.reloadData();
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      // this.toggleModal('case_conference');
  }
}
