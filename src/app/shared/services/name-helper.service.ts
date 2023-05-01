import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameHelperService {
  getVisitType(group): string{
    switch(group){
      case 'cn':
        return 'Consultation';
      case 'cc':
        return 'Child Care';
      case 'mc':
        return 'Maternal Care';
      case 'dn':
        return 'Dental';
      case 'ncd':
        return 'Non Communicable Disease';
    }
  }

  getURL(lab_code): string{
    switch (lab_code) {
      case 'CBC':
        return 'laboratory/consult-laboratory-cbc'
      case 'CRTN':
        return 'laboratory/consult-laboratory-creatinine'
      case 'CXRAY':
        return 'laboratory/consult-laboratory-chestxray'
      case 'ECG':
        return 'laboratory/consult-laboratory-ecg'
      case 'FBS':
        return 'laboratory/consult-laboratory-fbs'
      case 'RBS':
        return 'laboratory/consult-laboratory-rbs'
      case 'HBA':
        return 'laboratory/consult-laboratory-hba1c'
      case 'PSMR':
        return 'laboratory/consult-laboratory-papsmear'
      case 'PPD':
        return 'laboratory/consult-laboratory-ppd'
      case 'SPTM':
        return 'laboratory/consult-laboratory-sputum'
      case 'FCAL':
        return 'laboratory/consult-laboratory-fecalysis'
      case 'LPFL':
        return 'laboratory/consult-laboratory-lipid-profile'
      case 'URN':
        return 'laboratory/consult-laboratory-urinalysis'
      case 'OGTT':
        return 'laboratory/consult-laboratory-oral-glucose'
      case 'FOBT':
        return 'laboratory/consult-laboratory-fecal-occult'
      case 'GRMS':
        return 'laboratory/consult-laboratory-gram-stain'
      case 'MCRP':
        return 'laboratory/consult-laboratory-microscopy'
      default:
        return '';
    }
  }
  constructor() { }
}
