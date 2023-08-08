import { FormControl, FormGroup } from "@angular/forms";

export function caserateForm() {
  return new FormGroup({
    id: new FormControl<string|null>(''),
    patient_id: new FormControl<string|null>(''),
    program_desc: new FormControl<string|null>(''),
    program_id: new FormControl<string|null>(''),
    caserate_date: new FormControl<string|null>(''),
    admit_dx: new FormControl<string|null>(''),
    caserate_code: new FormControl<string|null>(''),
    code: new FormControl<string|null>(''),
    description: new FormControl<string|null>(''),
    discharge_dx: new FormControl<string|null>(''),
    icd10_code: new FormControl<string|null>(''),
    hci_fee: new FormControl<number|null>(null),
    prof_fee: new FormControl<number|null>(null),
    caserate_fee: new FormControl<number|null>(null),
    caserate_attendant: new FormControl<string|null>(null),

    enough_benefit_flag: new FormControl<boolean|null>(false),
    hmo_flag: new FormControl<boolean|null>(false),
    others_flag: new FormControl<boolean|null>(false),

    hci_pTotalActualCharges: new FormControl<number|null>(null),
    hci_pDiscount: new FormControl<number|null>(null),
    hci_pPhilhealthBenefit: new FormControl<number|null>(null),
    hci_pTotalAmount: new FormControl<number|null>(null),

    prof_pTotalActualCharges: new FormControl<number|null>(null),
    prof_pDiscount: new FormControl<number|null>(null),
    prof_pPhilhealthBenefit: new FormControl<number|null>(null),
    prof_pTotalAmount: new FormControl<number|null>(null),

    meds_flag: new FormControl<boolean|null>(false),
    meds_pDMSTotalAmount: new FormControl<number|null>(null),
    meds_pExaminations_flag: new FormControl<boolean|null>(false),
    meds_pExamTotalAmount: new FormControl<number|null>(null),
  })
}
