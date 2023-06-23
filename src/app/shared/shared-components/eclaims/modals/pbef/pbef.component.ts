import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { faSave, faCircleNotch, faSearch, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pbef',
  templateUrl: './pbef.component.html',
  styleUrls: ['./pbef.component.scss']
})
export class PbefComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_tb_consult;

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
    this.is_searching = true;
    this.searchForm.patchValue({program_code: 'mc'});
    this.http.post('eclaims/case-rate', this.searchForm.value).subscribe({
      next: (data:any) => {
        this.is_searching = false;
        this.caserate_result.push(data.CASERATES);
        console.log(typeof this.caserate_result, this.caserate_result)
      },
      error: err => console.log(err)
    })
  }

  ngOnInit(): void {
    console.log('test');
  }

  closeModal(data?){
    this.toggleModal.emit('pbef');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

}
