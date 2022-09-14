import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {
  faSpinner = faSpinner;

  is_saving: boolean = false;

  constructor(
    private http: HttpService
  ) { }

  savePatient(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  loadLibraries(){
    this.http.get('blood_type').subscribe({
      next: data => {console.log(data)},
      error: err => {console.log(err)},
      complete: () => {console.log('done')}
    });
  }

  ngOnInit(): void {
    // this.loadLibraries();
  }
}
