function InputCpf({ label, name }: { label: string; name: string }) {
  const [value, setValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // remove tudo que não é número
    let v = e.target.value.replace(/\D/g, "");
    // aplica máscara de CPF: 123.456.789-00
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setValue(v);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        maxLength={14} // 11 dígitos + 3 pontos + 1 traço
        placeholder="000.000.000-00"
      />
    </div>
  );
}
