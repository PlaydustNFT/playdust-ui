type VerifiableBuildType =
  | {
      label: string;
      id: number;
      verifiedSlot: number;
      url: string;
    }
  | {
      label: string;
      verifiedSlot: null;
    };

export default VerifiableBuildType;
