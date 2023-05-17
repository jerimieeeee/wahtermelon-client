import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-abuse-acts',
  templateUrl: './abuse-acts.component.html',
  styleUrls: ['./abuse-acts.component.scss']
})
export class AbuseActsComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() selected_abused;

  faCircleNotch = faCircleNotch;

  is_saving: boolean = false;
  show_error: boolean = false;

  abused_acts: any = {
    victim_survivor: [],
    historian: [],
    sworn_statement: []
  };

  onSubmit(){
    console.log(this.abused_acts)
  }


  abuses: any =[];

  loadLibraries(){
    this.http.get('libraries/'+this.selected_abused.url).subscribe({
      next: (data: any) => {
        this.abuses = data.data;
      },
      error: err => console.log(err)
    })
  }

  closeModal(){
    this.toggleModal.emit('abuse_acts');
  }

  constructor (
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
      this.loadLibraries()
  }
}
