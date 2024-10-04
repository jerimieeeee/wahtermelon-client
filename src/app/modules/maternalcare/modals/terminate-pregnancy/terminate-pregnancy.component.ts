import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-terminate-pregnancy',
  templateUrl: './terminate-pregnancy.component.html',
  styleUrl: './terminate-pregnancy.component.scss'
})
export class TerminatePregnancyComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();

  terminateForm: FormGroup = new FormGroup({
    id: new FormControl<string|null>(null),
    pregnancy_termination_date: new FormControl<string|null>(null),
    pregnancy_termination_code: new FormControl<string|null>(null),
    pregnancy_termination_cause: new FormControl<string|null>(null),
    pregnancy_termination_barangay_code: new FormControl<string|null>(null),
    region_code: new FormControl<string|null>(null),
    province_code: new FormControl<string|null>(null),
    municipality_code: new FormControl<string|null>(null),
    barangay_code: new FormControl<string|null>(null)
  });

  get f(): { [key: string]: AbstractControl} {
    return this.terminateForm.controls;
  }

  closeModal(){
    this.toggleModal.emit();
  }

  onSubmit() {
    // this.http.
  }

  regions: any[] = [];
  provinces: any[] = [];
  municipalities: any[] | null = null;
  barangays: any[] = [];
  termination_causes: any[] = [];

  loadDemog(loc, code, include) {
    if (loc == 'regions') {
      this.municipalities = null;
      this.barangays = null;
    } else if (loc == 'provinces') {
      this.barangays = null;
    }

    this.http.get('libraries/' + loc + '/' + code, { params: { 'include': include, per_page: 'all' } }).subscribe({
      next: (data: any) => {
        this[include] = data.data[include];
      },
      error: err => console.log(err)
    });
  }

  loadLibraries(){
    const getLibTermination = this.http.get('libraries/mc-pregnancy-terminations');
    const getRegions = this.http.get('libraries/regions', {params:{per_page: 'all'}});

    forkJoin([getLibTermination, getRegions]).subscribe({
      next:([dataLibTermination, dataRegions]:any) => {
        this.regions = dataRegions.data;
        this.termination_causes = dataLibTermination.data;
        this.createForm();
      },
      error: err => console.log(err)
    })
  }

  createForm() {
    this.terminateForm = this.formBuilder.nonNullable.group({
      id: [''],
      pregnancy_termination_date: [''],
      pregnancy_termination_code: [''],
      pregnancy_termination_cause: [''],
      pregnancy_termination_barangay_code: [''],
      region_code: [''],
      province_code: [''],
      municipality_code: [''],
      barangay_code: [''],
    })
  }

  constructor (
    private http: HttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.municipalities)
    this.loadLibraries();
  }
}
