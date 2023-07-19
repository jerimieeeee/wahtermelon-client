import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as angularFontawesome from '@fortawesome/angular-fontawesome';
import { SearchCaserateComponent } from './modals/search-caserate/search-caserate.component';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { cc_caserate, tb_caserate } from './caserateLib';

@Component({
  selector: 'app-caserate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, angularFontawesome.FontAwesomeModule, SearchCaserateComponent, NgSelectModule, FormsModule],
  templateUrl: './caserate.component.html',
  styleUrls: ['./caserate.component.scss']
})
export class CaserateComponent implements OnInit {
  @Input() program_id;
  @Input() program_name;
  @Input() patient_id;

  faSave = faSave;
  faCircleNotch = faCircleNotch;
  faSearch = faSearch;
  faEdit = faEdit;

  modals: any = [];
  attendant: any;

  show_form: boolean = false;
  is_saving: boolean = false;

  caserateForm: FormGroup =  new FormGroup({
    id: new FormControl<string|null>(''),
    patient_id: new FormControl<string|null>(''),
    program_desc: new FormControl<string|null>(''),
    program_id: new FormControl<string|null>(''),
    caserate_date: new FormControl<string|null>(''),
    admit_dx: new FormControl<string|null>(''),
    caserate_code: new FormControl<string|null>(''),
    code: new FormControl<string|null>(''),
    description: new FormControl<string|null>(''),
    discharge_dx: new FormControl<string|null>(''),
    icd10_code: new FormControl<string|null>(''),
    hci_fee: new FormControl<number|null>(null),
    prof_fee: new FormControl<number|null>(null),
    caserate_fee: new FormControl<number|null>(null),
    caserate_attendant: new FormControl<string|null>(null),
  });

  selectPreloadedCaserate(){
    console.log(this.loaded_caserate);
    this.caserateForm.patchValue({
      ...this.loaded_caserate
    });
  }

  selectCaserate(i) {
    this.patchData(this.caserate_list[i]);
  }

  onSubmit() {
    this.is_saving = true;

    this.http.post('eclaims/eclaims-caserate', this.caserateForm.value).subscribe({
      next:(data:any) => {
        this.toastr.success('Successfuly recorded.', 'Caserate');
        this.is_saving = false;
        this.getCaserate();
      },
      error: err => {console.log(err); this.is_saving = false;}
    })
  }

  caserate_list: any;

  getCaserate() {
    this.show_form = false;
    let params = {
      program_id: this.program_id,
      program_desc: this.program_name
    };

    this.http.get('eclaims/eclaims-caserate', {params}).subscribe({
      next:(data:any) => {
        this.caserate_list = data.data;
        // console.log(this.caserate_list);
        this.createForm()
      },
      error: err => console.log(err)
    })
  }

  createForm(data?){
    this.caserateForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_id],
      program_desc: [this.program_name],
      program_id: [this.program_id],
      caserate_date: [null, Validators.required],
      admit_dx: [null, Validators.required],
      caserate_code: [null, Validators.required],
      code: [null, Validators.required],
      description: [null, Validators.required],
      discharge_dx: [null, Validators.required],
      icd10_code: [null, Validators.required],
      hci_fee: [null, Validators.required],
      prof_fee: [null, Validators.required],
      caserate_fee: [null, Validators.required],
      caserate_attendant: [null, Validators.required]
    });

    if(data) this.patchData(data);
    this.show_form = true;
  }

  // Final dx
  fdx$: Observable<any>;
  searchInput$ = new Subject<string>();
  selectedFdx: any;
  minLengthTerm = 3;
  fdxLoading:boolean = false;
  loadFdx(val) {
    // console.log('test')
    this.fdx$ = concat(
      of(val),
      this.searchInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.fdxLoading = true),
        switchMap(term => {
          return this.getFdx(term).pipe(
            catchError(() => of([])),
            tap(() => this.fdxLoading = false)
          )
        })
      )
    );
  }

  getFdx(term: string = null): Observable<any> {
    return this.http.get('libraries/icd10', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      // console.log(resp)
      return resp.data;
    }))
  }

  final_dx: any;
  loadSelected(){
    let selected_fdx = [];
    let temp_fdx = [];

    if(this.final_dx && Object.keys(this.final_dx).length > 0){
      Object.entries(this.final_dx).forEach(([key, value], index) => {
        let val: any = value;
        selected_fdx.push(val.icd10_code.toString());
        temp_fdx.push(val.lib_icd10);
      });

      this.loadFdx(temp_fdx);
      this.selectedFdx = selected_fdx;
    } else {
      this.loadFdx([]);
    };
  }
  // Final dx

  patchData(data){
    this.caserateForm.patchValue({...data});
  }

  loadContent(content) {
    this.caserateForm.patchValue({
      id: null,
      caserate_date: null,
      admit_dx: '',
      caserate_code: content.data.pCaseRateCode,
      code: content.data.pItemCode,
      description: content.data.pCaseRateDescription,
      hci_fee: content.amount.pPrimaryHCIFee,
      prof_fee: content.amount.pPrimaryProfFee,
      caserate_fee: content.amount.pPrimaryCaseRate,
      caserate_attendant: '',
    })
  }

  toggleModal(content) {
    let name: string;
    if(content.data) {
      name = content.name
      this.loadContent(content);
    } else {
      name = content;
    }
    this.modals[name] = !this.modals[name];
  }

  get f(): { [key: string]: AbstractControl } {
    return this.caserateForm.controls;
  }

  loadLibraries() {
    this.http.get('users', {params: {attendant_flag: 'tb'}}).subscribe({
      next: (data: any) => {
        this.attendant = data.data;
        this.getCaserate();
      }
    })
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  preloaded_caserate: any;
  tb_caserate = tb_caserate;
  cc_caserate = cc_caserate;
  loaded_caserate: any;

  ngOnInit(): void {
    this.loadLibraries();
    this.loadSelected();

    switch(this.program_name){
      case 'tb':
        this.preloaded_caserate = this.tb_caserate;
        break;
      case 'cc':
        this.preloaded_caserate = this.cc_caserate;
        break;
    }
  }
}
