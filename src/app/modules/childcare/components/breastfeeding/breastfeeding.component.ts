import { Component, Input, OnInit } from '@angular/core';
import { faSearch,faBalanceScale,faPlus, faInfoCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup,FormArray,FormControl,Validators,} from '@angular/forms';
import * as moment from 'moment';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { HttpService } from 'app/shared/services/http.service';

@Component({
  selector: 'app-breastfeeding',
  templateUrl: './breastfeeding.component.html',
  styleUrls: ['./breastfeeding.component.scss']
})
export class BreastfeedingComponent implements OnInit {


  month: any
  selectedItem: any
  selectedItemsList = [];
  selectedMonths = [];
  checkedIDs = [];
  showData: any

  faSearch = faSearch;
  faPlus = faPlus;
  faInfoCircle = faInfoCircle;
  faSpinner = faCircleNotch;
  faPenToSquare = faPenToSquare;

  is_saving: boolean = false;

  todaysDate = new Date();


  showBreastfeedingModal = false;
  lib_reasons: any;
  ebf_date: any;

  toggleBreastfeedingModal(){
    this.showBreastfeedingModal = !this.showBreastfeedingModal;
    // this.geteServiceName();
    this.loadBreastfed();
    this.getccdevDetails()
    this.groupList = []
  }

  saveModal(){
    this.is_saving = true;

    setTimeout(() => {
      this.is_saving = false;
    }, 5000);
  }

  getSelected(){
    if(this.groupList2.includes(0))
    {
      this.showData=true;
      console.log('open ang reason for stopping 2')
    }
    else{
      this.showData=false;
      console.log('close ang reason for stopping 2')
    }
}

// changeSelection() {
//   this.fetchSelectedItems()
// }

// fetchSelectedItems() {
//   this.selectedItemsList = this.ccdev.filter((value, index) => {
//     return value.isChecked
//   });
//   console.log(this.selectedItemsList)
// }


  ebf = [
    {code: '1', desc: 'Yes'},
    {code: '0', desc: 'No'},
  ];

  // reasons = [
  //   {code: '00', desc: '-'},
  //   {code: '01', desc:'Infant nutrition'},
  //   {code: '02', desc:'Maternal illness'},
  //   {code: '03', desc:'Infant illness'},
  //   {code: '04', desc:'Lactation and milk-pumping problems'},
  //   {code: '05', desc:'Mother returns to work'},
  //   {code: '06', desc:'Introduced water or solid food'},
  // ];
  @Input() patient_details: any;

  ccdev = [];

  ccdevbreast = 35;
  patient_breastfed: any;

  groupList = [];
  groupList2 = [];
  arrayVal:any;

  patient_info: any;



  constructor(private http: HttpService) {



  }

  submit() {
    this.selectedMonths = this.ccdev.filter((value, index) => {
      return value.selected,
      localStorage.setItem('Breastfeeding Months', JSON.stringify(this.selectedMonths)),
      this.month = this.selectedMonths
    });

  }

  changeSelection(i: any, value: any) {


    this.ccdev[i].selected = value;
    // this.fetchSelectedItems()
    this.getPrev()
    // console.log(this.groupList, 'selected bfed_months')
    if(this.groupList.includes('0'))
    {
    //  console.log('open ang reason for stopping')
     this.showData = true
    }
    else{
      this.showData = false
      // console.log('close ang reason for stopping')
    }

  }

  fetchSelectedItems() {
    this.selectedMonths= this.ccdev.filter((value, index) => {
      this.selectedMonths.push(value.selected)
      return value.selected
    });
  }

  getPrev(){
    this.groupList = [];
    this.ccdev.forEach((item, index) => {

    this.groupList.push(item.selected);

    });

    console.log(this.groupList);
    let user_id = this.http.getUserID();;
    var bfedmonths ={
      patient_ccdevs_id: '',
      patient_id: '',
      user_id: user_id,
      bfed_month1: this.groupList[0],
      bfed_month2: this.groupList[1],
      bfed_month3: this.groupList[2],
      bfed_month4: this.groupList[3],
      bfed_month5: this.groupList[4],
      bfed_month6: this.groupList[5],
      reason_id: this.patient_breastfed.ebfreasons,
      ebf_date: this.patient_breastfed.ebf_date,
    }

    // console.log(bfedmonths, 'patient_breasfed currently selected');

    // this.http.post('child-care/cc-breastfed', bfedmonths).subscribe({
    //   // next: (data: any) => console.log(data.status, 'check status'),
    //   error: err => console.log(err),
    //   complete: () => {
    //     console.log('bfed data saved')
    //     this.is_saving = false;
    //   }
    // })
  }

  onSubmit(){
    this.groupList = [];
    this.ccdev.forEach((item, index) => {

    this.groupList.push(item.selected);

    });

    console.log(this.patient_breastfed);
    let user_id = this.http.getUserID();;
    var bfedmonths ={
      patient_ccdev_id: this.patient_info.id,
      patient_id: this.patient_info.patient_id,
      user_id: user_id,
      bfed_month1: this.groupList[0] == 'null' ? null:this.groupList[0],
      bfed_month2: this.groupList[1] == 'null' ? null:this.groupList[1],
      bfed_month3: this.groupList[2] == 'null' ? null:this.groupList[2],
      bfed_month4: this.groupList[3] == 'null' ? null:this.groupList[3],
      bfed_month5: this.groupList[4] == 'null' ? null:this.groupList[4],
      // bfed_month6: this.groupList[5] == 1 ? 1:0,
      bfed_month6: this.groupList[5] == 'null' ? null:this.groupList[5],
      reason_id: this.patient_breastfed.ebfreasons,
      ebf_date: this.patient_breastfed.ebf_date,
    }

    console.log(bfedmonths);

    this.http.post('child-care/cc-breastfed', bfedmonths).subscribe({
      // next: (data: any) => console.log(data.status, 'check status'),
      error: err => console.log(err),
      complete: () => {
        // this.loadLibraries();
        console.log('bfed data saved')
        this.is_saving = false;
      }
    })
  }

  getccdevDetails() {
    this.http.get('child-care/cc-records/'+this.patient_details.id)
    .subscribe({
      next: (data: any) => {
        this.patient_info = data.data;
        // console.log(this.patient_info, 'load ccdev info on breastfeeding')
      },
      error: err => console.log(err)
    });
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.ccdev.forEach((value, index) => {
      if (value.selected) {
        this.checkedIDs.push(value.id);
      }
    });
  }

  // geteServiceName(){

  //   if(!localStorage.getItem('Breastfeeding Months'))
  //   {
  //     localStorage.setItem('Breastfeeding Months', JSON.stringify([]))
  //   }

  //   this.month = JSON.parse(localStorage.getItem('Breastfeeding Months'));
  //   console.log('retrievedBreastfedMonths: ', this.month );
  //   this.month.forEach(m =>{
  //    let i = this.ccdev.findIndex(c => c.id === m.id);
  //     if(i != -1){
  //       this.ccdev.splice(i,1);
  //     }
  //       // this.ccdev= [];
  //       this.ccdev.push({
  //           id: m.id,
  //           name: m.name,
  //           date: m.date,
  //           selected: this.groupList2[i],
  //           isDefault: m.isDefault,
  //       });
  //   });
  //   this.ccdev.sort((m, c) => new Date(m.date).getTime() - new Date(c.date).getTime());this.ccdev.sort
  // }

  loadLibraries(){
    this.http.get('libraries/reason').subscribe((data: any) => {
      this.lib_reasons = data.data
      console.log(data, 'reason library');
    });
  }

// loadBreastfed(){
//   this.groupList2 = [];
//   var lib = ['bfed_month1','bfed_month2','bfed_month3','bfed_month4','bfed_month5','bfed_month6'];
//   console.log(lib[0], " try lib");
//   this.http.get('child-care/cc-breastfed/'+this.patient_details.id)
//     .subscribe((data: any) => {
//     this.patient_breastfed = data.data
//     console.log(this.patient_breastfed, 'data ng breast fed');

//     // this.groupList2.push(this.patient_breastfed.bfed_month1);
//     // this.groupList2.push(this.patient_breastfed.bfed_month2);
//     // this.groupList2.push(this.patient_breastfed.bfed_month3);
//     // this.groupList2.push(this.patient_breastfed.bfed_month4);
//     // this.groupList2.push(this.patient_breastfed.bfed_month5);
//     // this.groupList2.push(this.patient_breastfed.bfed_month6);

//     lib.forEach((obj, index) => {
//       this.groupList2.push(this.patient_breastfed[obj]);
//       // this.groupList.push(String(this.patient_breastfed[obj]));
//       this.ccdev[index].selected = String(this.patient_breastfed[obj]);
//       console.log(this.ccdev[index].selected, " try ccdev");

//     })
//     console.log(this.groupList2, 'data ng breast fed v2')
//     this.getSelected()
//     console.log(this.groupList, 'grouplist data')
//     let reasoning = this.patient_breastfed.ebfreasons.desc;
//     console.log(reasoning, 'para sa reason')
//   });

// }

  checkGroupList(){
    if(new Set(this.groupList).size === 1){
      // console.log('trueeee')
    }else{
      // console.log('falseeee')
    }
  }

  loadBreastfed() {
    this.groupList2 = [];
    var lib = ['bfed_month1','bfed_month2','bfed_month3','bfed_month4','bfed_month5','bfed_month6'];
    this.http.get('child-care/cc-breastfed/'+this.patient_details.id)
    .subscribe({
      next: (data: any) => {
        this.patient_breastfed = data.data;

        // console.log(this.patient_breastfed, 'data ng breast fedzxc');

        if(this.patient_breastfed.ebfreasons != null){
          this.patient_breastfed.ebfreasons =  this.patient_breastfed.ebfreasons.reason_id;
        }


        lib.forEach((obj, index) => {
          this.groupList2.push(this.patient_breastfed[obj]);
          // this.groupList.push(String(this.patient_breastfed[obj]));
          this.ccdev[index].selected = String(this.patient_breastfed[obj]);
          // console.log(this.patient_breastfed[obj], "for each checker");

        })

        // console.log(this.groupList2, 'grouplist 2 data')
        this.getSelected()
        // console.log(this.groupList, 'grouplist data')

      },
      error: err => {console.log(err)
        if(err.status == 404) {
          this.patient_breastfed ={
            patient_ccdev_id: '',
            patient_id: '',
            user_id: '',
            bfed_month1: null,
            bfed_month2: null,
            bfed_month3: null,
            bfed_month4: null,
            bfed_month5: null,
            // bfed_month6: this.groupList[5] == 1 ? 1:0,
            bfed_month6: null,
            ebf_date: '',
            ebfreasons: null
          }
          // console.log(this.patient_breastfed, 'fake response')
          // console.log(this.groupList2, 'fake response group list 2')
          this.getSelected()
        }
      }
    });
  }


  ngOnInit(){
    this.ccdev = [
    {"id" : "bfed_month1", "name" : "Month 1", "date" : moment(this.patient_details.birthdate).add(1, 'M').format('MMM DD, YYYY'), selected: '', isDefault: 'N/A'},
    {"id" : "bfed_month2", "name" : "Month 2", "date" : moment(this.patient_details.birthdate).add(2, 'M').format('MMM DD, YYYY'), selected: '', isDefault: 'N/A'},
    {"id" : "bfed_month3", "name" : "Month 3", "date" : moment(this.patient_details.birthdate).add(3, 'M').format('MMM DD, YYYY'), selected: '', isDefault: 'N/A'},
    {"id" : "bfed_month4", "name" : "Month 4", "date" : moment(this.patient_details.birthdate).add(4, 'M').format('MMM DD, YYYY'), selected: '', isDefault: 'N/A'},
    {"id" : "bfed_month5", "name" : "Month 5", "date" : moment(this.patient_details.birthdate).add(5, 'M').format('MMM DD, YYYY'), selected: '', isDefault: 'N/A'},
    {"id" : "bfed_month6", "name" : "Month 6", "date" : moment(this.patient_details.birthdate).add(6, 'M').format('MMM DD, YYYY'), selected: '', isDefault: 'N/A'},
  ];

    // this.fetchSelectedItems()
    this.loadBreastfed()
    // this.geteServiceName()
    this.loadLibraries();
    this.checkGroupList();
    this.getccdevDetails()
  }

}
