import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-end-visit',
  templateUrl: './end-visit.component.html',
  styleUrls: ['./end-visit.component.scss']
})
export class EndVisitComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() consult_id;
  @Input() consult_date;
  @Input() patient_id;
  showAlert:boolean = false;

  onSubmit(){
    let params = {
      patient_id: this.patient_id,
      consult_date: this.consult_date,
      pt_group: 'cn',
      consult_done: true
    }

    this.http.update('consultation/cn-records/', this.consult_id, params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['/itr', {id: this.patient_id}])
        }, 3000);
      },
      error: err => console.log(err)
    })
  }

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  closeModal(){
    this.toggleModal.emit()
  }

  ngOnInit(): void {
  }

}
