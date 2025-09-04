//updateUserForm

'use client'

import Button from "@/components/Button";
import DropDown from "@/components/DropDown";
import Input from "@/components/Input";
import React, { useActionState } from "react";
import { usuario, perfil } from "@prisma/client";
import { updateUser } from "../action/updateTicket";
import { FormState } from "@/types/formState";

export interface user extends usuario {
  perfil: perfil;
}

function FormUpdateUser({ user }: { user: user}) {
  const perfis = [
    { label: "Administrador", value: "administrador" },
    { label: "Vendedor", value: "vendedor" },
    { label: "Validador", value: "validador" },
  ];

  const initialState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(async (previousState: FormState, formData: FormData) => updateUser(user.id_usuario, formData), initialState);

  return (
    <form
      action={dispatch}
      className="flex flex-col border-4 border-custom-blue p-5 rounded-md md:w-100 gap-5"
    >
      <h1 className="text-center text-custom-blue text-5xl">
        Atualização de Usuario
      </h1>
      <Input
        label={"Nome completo:"}
        name={"nome_completo"}
        placeholder="Digite o seu nome completo"
        defaultValue={user.nome_completo}
      />
      <Input
        label={"E-mail:"}
        name={"email"}
        placeholder="Digite o seu nome email"
        defaultValue={user.email}
      />
      <Input
        label={"CPF:"}
        name={"cpf"}
        placeholder="Digite o seu nome completo"
        defaultValue={user.cpf}
      />
      <Input
        label={"Senha(opcional): "}
        name={"senha"}
        placeholder="Digite a senha do usuário" required={false}
      />
      <DropDown
        placeholder={"Selecione um perfil "}
        name={"perfil"}
        label={"Perfil: "}
        options={perfis}
        defaultValue={user.perfil.titulo}
      />
      <Button className="bg-custom-blue" type="submit">
        Atualizar
      </Button>

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

export default FormUpdateUser;
