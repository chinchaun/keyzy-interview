import { useOutput } from "@/hooks/useOutput";
import { IPropertyInputs } from "@/hooks/usePropertyInputs";
import { useEffect } from "react";
import { LoadingButton } from "./LoadingButton";

export const PropertyCalculator = (props: {
    propertyInputs: IPropertyInputs | undefined,
    isLoading: boolean
}) => {
    const { propertyInputs, isLoading } = props;
    const [output, setOutput] = useOutput();
    useEffect(() => {
        setOutput(propertyInputs);
    }, []);

    useEffect(() => {
        setOutput(propertyInputs);
    }, [propertyInputs]);

    const GBP = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
    });

    return (
        <>
            <h1 className="w-full text-3xl font-bold mb-6">
                Data Retrieved
            </h1>
            <div>
                {isLoading && <LoadingButton />}
            </div>
            <div className="flex flex-row">
                <div className="basis-1/2 mb-6">
                    Listing Price
                </div>
                <div className="basis-1/2">
                    {propertyInputs ? (<> {GBP.format(propertyInputs.listingPrice)} </>) : (<> £ ___,____ </>)}
                </div>
            </div>
            <div className="flex flex-row">
                <div className="basis-1/2 mb-6">
                    Post Code
                </div>
                <div className="basis-1/2">
                    {propertyInputs ? (<> {propertyInputs.postCode} </>) : (<> ___ ____ </>)}
                </div>
            </div>
            <h1 className="w-full text-3xl font-bold mb-6">
                Outputs
            </h1>
            <div className="flex flex-row ">
                <div className="basis-1/2 mb-6">
                    Target Price
                </div>
                <div className="basis-1/2">
                    {output ? (<> {GBP.format(output.targetPrice)} </>) : (<> £ ___,____ </>)}
                </div>
            </div>
            <div className="flex flex-row">
                <div className="basis-1/2">
                    Total monthly rental
                </div>
                <div className="basis-1/2">
                    {output ? (<> {GBP.format(output.totalMonthlyRent)} </>) : (<> £ ___,____ </>)}
                </div>
            </div>
            <div className="flex flex-row">
                <div className="basis-1/2 text-center">
                    Rent
                </div>
                <div className="basis-1/2">
                    {output ? (<> {GBP.format(output.rent)} </>) : (<> £ ___,____ </>)}
                </div>
            </div>
            <div className="flex flex-row">
                <div className="basis-1/2 text-center mb-6">
                    Converted rent
                </div>
                <div className="basis-1/2">
                    {output ? (<> {GBP.format(output.convertedRent)} </>) : (<> £ ___,____ </>)}
                </div>
            </div>
            <div className="flex flex-row ">
                <div className="basis-1/2 mb-6">
                    Future buy-back price
                </div>
                <div className="basis-1/2">
                    {output ? (<> {GBP.format(output.futureBuyBackPrice)} </>) : (<> £ ___,____ </>)}
                </div>
            </div>
        </>
    )
}