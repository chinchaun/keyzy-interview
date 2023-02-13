import { useDebounce } from "@/hooks/useDebounce";
import { useGetPropertyData } from "@/hooks/useGetPropertyData";
import { IPropertyInputs } from "@/hooks/usePropertyInputs"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PrimaryButton } from "./PrimaryButton"

const UrlErrorDisplay = () => {
    return (
        <div className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div>
                The Url that you enter is not valid, please use from Right Move with this format: {rightMoveUrl}123#
            </div>
        </div>
    )
}

const rightMoveUrl = "https://www.rightmove.co.uk/properties/";

const isValidBaseUrl = (url: string) => {
    return url.substring(0, rightMoveUrl.length) === rightMoveUrl
}

const isValidParamsUrl = (params: string) => {
    const urlParam = params.substring(rightMoveUrl.length)
    if (urlParam.length < 2) {
        return false;
    }
    if (urlParam[urlParam.length - 1] !== '#') {
        return false;
    }
    return !isNaN(parseInt(urlParam.substring(0, urlParam.length - 1)));
}

export const InputsForm = (props: {
    propertyInputs: IPropertyInputs | undefined,
    setPropertyInputs: Dispatch<SetStateAction<IPropertyInputs | undefined>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
}) => {

    const { propertyInputs, setPropertyInputs, setIsLoading, isLoading } = props;
    const [formUrl, setFormUrl] = useState<string>("");
    const defaultYield = 4.5;
    const [formFields, setFormFields] = useState({
        disCountVsAskingPrice: 15,
        desiredYield: defaultYield,
        convertedRentRate: 20,
        durationInYears: 5
    })
    const [desiredYield, setDesiredYield] = useState(formFields.desiredYield);
    const [durationSelectedIndex, setDurationSelectedIndex] = useState(1);
    const propertyData = useGetPropertyData();
    const [showURLErrorMessage, setShowURLErrorMessage] = useState(false);

    const onDurationClick = (years: number, index: number) => {
        setDurationSelectedIndex(index);
        setFormFields({ ...formFields, durationInYears: years });
    }

    const debounceUrlValue = useDebounce(formUrl, 2000);

    useEffect(() => {
        if (isValidBaseUrl(debounceUrlValue) && isValidParamsUrl(debounceUrlValue)) {
            propertyData.doGet({ url: debounceUrlValue });
            setShowURLErrorMessage(false);
        } else {
            setPropertyInputs(undefined);
            if (debounceUrlValue) {
                setShowURLErrorMessage(true);
            } else {
                setShowURLErrorMessage(false);
            }
        }
    }, [debounceUrlValue]);

    const debounceYieldValue = useDebounce(desiredYield, 500);

    useEffect(() => {

        if (debounceYieldValue <= 9.0 && debounceYieldValue >= 4.5) {
            setFormFields({ ...formFields, desiredYield: debounceYieldValue });
        } else {
            setDesiredYield(defaultYield);
        }

    }, [debounceYieldValue]);

    useEffect(() => {
        if (!propertyInputs) {
            return;
        };

        setPropertyInputs({ ...propertyInputs, ...formFields });
    }, [formFields]);

    useEffect(() => {
        if (!propertyData.data) {
            return;
        }
        setPropertyInputs({
            listingPrice: propertyData.data.listingPrice,
            postCode: propertyData.data.postCode,
            ...formFields
        })
    }, [propertyData.data]);

    useEffect(() => {
        setIsLoading(propertyData.isLoading);
    }, [propertyData.isLoading])

    return (
        <div className="flex flex-col">
            <div>
                <h1 className={`w-full text-3xl font-bold mb-8`}>
                    Inputs
                </h1>
            </div>
            <div>
                <form>
                    <div className="flex flex-row"> 
                        <div className="basis-1/6 mb-8">
                            <label htmlFor="url"  />
                            <span className="text w-full"> URL </span>
                        </div>
                        <div  className="basis-3/4"> 
                            <input
                                value={formUrl}
                                onChange={(event) => setFormUrl(event.target.value)}
                                type="text"
                                className="form-input w-full text-white bg-azure"
                                id="url"
                                name="url"
                                required autoFocus
                                disabled={isLoading}
                            />
                            {showURLErrorMessage && <UrlErrorDisplay />}
                    </div>
                    </div>
                        <div className="flex flex-row">
                            <div className="basis-1/6 mb-8">
                                <label htmlFor="discount_vs_asking"/>
                                <span className="text w-full"> Discount vs. asking price </span>
                            </div>
                            <div className="basis-3/4">
                                <div className="text-center">{formFields.disCountVsAskingPrice} </div>
                                <div>
                                    0% <input
                                        className="accent-azure w-4/5"
                                        value={formFields.disCountVsAskingPrice}
                                        onChange={(event) => setFormFields({ ...formFields, disCountVsAskingPrice: parseInt(event.target.value) })}
                                        type="range"
                                        min={0}
                                        max={30}
                                        step={1}
                                        id="discount_vs_asking"
                                        name="discount_vs_asking"
                                        disabled={isLoading}
                                    />
                                    30%
                                </div>
                            </div>
                        </div>

                    <div className="flex flex-row gap-4">
                        <div className="basis-1/6 mb-8">
                            <label htmlFor="desired_yield"/>
                            <span className="text w-full">  Desired Yield </span>
                        </div>
                        <div className="basis-1/2">
                            <div className="flex">
                            <input
                                className="form-input w-md text-white bg-azure"
                                value={desiredYield}
                                onChange={(event) => setDesiredYield(parseFloat(event.target.value))}
                                id="desired_yield"
                                name="desired_yield"
                                type="number"
                                disabled={isLoading}
                                max={9.0}
                                min={4.5}
                                step={0.1}
                            />
                            <span className="inline-flex text-white items-center px-3 text-md bg-azure border-azure">
                                %
                            </span>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="basis-1/6 mb-8">
                        <label htmlFor="converted_rent_rate" />
                            <span className="text w-full"> Converted rent rate </span>
                        </div>
                        <div className="basis-3/4">
                        <div className="text-center">{formFields.convertedRentRate}</div>
                            <div>
                                10%
                                <input
                                    className="accent-azure w-4/5"
                                    value={formFields.convertedRentRate}
                                    onChange={(event) => setFormFields({ ...formFields, convertedRentRate: parseInt(event.target.value) })}
                                    id="converted_rent_rate"
                                    name="converted_rent_rate"
                                    type="range"
                                    min="10"
                                    max="25"
                                    step="5"
                                    disabled={isLoading}
                                />
                                25%
                            </div>
                        </div>
                    </div>

                    <label htmlFor="Duration" className="mb-8">
                        <span className="text w-full"> Duration </span>
                        <div className="inline-block mb-8">
                            <PrimaryButton
                                key={0}
                                displayText="3 Years"
                                onClick={() => onDurationClick(3, 0)}
                                className={durationSelectedIndex === 0 ? "ring-4 ring-blue-300" : ""}
                                isDisabled={isLoading}
                            />
                            <PrimaryButton
                                key={1}
                                displayText="5 Years"
                                onClick={() => onDurationClick(5, 1)}
                                className={durationSelectedIndex === 1 ? "ring-4 ring-blue-300" : ""}
                                isDisabled={isLoading}
                            />
                            <PrimaryButton
                                key={2}
                                displayText="7 Years"
                                onClick={() => onDurationClick(7, 2)}
                                className={durationSelectedIndex === 2 ? "ring-4 ring-blue-300" : ""}
                                isDisabled={isLoading}
                            />
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}