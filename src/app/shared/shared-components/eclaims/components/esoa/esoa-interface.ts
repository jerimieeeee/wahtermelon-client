export interface SummaryOfFee {
  pChargesNetOfApplicableVat: number;
  pSeniorCitizenDiscount: number;
  pPWDDiscount: number;
  pPCSO: number;
  pDSWD: number;
  pDOHMAP: number;
  pHMO: number;
}

export interface SummaryOfFees {
  RoomAndBoard: {
    SummaryOfFee: SummaryOfFee;
  };
  DrugsAndMedicine: {
    SummaryOfFee: SummaryOfFee;
  };
  LaboratoryAndDiagnostic: {
    SummaryOfFee: SummaryOfFee;
  };
  OperatingRoomFees: {
    SummaryOfFee: SummaryOfFee;
  };
  MedicalSupplies: {
    SummaryOfFee: SummaryOfFee;
  };
  Others: {
    SummaryOfFee: SummaryOfFee;
  };
}
