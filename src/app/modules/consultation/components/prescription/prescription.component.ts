import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { faAdd, faChevronCircleDown, faChevronCircleUp, faEdit, faSave, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit, OnChanges {
  @Input() toggle_content;
  @Input() consult_details;

  show_content: boolean = true;
  show_list: boolean = false;
  show_form: boolean = false;
  show_delete_form: boolean = false;
  show_actions: boolean = false;
  show_content_tx: boolean = false;
  is_saving: boolean = false;
  consult_done: boolean = false;

  faChevronCircleUp = faChevronCircleUp;
  faChevronCircleDown = faChevronCircleDown;
  faAdd = faAdd;
  faSave = faSave;
  faSpinner = faSpinner;
  faEdit = faEdit;
  faTrash = faTrash;

  selected_drug: any;

  consult_notes = {
    plan: null
  }

  openDeleteForm(drug){
    this.selected_drug = drug;

    this.toggleDeleteForm()
  }

  onSubmit(){
    this.is_saving = true;

    let notes_remarks = {
      consult_id: this.consult_details.id,
      patient_id: this.consult_details.patient.id,
      plan: this.consult_notes.plan,
    }

    this.http.update('consultation/notes/', this.consult_details.consult_notes.id, notes_remarks).subscribe({
      next: (data: any) => {
        console.log(data);
        this.is_saving = false;
        this.showToastr();
      },
      error: err => console.log(err)
    })
  }

  showToastr(){
    this.toastr.success('Successfully recorded!','Treatment plan')
  }

  openEditForm(drug){
    this.selected_drug = drug;
  }

  openAddForm(drug){
    console.log(drug)
    this.selected_drug = drug;
    this.toggleForm();
  }

  toggleList(){
    this.show_list = !this.show_list;
  }

  toggleDeleteForm(){
    this.show_delete_form = !this.show_delete_form;

    if(this.show_delete_form === false) {
      this.loadPrescriptions();
    }
  }

  toggleForm(){
    this.show_form = !this.show_form;

    if(this.show_form === false) {
      this.loadPrescriptions();
    }
  }

  resetForm(){
    this.selected_drug = null;
  }

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    this.show_content_tx = this.toggle_content;
    console.log(this.show_content)
    if(this.consult_details) this.show_actions = true;

    if(this.consult_details) {
      this.consult_notes = this.consult_details.consult_notes;
      this.consult_done = this.consult_details.consult_done;
    }
  }

  prescriptions: any;


  //Temp function to load from lib
  libraries = {
    dosage_uom:             {var_name: 'dosage_desc',       location: 'unit-of-measurements', value: ''},
    dose_regimen:           {var_name: 'regimen_desc',      location: 'dose-regimens',        value: ''},
    medicine_purpose:       {var_name: 'purpose_desc',      location: 'purposes',             value: ''},
    duration_frequency:     {var_name: 'frequency_desc',    location: 'duration-frequencies', value: ''},
    quantity_preparation:   {var_name: 'preparation_desc',  location: 'preparations',         value: ''},
    konsulta_medicine_code: {var_name: 'medicine_desc',     location: 'konsulta-medicines',   value: ''}
  }

  identify(index, item) {
    // console.log(item)
    return item.id
  }

  getValues(){
    Object.entries(this.prescriptions).reverse().forEach(([key, value], index) => {
      let values: any = value;

      Object.entries(this.libraries).reverse().forEach(([k, v], i) => {
        // console.log(values[k])
        this.http.get('libraries/'+v.location+'/'+values[k]).subscribe({
          next: (data: any) => {
            // console.log(data)
            this.prescriptions[key][v.var_name] = data.data.desc
          },
          error: err => console.log(err)
        })
      });
    });
    // console.log(this.prescriptions)
  }
  //end

  loadPrescriptions(){
    this.selected_drug = null;
    let params = {
      sort: '-prescription_date',
      consult_id: this.consult_details.id
    };

    this.http.get('medicine/prescriptions',params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.prescriptions = data.data;
        this.getValues();
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadPrescriptions();
  }

}
