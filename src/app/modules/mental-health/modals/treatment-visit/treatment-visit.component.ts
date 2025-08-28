import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-treatment-visit',
  templateUrl: './treatment-visit.component.html',
  styleUrl: './treatment-visit.component.scss',
  standalone: false,
})
export class TreatmentVisitComponent implements OnChanges {

  is_saving: boolean = false;
  treatment_form: any;

  onSubmit() {
    /* this.http.post('mental-health/treatment-visit', this.treatment_form).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success('Treatment visit successfully saved.', 'Success');
      },
      error: err => {
        console.log(err.error);
        this.toastr.error('Error saving treatment visit', 'Error');
      }
    }); */
  }

  closeModal() {

  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
