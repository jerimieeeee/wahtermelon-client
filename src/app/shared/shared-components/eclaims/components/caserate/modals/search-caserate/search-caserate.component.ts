import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { faCircleNotch, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-search-caserate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-caserate.component.html',
  styleUrls: ['./search-caserate.component.scss']
})
export class SearchCaserateComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_tb_consult;

  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faSearch = faSearch;

  answers: any;
  answers_yn: any;

  is_saving: boolean = false;
  show_error: boolean = false;
  required_message = 'Required field';

  searchForm: FormGroup = new FormGroup({
    diagnosis_description: new FormControl<string| null>(''),
    icd10_code : new FormControl<string| null>(''),
    rvs_code : new FormControl<string| null>('')
  });


  get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  onSubmit(){
    this.is_saving = true;
  }

  closeModal(){
    this.toggleModal.emit('search-caserate');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

}
