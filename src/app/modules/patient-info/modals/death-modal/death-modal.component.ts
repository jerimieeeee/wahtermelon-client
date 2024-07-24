import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, forkJoin, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-death-modal',
  templateUrl: './death-modal.component.html',
  styleUrls: ['./death-modal.component.scss']
})
export class DeathModalComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() patient_info;

  death_type_list: any = [];
  death_place_list: any = [];

  minLengthTerm:number = 3;
  ic_dx$: Observable<any>;
  icInput$ = new Subject<string>();
  icfdxLoading: boolean = false;
  ac_dx$: Observable<any>;
  acInput$ = new Subject<string>();
  acfdxLoading: boolean = false;
  uc_dx$: Observable<any>;
  ucInput$ = new Subject<string>();
  ucfdxLoading: boolean = false;
  regions: object;
  provinces: object;
  municipalities: object;
  barangays: object;

  deathForm: FormGroup = new FormGroup({
    id: new FormControl<string| null>(''),
    patient_id: new FormControl<string| null>(''),
    date_of_death: new FormControl<string| null>(''),
    death_type: new FormControl<string| null>(''),
    death_place: new FormControl<string| null>(''),
    region_code: new FormControl<string| null>(''),
    province_code: new FormControl<string| null>(''),
    muncity_code: new FormControl<string| null>(''),
    barangay_code: new FormControl<string| null>(''),
    immediate_cause: new FormControl<string| null>(''),
    antecedent_cause: new FormControl<string| null>(''),
    underlying_cause: new FormControl<string| null>(''),
    remarks: new FormControl<string| null>('')
  });

  onSubmit() {
    if(this.deathForm.valid) {
      this.http.post('mortality/record', this.deathForm.value).subscribe({
        next: () => {
          this.toastr.success('Successfully recorded!', 'Mortality');
          this.closeModal();
        },
        error: err => this.http.showError(err.error.message, 'Mortality')
      })
    } else {
      this.toastr.error('Form is invalid', 'Mortality');
    }
  }

  loadIcFdx(val) {
    this.ic_dx$ = concat(
      of(val),
      this.icInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.icfdxLoading = true),
        switchMap(term => {
          return this.getFdx(term).pipe(
            catchError(() => of([])),
            tap(() => this.icfdxLoading = false)
          )
        })
      )
    );
  }

  loadAcFdx(val) {
    this.ac_dx$ = concat(
      of(val),
      this.acInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.acfdxLoading = true),
        switchMap(term => {
          return this.getFdx(term).pipe(
            catchError(() => of([])),
            tap(() => this.acfdxLoading = false)
          )
        })
      )
    );
  }

  loadUcFdx(val) {
    this.uc_dx$ = concat(
      of(val),
      this.ucInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.ucfdxLoading = true),
        switchMap(term => {
          return this.getFdx(term).pipe(
            catchError(() => of([])),
            tap(() => this.ucfdxLoading = false)
          )
        })
      )
    );
  }

  getFdx(term: string = null): Observable<any> {
    return this.http.get('libraries/icd10', {params:{'filter[search]':term}})
    .pipe(map((resp:any) => {
      console.log(resp)
      return resp.data;
    }))
  }


  createForm() {
    this.deathForm = this.formBuilder.nonNullable.group({
      id: [null],
      patient_id: [this.patient_info.id, Validators.required],
      date_of_death: [null, Validators.required],
      death_type: [null, Validators.required],
      death_place: [null, Validators.required],
      region_code: [null, Validators.required],
      province_code: [null, Validators.required],
      muncity_code: [null, Validators.required],
      barangay_code: [null, Validators.required],
      immediate_cause: [null, Validators.required],
      antecedent_cause: [null, Validators.required],
      underlying_cause: [null, Validators.required],
      remarks: [null],
    });
  }

  loadDemog(loc, code, include){
    if(loc == 'regions') {
      this.municipalities = null;
      this.barangays = null;
    }else if (loc == 'provinces') {
      this.barangays = null;
    }

    this.http.get('libraries/'+loc+'/'+code,{params:{'include':include, per_page: 'all'}}).subscribe({
      next: (data: any) => { this[include] = data.data[include]},
      error: err => console.log(err)
    });
  }

  loadLibraries() {
    const getDeathType = this.http.get('libraries/mortality-death-type');
    const getDeathPlace = this.http.get('libraries/mortality-death-place');
    const getRegions = this.http.get('libraries/regions', {params:{per_page:'all'}});

    forkJoin([getDeathType, getDeathPlace, getRegions]).subscribe({
      next: ([dataDeathType, dataDeathPlace, dataRegions]: any) => {
        this.death_type_list = dataDeathType.data;
        this.death_place_list = dataDeathPlace.data;
        this.regions = dataRegions.data;

        this.loadIcFdx([]);
        this.loadAcFdx([]);
        this.loadUcFdx([]);

        this.createForm();
      },
      error: err => { this.http.showError(err.error.message, 'Death Module Library'); }
    });

  }

  closeModal(){
    this.toggleModal.emit('death-modal');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadLibraries();
  }
}
