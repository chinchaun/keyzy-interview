import { useEffect, useState } from "react";
import { IPropertyInputs } from "./usePropertyInputs";

export interface IOutput {
    targetPrice: number;
    totalMonthlyRent: number;
    rent: number;
    convertedRent: number;
    futureBuyBackPrice: number;
}

export const useOutput = () => {
    const [output, setOutput] = useState<IOutput>();
    const [propertyInput, setPropertyInput] = useState<IPropertyInputs>();

    useEffect(() => {
        if (!propertyInput) {
            return setOutput(undefined);
        }
        const targetPrice = propertyInput.listingPrice * (1 - (propertyInput.disCountVsAskingPrice / 100));
        const rent = targetPrice / 12 * (propertyInput.desiredYield / 100);
        const convertedRent = targetPrice / (12 * propertyInput.desiredYield * propertyInput.convertedRentRate);
        const totalMonthlyRent = rent + convertedRent;
        const futureBuyBackPrice = targetPrice - (convertedRent * propertyInput.durationInYears * 12);

        setOutput({
            targetPrice,
            rent,
            convertedRent,
            totalMonthlyRent,
            futureBuyBackPrice
        })

    }, [propertyInput]);

    return [output, setPropertyInput] as const;
}