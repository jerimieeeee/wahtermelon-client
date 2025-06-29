import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faDownload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from 'app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SummaryOfFee, SummaryOfFees } from './esoa-interface';

@Component({
  selector: 'app-esoa',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './esoa.component.html',
  styleUrl: './esoa.component.scss'
})
export class EsoaComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() consult_details;
  @Input() program_id;
  @Input() caserate_details;
  @Input() transmittal_number;
  @Input() eclaims_upload_id;
  program_name: string;

  faCircleNotch = faCircleNotch;
  faDownload = faDownload;

  generating_xml: boolean = false;
  show_form: boolean = false;
  consult_id: any;
  totalBalance: number;
  totalBalanceItems: number;
  totalAmount: number;
  totalDiscount: any = [];

  esoa_erros: any;
  downloadEsoa() {
    this.generating_xml = true;
    this.esoa_erros = undefined;
    let esoa = this.generateJSON();
    esoa.transmittal_number = this.transmittal_number;
    esoa.eclaims_upload_id = this.eclaims_upload_id;

    // console.log(esoa);
    this.http.post('eclaims/validate-esoa', esoa, { responseType: 'text' }).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.downloadXml(data);

      },
      error: err => {
        console.log(err.error);
        this.toastr.error(err.error.message, 'Error');
        this.generating_xml = false;
      }
    })
  }

  downloadXml(data) {
    const encxml = typeof data === 'string' ? data : new XMLSerializer().serializeToString(data);

    const blob = new Blob([encxml], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const date_now = new Date();
    const filename = `ESOA_${formatDate(date_now, 'yyyyMMdd_HHmm', 'en', 'Asia/Manila')}`;
    a.download = filename+'.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    this.toastr.success('eSoa successfully downloaded', 'ESOA');
    this.generating_xml = false;
  }

  item_list: any[] = [];
  generateJSON(): any {
    this.item_list = [];
    let esoa_json: any = {};
    let esoa_summary: any = {'SummaryOfFees' : {}};
    let esoa_items = {'ItemizedBillingItems' : []}
    let esoa_prof = {'ProfessionalFees': []};
    console.log(this.summary_list)
    Object.entries(this.summary_list).forEach(([key, value]: any) => {
      if(key !== 'ProfessionalFee'){
        esoa_summary['SummaryOfFees'][key] = {
          pChargesNetOfApplicableVat: Number(value['pChargesNetOfApplicableVat']).toFixed(2),
          pSeniorCitizenDiscount: Number(value['pSeniorCitizenDiscount']).toFixed(2),
          pPWDDiscount: Number(value['pPWDDiscount']).toFixed(2),
          pPCSO: Number(value['pPCSO']).toFixed(2),
          pDSWD: Number(value['pDSWD']).toFixed(2),
          pDOHMAP: Number(value['pDOHMAP']).toFixed(2),
          pHMO: Number(value['pHMO']).toFixed(2)
        }

        esoa_items['ItemizedBillingItems'] = this.getItemizedItemJSON(value, key);
      }
    });
    let summary_balance = Number(this.totalSummary) - Number(this.computedDiscount['Items']) - Number(this.caseRateAmount);
    let final_balance = summary_balance < 0 ? 0 : summary_balance;

    esoa_summary['SummaryOfFees']['PhilHealth'] = {pTotalCaseRateAmount: this.caseRateAmount};
    esoa_summary['SummaryOfFees']['Balance'] = {pAmount: final_balance.toFixed(2)};
    esoa_prof['ProfessionalFees'] = this.getProfJSON();
    esoa_json = {esoa_summary, esoa_items, esoa_prof};
    // console.log(esoa_json)
    return esoa_json;
  }

  getProfJSON(): any[] {
    let profDiscount = this.summary_list['ProfessionalFee'].pSeniorCitizenDiscount - this.summary_list['ProfessionalFee'].pPWDDiscount -
                        this.summary_list['ProfessionalFee'].pPCSO - this.summary_list['ProfessionalFee'].pDSWD -
                        this.summary_list['ProfessionalFee'].pDOHMAP - this.summary_list['ProfessionalFee'].pHMO;

    let prof_balance = Number(this.summary_list['ProfessionalFee'].pChargesNetOfApplicableVat - profDiscount - this.profFee);
    let final_balance = prof_balance < 0 ? 0 : prof_balance;

    let item = [
      { 'ProfessionalFee' : {
          'ProfessionalInfo' : {
            'pPAN': this.caseRateAttendant.accreditation_number,
            'pLastName': this.caseRateAttendant.last_name,
            'pFirstName': this.caseRateAttendant.first_name,
            'pMiddleName': this.caseRateAttendant.middle_name,
            'pSuffixName': '',
          },
          'SummaryOfFee' : {
            'pChargesNetOfApplicableVat': Number(this.summary_list['ProfessionalFee'].pChargesNetOfApplicableVat).toFixed(2),
            'pSeniorCitizenDiscount': Number(this.summary_list['ProfessionalFee'].pSeniorCitizenDiscount).toFixed(2),
            'pPWDDiscount': Number(this.summary_list['ProfessionalFee'].pPWDDiscount).toFixed(2),
            'pPCSO': Number(this.summary_list['ProfessionalFee'].pPCSO).toFixed(2),
            'pDSWD': Number(this.summary_list['ProfessionalFee'].pDSWD).toFixed(2),
            'pDOHMAP': Number(this.summary_list['ProfessionalFee'].pDOHMAP).toFixed(2),
            'pHMO': Number(this.summary_list['ProfessionalFee'].pHMO).toFixed(2),
          }
        },
        'PhilHealth': {
          'pTotalCaseRateAmount':this.profFee
        },
        'Balance': {
          'pAmount': final_balance
        }
      }
    ];
    return item;
  }

  getItemizedItemJSON(value, key): any[]{
    Object.entries(this[value.listVariable]).forEach(([k, v]: any) => {
      let itemized: any = key==='DrugsAndMedicine' ? this.listJsonMeds(v) : this.listJsonItem(v);

      this.item_list.push({'ItemizedBillingItem': itemized});
    });

    return this.item_list;
  }

  listJsonMeds(data): {}{
    let item: any = {};

    item = {
      pServiceDate: formatDate(this.consult_details.consult_date, 'MM-dd-yyyy', 'en', 'Asia/Manila'),
      pCategory: "DrugsAndMedicine",
      pUnitOfMeasurement: "",
      pUnitPrice: Number(data.unit_price).toFixed(2),
      pQuantity: String(data.quantity),
      pTotalAmount: Number(data.total_price).toFixed(2)
    }

    if(data.konsulta_medicine) {
      item['pItemCode'] = data.konsulta_medicine ? String(data.konsulta_medicine.code) : "";
      item['pItemName'] = data.konsulta_medicine ? data.konsulta_medicine.desc : data.added_medicine;
    } else {
      item['pItemCode'] = "";
      item['pItemName'] = data.medicine ? data.medicine.drug_name : data.added_medicine;
    }

    return item;
  }

  listJsonItem(data): {} {
    let item: any = {};

    item = {
      pServiceDate: formatDate(this.consult_details.consult_date, 'MM-dd-yyyy', 'en', 'Asia/Manila'),
      pItemCode: data.item_list.lib_item_claim ? String(data.item_list.lib_item_claim.id) : "",
      pCategory: data.item_list.lib_item_claim ? data.item_list.lib_item_claim.category : "Others",
      pItemName: data.item_list.lib_item_claim ? data.item_list.lib_item_claim.item_name : data.item_list.added_item,
      pUnitOfMeasurement: "",
      pUnitPrice: Number(data.unit_price).toFixed(2),
      pQuantity: String(data.quantity),
      pTotalAmount: Number(data.total_price).toFixed(2)
    }

    return item;
  }

  caseRateAmount: number = 0;
  profFee: number = 0;
  caseRateAttendant: any;
  supplies_list: any = [];
  prescription_list: any = [];
  operating_list: any = [];
  room_list: any = [];
  others_list: any = [];
  professional_list: any = [];
  laboratory_list: any = [];
  keepOriginalOrder = () => 0;

  getList(listName: string): any[] {
    return this[listName] || [];
  }

  summary_list = {
    'DrugsAndMedicine': { label: 'Drugs and Medicine', listVariable: 'prescription_list', pChargesNetOfApplicableVat: 0, pSeniorCitizenDiscount: 0, pPWDDiscount: 0, pPCSO: 0, pDSWD: 0, pDOHMAP: 0, pHMO: 0},
    'MedicalSupplies': { label: 'Medical Supplies', listVariable: 'supplies_list', pChargesNetOfApplicableVat: 0, pSeniorCitizenDiscount: 0, pPWDDiscount: 0, pPCSO: 0, pDSWD: 0, pDOHMAP: 0, pHMO: 0},
    'LaboratoryAndDiagnostic': { label: 'Laboratory and Diagnostics', listVariable: 'laboratory_list', pChargesNetOfApplicableVat: 0, pSeniorCitizenDiscount: 0, pPWDDiscount: 0, pPCSO: 0, pDSWD: 0, pDOHMAP: 0, pHMO: 0 },
    'OperatingRoomFees': { label: 'Operating Room', listVariable: 'operating_list', pChargesNetOfApplicableVat: 0, pSeniorCitizenDiscount: 0, pPWDDiscount: 0, pPCSO: 0, pDSWD: 0, pDOHMAP: 0, pHMO: 0},
    'RoomAndBoard': { label: 'Room and Board', listVariable: 'room_list', pChargesNetOfApplicableVat: 0, pSeniorCitizenDiscount: 0, pPWDDiscount: 0, pPCSO: 0, pDSWD: 0, pDOHMAP: 0, pHMO: 0},
    'ProfessionalFee': { label: 'Professional Fee', listVariable: 'professional_list', pChargesNetOfApplicableVat: 0, pSeniorCitizenDiscount: 0, pPWDDiscount: 0, pPCSO: 0, pDSWD: 0, pDOHMAP: 0, pHMO: 0},
    'Others': { label: 'Others', listVariable: 'others_list', pChargesNetOfApplicableVat: 0, pSeniorCitizenDiscount: 0, pPWDDiscount: 0, pPCSO: 0, pDSWD: 0, pDOHMAP: 0, pHMO: 0},
  };



  // totalDiscount: number = 0;
  computedDiscount: {}= {
    'Items': 0,
    'Prof': 0
  };
  computeBalance(key?:string, subkey?: string) {
    this.totalDiscount[key] = Number(this.summary_list[key].pSeniorCitizenDiscount) + Number(this.summary_list[key].pPWDDiscount) + Number(this.summary_list[key].pPCSO) + Number(this.summary_list[key].pDSWD) + Number(this.summary_list[key].pDOHMAP) + Number(this.summary_list[key].pHMO);

    this.computedDiscount['Items'] = 0;
    this.computedDiscount['Prof'] = 0;
    Object.entries(this.totalDiscount).forEach(([key, value]: any) => {
      if(key === 'ProfessionalFee') this.computedDiscount['Prof'] += value;
      if(key !== 'ProfessionalFee') this.computedDiscount['Items'] += value;
    });

    this.totalBalance = this.totalAmount - this.computedDiscount['Items'] - this.computedDiscount['Prof'] - this.caseRateAmount - this.profFee;
  }

  getConsultDetails() {
    this.show_form = false;
    let params = {
      id: this.consult_id
    };

    this.http.get('consultation/records', { params }).subscribe({
      next: (data: any) => {
        this.consult_details = data.data[0];
        this.getEsoaItems();
      },
      error: err => {
        this.toastr.error(err.error.message, 'ESOAs')
      }
    });
  }

  getEsoaItems() {
    const getCaseRate = this.http.get('eclaims/eclaims-caserate',  {
      params: {
        id: this.caserate_details.id
      }});
    const getPrescriptions = this.http.get('medicine/prescriptions',  {params: {consult_id: this.consult_id}});
    const getMedicalSupplies = this.http.get('consultation/item-supplies',  {params: {consult_id: this.consult_id, category: 'MedicalSupplies'}});
    const getOperatingRooms = this.http.get('consultation/item-supplies',  {params: {consult_id: this.consult_id, category: 'OperatingRoomFees'}});
    const getLab = this.http.get('consultation/item-supplies',  {params: {consult_id: this.consult_id, category: 'LaboratoryAndDiagnostic'}});
    const getRoomAndBoard = this.http.get('consultation/item-supplies',  {params: {consult_id: this.consult_id, category: 'RoomAndBoard'}});
    const getOthers = this.http.get('consultation/item-supplies',  {params: {consult_id: this.consult_id, category: 'Others'}});
    forkJoin([getCaseRate, getMedicalSupplies, getOperatingRooms, getRoomAndBoard, getPrescriptions, getOthers, getLab]).subscribe({
      next: ([dataCaseRate, dataMedicalSupplies, dataOperatingRooms, dataRoomAndBoard, dataPrescriptions, dataOthers, dataLab]: any) => {
        this.caseRateAttendant = dataCaseRate.data[0].attendant;
        this.profFee = dataCaseRate.data[0].prof_fee;
        this.caseRateAmount = dataCaseRate.data[0].hci_fee;
        this.supplies_list = dataMedicalSupplies.data;
        this.operating_list = dataOperatingRooms.data;
        this.room_list = dataRoomAndBoard.data;
        this.prescription_list = dataPrescriptions.data;
        this.others_list = dataOthers.data;
        this.professional_list = dataCaseRate.data[0];
        this.laboratory_list = dataLab.data;
        // console.log(this.professional_list)
        this.computeTotalSummary();
      },
      error: err => {
        this.toastr.error(err.error.message, 'ESOAs')
      }
    });
  }

  getSavedEsoa() {
    // Get ESOA Items if available
    let params = {
      eclaims_upload_id: this.eclaims_upload_id,
    }
    this.http.get('eclaims/eclaims-esoa', { params }).subscribe({
      next: (data: any) => {
        if(data.data.length > 0) {
          this.patchTotalSummary(data.data);// : this.computeTotalSummary();
        } else {
          console.log(2);
          this.show_form = true;
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  patchTotalSummary(data){
    // console.log(data);
    this.totalSummary = 0;
    console.log(this.summary_list);
    Object.entries(data).forEach(([key, value]: any) => {
      console.log(value);
      this.summary_list[value.category].pDOHMAP = value.pDOHMAP;
      this.summary_list[value.category].pDSWD = value.pDSWD;
      this.summary_list[value.category].pHMO = value.pHMO;
      this.summary_list[value.category].pPCSO = value.pPCSO;
      this.summary_list[value.category].pPWDDiscount = value.pPWDDiscount;
      this.summary_list[value.category].pSeniorCitizenDiscount = value.pSeniorCitizenDiscount;

      this.computeBalance(value.category);
    });
    this.disable_button = false;
    this.show_form = true;
  }

  totalSummary: number = 0;
  disable_button: boolean = true;
  computeTotalSummary() {
    this.totalBalance = 0;
    this.totalAmount = 0;
    this.totalSummary = 0;
    Object.entries(this.summary_list).forEach(([key, value]: any) => {
      value.pChargesNetOfApplicableVat = 0;
      this.totalDiscount[key] = 0;

      if(value.listVariable === 'professional_list') {
        // console.log(this.professional_list);
        value.pChargesNetOfApplicableVat = this.professional_list.prof_pTotalAmount ? Number(this.professional_list.prof_pTotalAmount) : Number(this.professional_list.prof_fee)
      } else {
        this[value.listVariable].forEach((item: any) => {
          value.pChargesNetOfApplicableVat += item.quantity*item.unit_price || 0;
        });
        this.totalSummary += value.pChargesNetOfApplicableVat;
      }
      this.totalAmount += value.pChargesNetOfApplicableVat;
    });

    this.totalBalance = this.totalAmount - this.profFee - this.caseRateAmount;
    this.getSavedEsoa();
    this.disable_button = false;
    // console.log(this.summary_list);
  }

  closeModal() {
    this.toggleModal.emit('esoa');
  }

  constructor(
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.consult_details)
    this.consult_id = this.http.getUrlParams().consult_id;
    this.program_name = this.http.getUrlParams().loc;
    this.getConsultDetails();
    // console.log(this.http.getUrlParams())
  }
}
