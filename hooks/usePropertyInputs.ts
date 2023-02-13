import { useEffect, useState } from "react";

export interface IPropertyInputs {
  listingPrice: number;
  postCode: string;
  disCountVsAskingPrice: number;
  desiredYield: number;
  convertedRentRate: number;
  durationInYears: number;
}

export const usePropertyInputs = () => {
  const [propertyInputs, setPropertyInputs] = useState<IPropertyInputs>();

  return [propertyInputs, setPropertyInputs] as const;
};
