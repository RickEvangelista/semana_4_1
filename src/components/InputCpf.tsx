"use client";

import React, { InputHTMLAttributes } from "react";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";

interface InputCPFProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  errorMessage?: string;
  onChange?: (e: InputMaskChangeEvent) => void;
}

export default function InputCPF({ label, errorMessage, onChange, ...rest }: InputCPFProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={rest.name} className="md:text-2xl text-custom-black">
        {label}
      </label>
      <InputMask
        id={rest.name}
        mask="999.999.999-99"
        placeholder="Digite o CPF"
        className="md:p-2 rounded-md border-gray border-2"
        {...rest}
        onChange={onChange} // compatível com InputMaskChangeEvent
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-custom-pink">{errorMessage}</p>
      )}
    </div>
  );
}
