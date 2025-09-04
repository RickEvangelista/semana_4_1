import React from "react";

interface DropDownProps {
    placeholder: string;
    name: string;
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    defaultValue?: string | number;
    disabled?: boolean;
    required?: boolean;
    options: { label: string; value: string | number }[];
}

function DropDown({
    placeholder,
    name,
    onChange,
    disabled,
    label,
    options,
    defaultValue,
    required = true,
}: DropDownProps) {
    return (
        <div className="flex flex-col text-custom-dark-gray">
            <label className="text-2xl text-custom-black" htmlFor={name}>
                {label}
            </label>
            <select
                id={name}
                name={name}
                className="mt-1 block w-full shadow-sm p-3 border-2 rounded-md"
                required={required}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropDown;
