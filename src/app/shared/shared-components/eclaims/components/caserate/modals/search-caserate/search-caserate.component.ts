import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { faCircleNotch, faSearch, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-search-caserate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './search-caserate.component.html',
  styleUrls: ['./search-caserate.component.scss']
})
export class SearchCaserateComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_tb_consult;

  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faSearch = faSearch;
  faMagnifyingGlass = faMagnifyingGlass;

  answers: any;
  answers_yn: any;

  is_saving: boolean = false;
  show_error: boolean = false;
  required_message = 'Required field';

  searchForm: FormGroup = new FormGroup({
    program_code: new FormControl<string| null>(''),
    description: new FormControl<string| null>(''),
    icd10 : new FormControl<string| null>(''),
    rvs : new FormControl<string| null>('')
  });

  get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  onSubmit() {
    this.searchForm.patchValue({program_code: 'mc'});
    this.http.post('eclaims/case-rate', this.searchForm.value).subscribe({
      next: (data:any) => {
        console.log(data)
      },
      error: err => console.log(err)
    })
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
