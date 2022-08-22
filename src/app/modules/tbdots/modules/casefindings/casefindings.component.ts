import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faAngleDown, faCalendarDay, faCaretRight, faClose, faInfoCircle, faPencil, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-casefindings',
  templateUrl: './casefindings.component.html',
  styleUrls: ['./casefindings.component.scss']
})
export class CasefindingsComponent implements OnInit {
  faCalendarDay = faCalendarDay;
  faTimes = faTimes;
  faClose = faClose;
  faTimesCircle = faTimesCircle;
  faSave = faSave;
  faPencil = faPencil;
  faAngleDown = faAngleDown;
  faInfoCircle = faInfoCircle;
  faCaretRight = faCaretRight;

  indeterminate: boolean;
  cf_form: FormGroup;
  source_of_patient: String = new String();
  reg_group: String = new String();
  gen_hlt: String = new String();
  gen_hlt_start = '';
  skin: String = new String();
  bcg_scar: String = new String();
  oropharynx: String = new String();
  cardiovascular: String = new String();
  thorax_and_lungs: String = new String();
  remarks: String = new String();

  constructor() { }

  public pe = {
    gen_hlt: '',
    skin: '',
    bcg_scar: '',
    oropharynx: '',
    cardiovascular: '',
    thorax_and_lungs: '',

};

  public fp_methods = [
    { "id": 1, "method": "Condom" },
    { "id": 2, "method": "Injectibles" },
    { "id": 3, "method": "Implant" },
    { "id": 4, "method": "NA" },
  ];

  ngOnInit(): void {
    this.createForm();
    this.cf_form.get('gen_hlt').value;
    this.checkPE();
    // this.indeterminate = true;
    //this.logCheck(this.cf_form.get('gen_hlt').value);
  }
  checkPE() {
    // this.pe.push({
    //   gen_hlt: this.cf_form.get('gen_hlt').value
    // })
    this.pe.gen_hlt = 'indeterminate';
    this.pe.skin = 'indeterminate';
    this.pe.bcg_scar = 'indeterminate';
    this.pe.oropharynx = 'indeterminate';
    this.pe.cardiovascular = 'indeterminate';
    this.pe.thorax_and_lungs = 'indeterminate';
  }
  createForm() {
    this.cf_form = new FormGroup({
      consult_date: new FormControl(new Date().toISOString().substring(0, 10)),
      source_of_patient: new FormControl(this.source_of_patient),
      reg_group: new FormControl(this.reg_group),
      remarks: new FormControl(this.remarks),
      gen_hlt: new FormControl(this.gen_hlt),
      skin: new FormControl(this.skin),
      bcg_scar: new FormControl(this.bcg_scar),
      oropharynx: new FormControl(this.oropharynx),
      cardiovascular: new FormControl(this.cardiovascular),
      thorax_and_lungs: new FormControl(this.thorax_and_lungs),
    });
  }

  saveForm(data) {
    this.cf_form.setValue({
      consult_date: data.consult_date,
      source_of_patient: data.source_of_patient,
      reg_group: data.reg_group,
    });
  }

  logCheck(id, i) {
    
    let x = Object.values(this.pe)[i];
    let y = Object.keys(this.pe)[i];
    console.log(x, "<<<< thses are my values, and these are my keys >>>>" , y);
    

      if(x == 'indeterminate'){
        this.cf_form.get(id).setValue(true);
        this.pe[y] = JSON.stringify(this.cf_form.get(id).value);
      }else if(x == 'true'){
        this.cf_form.get(id).setValue(false);
        this.pe[y] = JSON.stringify(this.cf_form.get(id).value);
      }else if(x == 'false'){
        this.cf_form.get(id).setValue('indeterminate');
        this.pe[y] =this.cf_form.get(id).value;
      }
      //console.log(this.cf_form.get(id).value);
      
      //console.log(this.pe);    
  }
}
