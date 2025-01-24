import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-end-visit',
    templateUrl: './end-visit.component.html',
    styleUrls: ['./end-visit.component.scss'],
    imports: [FontAwesomeModule, FormsModule, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EndVisitComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() consult_id;
  @Input() consult_date;
  @Input() patient_id;
  @Input() pt_group;

  is_saving:boolean = false;

  onSubmit(){
    this.is_saving = true;
    let params;
    if(!this.consult_date || !this.pt_group){
      params = {}
    } else {
      params = {
        patient_id: this.patient_id,
        consult_date: this.consult_date,
        pt_group: this.pt_group,
        consult_done: true
      }
    }

    this.http.update('consultation/records/', this.consult_id, params).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.is_saving = false;
        this.toastr.info('Visit was ended');
        this.router.navigate(['/patient/itr', {id: this.patient_id}])
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  closeModal(){
    this.toggleModal.emit('end_visit')
  }
}
