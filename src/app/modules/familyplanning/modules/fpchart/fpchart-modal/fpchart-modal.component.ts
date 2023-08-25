import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-fpchart-modal',
  templateUrl: './fpchart-modal.component.html',
  styleUrls: ['./fpchart-modal.component.scss']
})
export class FpchartModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Output() loadFP = new EventEmitter<any>();
  @Output() loadFPDetails = new EventEmitter<any>();
  @Output() anotherFunction = new EventEmitter<any>();
  @Input() patient_id;
  @Input() fp_visit_history;
  @Input() fpchart_history;


  is_saving: boolean = false;

  show_form: boolean = false;

  fp_visit_history_details: any;

  source_supplies: any;

  isAccepted: boolean;

  min_date = formatDate((new Date()).setDate((new Date).getDate()+1), 'yyyy-MM-dd', 'en');

  max_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  isCheck(e){
    if(e.target.checked){
       this.isAccepted = true;
    }
    else{
       this.isAccepted = false;
    }
    console.log(this.isAccepted);
  }

  closeModal(){
    this.toggleModal.emit('fpchart-modal');
    // console.log('check modal')
  }

  sourceForm: FormGroup = new FormGroup({

    patient_id: new FormControl<string| null>(''),
    patient_fp_id: new FormControl<string| null>(''),
    patient_fp_method_id: new FormControl<string| null>(''),
    service_date: new FormControl<string| null>(''),
    source_supply_code: new FormControl<string| null>(''),
    quantity: new FormControl<string| null>(''),
    next_service_date: new FormControl<string| null>(''),
    remarks: new FormControl<string| null>(''),

  });

  // onSubmit(){


  //   this.is_saving = true;
  //   this.http.post('family-planning/fp-chart', this.sourceForm.value).subscribe({
  //     next: (data: any) => {
  //       this.toastr.success('Chart was ' + (this.sourceForm.value ? 'updated' : 'saved') + ' successuly', 'Success')
  //       this.is_saving = false;
  //       this.saveAppointment();
  //       this.loadFP.emit();
  //       this.loadFPDetails.emit();
  //       this.anotherFunction.emit();
  //       console.log(data, 'display chart details')
  //        },
  //     complete: () => {
  //      this.closeModal();
  //     },
  //     error: err => {console.log(err)

  //     },
  //   })
  // }

  Submit(){
    let query;

    if(this.fpchart_history?.id) {
      query = this.http.update('family-planning/fp-chart/', this.fpchart_history.id, this.sourceForm.value);
    } else {
      query = this.http.post('family-planning/fp-chart', this.sourceForm.value);
    }

    query.subscribe({
      next: (data: any) => {
        this.toastr.success('Chart was ' + (this.sourceForm.value ? 'updated' : 'saved') + ' successuly', 'Success')
        this.is_saving = false;
        // this.saveAppointment();
        // this.loadFP.emit();
        // this.loadFPDetails.emit();
        this.anotherFunction.emit();
        this.closeModal();
        console.log(data, 'display chart details')
        // console.log(this.isAccepted,'checkb checkbox value')
        if(this.isAccepted === true){
          this.saveAppointment();
          console.log(this.isAccepted,'checkbox is working')
        } else {
          console.log(this.isAccepted,'checkbox is not working')
        }
      },
      error: err => console.log(err)
    })
  }

  saveAppointment(){
    let appointmentForm = {
      patient_id: this.patient_id,
      appointment_date: this.sourceForm.value.next_service_date,
      appointment: [{appointment_code: 'FP'}]
    };

    this.http.post('appointment/schedule', appointmentForm).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.is_saving = false;
        this.closeModal();
      },
      error: err => console.log(err)
    });
  }

  // onUpdate(){


  //   this.is_saving = true;
  //   this.http.update('family-planning/fp-chart/', this.fpchart_history?.id, this.sourceForm.value).subscribe({
  //     next: (data: any) => {
  //       this.toastr.success('Chart was ' + (this.sourceForm.value ? 'updated' : 'saved') + ' successuly', 'Success')
  //       this.is_saving = false;
  //       this.saveAppointment();
  //       this.loadFP.emit();
  //       this.loadFPDetails.emit();
  //       this.anotherFunction.emit();
  //       console.log(data, 'display chart details')
  //        },
  //     complete: () => {
  //      this.closeModal();
  //     },
  //     error: err => {console.log(err)

  //     },
  //   })
  // }

  loadLib() {


    this.http.get('libraries/family-planning-source-supply').subscribe({
      next: (data: any) => {

       this.source_supplies = data.data
       this.loadChart();
       this.show_form = true;
      },
      complete: () => {

      },
      error: err => {console.log(err)

      },
    })
  }

  validateForm(){

    this.sourceForm = this.formBuilder.group({

      patient_id: [this.patient_id, [Validators.required, Validators.minLength(1)]],
      patient_fp_id: [this.fp_visit_history_details.id, [Validators.required, Validators.minLength(1)]],
      patient_fp_method_id: [this.fp_visit_history_details.method.id, [Validators.required, Validators.minLength(1)]],
      service_date: ['', [Validators.required, Validators.minLength(1)]],
      source_supply_code: ['', [Validators.required, Validators.minLength(1)]],
      quantity: ['', [Validators.required, Validators.minLength(1)]],
      next_service_date: ['', [Validators.required, Validators.minLength(1)]],
      remarks: ['', [Validators.required]],


    });

    // this.loadFPDetails();
    this.show_form = true;
  }

  loadChart(){
    if(this.fpchart_history?.id){
      this.sourceForm.patchValue({
        service_date: formatDate(this.fpchart_history?.service_date, 'yyyy-MM-dd', 'en'),
        source_supply_code: this.fpchart_history?.source.code,
        quantity: this.fpchart_history?.quantity,
        next_service_date: formatDate(this.fpchart_history?.next_service_date, 'yyyy-MM-dd', 'en'),
        remarks: this.fpchart_history?.remarks,
      });
      this.show_form = true;
      console.log('test ng load chart function')
    } else {
      console.log('test ng load chart function else')
    }

  }


  constructor(
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.fp_visit_history_details = this.fp_visit_history
    this.validateForm();
    this.loadLib();
    console.log(this.fp_visit_history_details, 'fp history in fp chart modal')
    console.log(this.fpchart_history, 'display supplies')
  }
}
