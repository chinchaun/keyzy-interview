
export const PrimaryButton = (props: { displayText: string, onClick?: () => void, className?: string, isDisabled?: boolean }) => {
    const {
        displayText,
        onClick,
        className,
        isDisabled
    } = props;
    return (
        <button type="button"
            disabled={isDisabled}
            onClick={onClick}
            className={`
                ${className} 
                text-white
                bg-azure
                hover:bg-azure-800
                focus:ring-4
                focus:ring-azure-300
                font-medium
                rounded-lg
                text-sm
                px-5 py-2.5 mr-2 mb-2"`}>
                {displayText}
        </button>
    )
}
