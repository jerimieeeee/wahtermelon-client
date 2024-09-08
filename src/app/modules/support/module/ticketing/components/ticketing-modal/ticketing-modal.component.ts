import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  selector: 'app-ticketing-modal',
  templateUrl: './ticketing-modal.component.html',
  styleUrls: ['./ticketing-modal.component.scss']
})
export class TicketingModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() facility_id;

  faSave = faSave;
  faCircleNotch = faCircleNotch;

  category_list: any[] = [];
  subcategory_list: any[] = [];
  show_form: boolean = false;
  is_saving: boolean = false;

  ticketForm=new FormGroup({
    facility_id: new FormControl<string|null>(null),
    reporter_user_id: new FormControl<string|null>(null),
    reporter_name: new FormControl<string|null>(null),
    start_date: new FormControl<string|null>(null),
    department_id: new FormControl<string|null>(null),
    status_id: new FormControl<string|null>(null),
    category_id: new FormControl<string|null>(null),
    sub_category_id: new FormControl<string|null>(null),
    title: new FormControl<string|null>(null),
    details: new FormControl<string|null>(null)
  });

  onSubmit() {
    this.is_saving = true;
    this.ticketForm.patchValue({
      department_id: (this.ticketForm.value.category_id === '2' ? '3' : '1')
    })

    this.http.postToMasterform('logs-facility', this.ticketForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        this.is_saving = false;
        this.closeModal();
      },
      error: err => console.log(err)
    })
  }

  createForm(){
    let currentDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en', 'Asia/Manila');
    this.ticketForm = this.formBuilder.nonNullable.group({
      facility_id: [this.facility_id],
      reporter_user_id: [this.http.getUserID()],
      reporter_name: [this.reporter_user_name],
      start_date: [currentDate, Validators.required],
      department_id: ['', Validators.required],
      status_id: ['1', Validators.required],
      category_id: ['', Validators.required],
      sub_category_id: ['', Validators.required],
      title: ['', Validators.required],
      details: ['', Validators.required]
    });

    this.show_form = true;
  }

  loadLibraries() {
    const getCategory = this.http.getFromMasterform('libraries/log-category');
    const getSubCategory = this.http.getFromMasterform('libraries/log-subcategory');

    forkJoin([getCategory, getSubCategory]).subscribe({
      next: ([dataCategory, dataSubCategory]: any) => {
        this.category_list = dataCategory.data;
        this.subcategory_list = dataSubCategory.data;

        this.createForm();
      },
      error: err => this.http.showError(err.error.message, 'Ticketing')
    })
  }

  closeModal(){
    this.toggleModal.emit('new-ticket')
  }

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder
  ) { }

  reporter_user_name: string;

  ngOnInit(): void {
    const user_info = this.http.getUserFromJSON();
    this.reporter_user_name = user_info.first_name + ' ' + user_info.last_name;

    this.loadLibraries();
  }
}
