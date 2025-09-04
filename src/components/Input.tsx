import React, { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  required?: boolean
  defaultValue?: any;
  label: string;
  placeholder?: string;
  name: string;
  errorMessage?: string;
  maxLength?: number;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  label,
  required = true,
  errorMessage,
  maxLength,
  onChange,
  value,
  type = "text",
  defaultValue,
  name,
  placeholder,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-2xl text-custom-black" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className="p-2 rounded-md border-gray border-2"
        type={type}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-custom-pink">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;
