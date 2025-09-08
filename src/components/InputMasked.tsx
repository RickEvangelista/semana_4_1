// components/InputMasked.jsx
import { IMaskInput } from "react-imask";

interface InputMaskedProps {
  label: string;
  placeholder?: string;
  name: string;
  mask: string;
  required?: boolean;
  defaultValue?: string;
}

function InputMasked({
  label,
  placeholder,
  name,
  mask,
  required = true,
  defaultValue,
}: InputMaskedProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-2xl text-custom-black" htmlFor={name}>
        {label}
      </label>
      <IMaskInput
        id={name}
        className="p-2 rounded-md border-gray border-2"
        mask={mask}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        unmask={true}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default InputMasked;