import { Component, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-health-facility',
  templateUrl: './health-facility.component.html',
  styleUrls: ['./health-facility.component.scss']
})
export class HealthFacilityComponent implements OnInit {
  
  faInfoCircle = faInfoCircle;

    facilityForm = new FormGroup({
     
        region: new FormControl(''),
        province: new FormControl(''),
        municipality: new FormControl(''),
        brgy: new FormControl(''),
        hfname: new FormControl(''),
       
    });
  
  
    regions: object;
    provinces: object;
    municipalities: object;
    barangays: object;
    facilities: Object;
    
   
    libraries = [
      {var_name: 'regions', location: 'regions'},
      {var_name: 'facilities', location: 'facilities'},
    ]
  
    is_saving: boolean = false;
  
    constructor(
      private http: HttpService
    ) { }
  
    saveFacility(){
      console.log(this.facilityForm);
      /* this.is_saving = true;
  
      this.http.post('patient', this.patientForm).subscribe({
        next: (data: any) => console.log(data),
        error: err => console.log(err),
        complete: () => this.is_saving = false
      }) */
    }
  
    
  
    loadDemog(loc, code, include){
      if(loc == 'regions') {
        this.municipalities = null;
        this.barangays = null;
      }else if (loc == 'provinces') {
        this.barangays = null;
        
      }
  
      this.http.get('libraries/'+loc+'/'+code,{params:{'include':include}}).subscribe({
        next: (data: any) => {console.log(data.data); this[include] = data.data[include]},
        error: err => console.log(err)
      });
    }
  
    loadLibraries(){
      this.libraries.forEach(obj => {
        this.http.get('libraries/'+obj.location).subscribe({
          next: (data: any) => this[obj.var_name] = data.data,
          error: err => console.log(err)
        })
      });
    }
  
    ngOnInit(): void {
      this.loadLibraries();
    }
  }