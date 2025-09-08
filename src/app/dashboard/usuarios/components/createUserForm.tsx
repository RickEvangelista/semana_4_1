"use client";

import { InputMask } from "primereact/inputmask";
import Button from "@/components/Button";
import DropDown from "@/components/DropDown";
import Input from "@/components/Input";
import React from "react";
import { useActionState } from "react";
import { createUser } from "../action/createUser";

function FormCreateUser() {
  const initialState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(createUser, initialState);

  const perfis = [
    { label: "Administrador", value: "administrador" },
    { label: "Vendedor", value: "vendedor" },
    { label: "Validador", value: "validador" },
  ];

  return (
    <form
      action={dispatch}
      className="flex flex-col border-4 border-custom-blue p-5 rounded-md md:w-100 gap-5"
    >
      <h1 className="text-center text-custom-blue text-5xl">
        Cadastro de Usuário
      </h1>

      <Input
        label={"Nome completo:"}
        name={"nome_completo"}
        placeholder="Digite o seu nome completo"
      />

      <Input
        label={"E-mail:"}
        name={"email"}
        placeholder="Digite o seu email"
      />

      {/* InputMask para CPF como input não controlado */}
      <div className="flex flex-col">
        <label htmlFor="cpf" className="mb-1 font-semibold">
          CPF:
        </label>
        <InputMask
          id="cpf"
          name="cpf"
          mask="999.999.999-99"
          placeholder="Digite o CPF"
          className="p-2 rounded-md border-gray border-2"
        />
      </div>

      <Input
        type="password"
        label={"Senha:"}
        name={"senha"}
        placeholder="Digite a senha do usuário"
      />

      <DropDown
        placeholder={"Selecione um perfil"}
        name={"perfil"}
        label={"Perfil:"}
        options={perfis}
      />

      <Button
        children={"Criar"}
        className="bg-custom-blue"
        type="submit"
        disabled={isPending}
      />

      {state.message && (
        <div
          className={`w-full flex justify-center items-center mt-4 p-4 rounded-md ${
            state.success ? "text-custom-green" : "text-custom-orange"
          }`}
        >
          <p className="font-bold">{state.message}</p>
        </div>
      )}
    </form>
  );
}

export default FormCreateUser;
