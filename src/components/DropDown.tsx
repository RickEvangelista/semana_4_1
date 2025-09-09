import React, { SelectHTMLAttributes } from "react";

interface DropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string | number }[];
  placeholder: string;
}

function DropDown({
  label,
  placeholder,
  options,
  required = true,
  ...rest
}: DropDownProps) {
  return (
    <div className="flex flex-col text-custom-dark-gray">
      <label className="text-2xl text-custom-black" htmlFor={rest.name}>
        {label}
      </label>
      <select 
        className="mt-1 block w-full shadow-sm p-3 border-2 rounded-md"
        required={required}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
