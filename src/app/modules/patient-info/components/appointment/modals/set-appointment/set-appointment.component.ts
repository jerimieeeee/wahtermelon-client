import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-appointment',
  templateUrl: './set-appointment.component.html',
  styleUrls: ['./set-appointment.component.scss']
})
export class SetAppointmentComponent implements OnInit, OnChanges {
  @Output() loadData = new EventEmitter<any>();
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;

  appointment_types: any = [];

  is_saving: boolean = false;

  appointment: any = {};
  min_date = formatDate((new Date()).setDate((new Date).getDate()+1), 'yyyy-MM-dd', 'en', 'Asia/Manila');

  appointmentForm: any = {
    patient_id: null,
    appointment_date: null,
    appointment: []
  };


  onSubmit(){
    // this.is_saving = true;

    console.log(this.appointmentForm);

    if(Object.keys(this.appointment).length > 0) {
      let appointments = [];
      Object.entries(this.appointment).forEach(([key, value], index) => {
        if(value === true) {
          let appointment = {
            appointment_code: key
          }
          appointments.push(appointment);
        }
      });

      this.appointmentForm.appointment = appointments;
      // console.log(this.patient_info)
      this.appointmentForm.patient_id = this.patient_info.id;
      this.saveAppointment();
    } else {
      this.toastr.info('No appointment was selected');
      this.is_saving = false;
    }
  }

  saveAppointment(){
    console.log(this.appointmentForm);
    this.http.post('appointment/schedule', this.appointmentForm).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.is_saving = false;
        this.toastr.success('Successfully recorded!','Set appointment');
        this.loadData.emit('appointment');
        this.closeModal();
      },
      error: err => console.log(err)
    });
  }

  loadLibraries(){
    this.http.get('libraries/appointment').subscribe({
      next: (data: any) => this.appointment_types = data.data,
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('appointment-modal');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('test')
  }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
