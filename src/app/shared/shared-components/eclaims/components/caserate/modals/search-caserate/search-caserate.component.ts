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
  @Input() program_name;

  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faSearch = faSearch;
  faMagnifyingGlass = faMagnifyingGlass;

  answers: any;
  answers_yn: any;

  is_searching: boolean = false;
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

  caserate_result: any = [];
  onSubmit() {
    this.caserate_result = [];
    this.is_searching = true;
    this.searchForm.patchValue({program_code: this.program_name === 'cc' || this.program_name === 'fp' ? 'mc' :  this.program_name});

    this.searchForm.patchValue({
      rvs: this.searchForm.value.rvs.toUpperCase(),
      description: this.searchForm.value.description.toUpperCase(),
      icd10: this.searchForm.value.icd10.toUpperCase(),
    });

    this.http.post('eclaims/case-rate', this.searchForm.value).subscribe({
      next: (data:any) => {
        this.is_searching = false;
        this.caserate_result.push(data.CASERATES);
        console.log(typeof this.caserate_result, this.caserate_result)
      },
      error: err => {
        console.log(err)
        this.is_searching = false;
        this.toastr.error(err.error.message, 'Caserate error', {
          closeButton: true,
          positionClass: 'toast-top-center',
          disableTimeOut: true
        });
      }
    })
  }

  closeModal(data?, amount?){
    let content;
    if(data) {
      content = {name: 'search-caserate', amount: amount, data: data};
    } else {
      content = 'search-caserate';
    }
    this.toggleModal.emit(content);
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

}
