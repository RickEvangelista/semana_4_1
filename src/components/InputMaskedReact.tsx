"use client";

import React, { useState } from "react";
import InputMask from "react-input-mask";

interface InputCPFProps {
  label: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function InputCPF({
  label,
  name,
  placeholder = "",
  errorMessage,
  disabled = false,
  required = true,
}: InputCPFProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="md:text-2xl text-custom-black">
        {label}
      </label>

      <InputMask
        mask="999.999.999-99"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      >
        {(inputProps: any) => (
          <input
            {...inputProps}
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            required={required}
            className="md:p-2 rounded-md border-gray border-2"
          />
        )}
      </InputMask>

      {errorMessage && <p className="mt-1 text-sm text-custom-pink">{errorMessage}</p>}
    </div>
  );
}
