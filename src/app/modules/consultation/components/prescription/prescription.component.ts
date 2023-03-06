import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faChevronCircleDown, faChevronCircleUp, faEdit, faSave, faSpinner, faTrash, faPrescriptionBottleMedical, faReceipt } from '@fortawesome/free-solid-svg-icons';
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
  @Input() with_credentials;

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
  faPrescriptionBottleMedical = faPrescriptionBottleMedical;
  faReceipt = faReceipt;

  selected_drug: any;
  prescriptions: any;

  consult_notes = {
    plan: null
  }

  navigateTo(loc){
    this.router.navigate(['/patient/'+loc, {id:this.consult_details.patient.id,consult_id:this.consult_details.id}])
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
        // console.log(data);
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
    // console.log(drug)
    this.selected_drug = drug;
    this.toggleForm();
  }



  toggleDeleteForm(){
    this.show_delete_form = !this.show_delete_form;

    if(this.show_delete_form === false) {
      this.loadPrescriptions();
    }
  }

  toggleForm(){
    if(!this.drug_uom || !this.drug_uom || !this.drug_purpose || !this.drug_frequency || !this.drug_preparation) {
      this.loadLibraries()
    } else {
      this.show_form = !this.show_form;
    }

    if(this.show_form === false) {
      this.loadPrescriptions();
    }
  }

  /* resetForm(){
    this.selected_drug = null;
  } */

  ngOnChanges(changes){
    this.show_content = this.toggle_content;
    this.show_content_tx = this.toggle_content;
    // console.log(this.show_content)
    if(this.consult_details) this.show_actions = true;

    if(this.consult_details) {
      this.consult_notes = this.consult_details.consult_notes;
      this.consult_done = this.consult_details.consult_done;
    }
  }



  //loadLibraries
  drug_uom: any;
  drug_regimen: any;
  drug_purpose: any;
  drug_frequency: any;
  drug_preparation: any;

  libraries = [
    {var_name: 'drug_uom',          location: 'unit-of-measurements'},
    {var_name: 'drug_regimen',      location: 'dose-regimens'},
    {var_name: 'drug_purpose',      location: 'purposes'},
    {var_name: 'drug_frequency',    location: 'duration-frequencies'},
    {var_name: 'drug_preparation',  location: 'preparations'},
    {var_name: 'drug_route', location: 'medicine-route'}
  ];

  loadLibraries(){
    // this.
    this.libraries.forEach((obj, index) => {
      this.http.get('libraries/'+obj.location).subscribe({
        next: (data: any) => {
          this[obj.var_name] = data.data;
          console.log(data.data);
          if(this.libraries.length -1 === index) {
            this.show_form = true
          }
        },
        error: err => console.log(err)
      })
    });
  }

  show_epress: boolean = false;
  toggleModal(){
    this.show_epress = !this.show_epress;
  }

  toggleList(){
    this.show_list = !this.show_list;
  }

  identify(index, item) {
    return item.id
  }

  loadPrescriptions(){
    // this.selected_drug = null;
    let params = {
      sort: '-prescription_date',
      consult_id: this.consult_details.id
    };

    this.http.get('medicine/prescriptions',{params}).subscribe({
      next: (data: any) => {
        this.prescriptions = data.data;
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPrescriptions();
  }

}
