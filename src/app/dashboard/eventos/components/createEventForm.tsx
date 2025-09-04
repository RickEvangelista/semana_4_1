"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useActionState } from "react";
import { createEvent } from "../action/createEvent";


function FormCreateEvent() {
  const initialState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(
    createEvent,
    initialState
  );

  return (
    <form
      action={dispatch}
      className="flex flex-col border-4 border-custom-blue p-5 rounded-md md:w-100 gap-5"
    >
      <h1 className="text-center text-custom-blue text-5xl">
        Cadastro de evento
      </h1>
      <Input
        label={"Titulo:"}
        name={"titulo"}
        placeholder="Digite o titulo do evento"
      />
      <Input
        label={"Localização:"}
        name={"localizacao"}
        placeholder="Digite a localizacao"
      />
      <Input
        type="number"
        label={"Capacidade:"}
        name={"capacidade_total"}
        placeholder="Digite a capacidade do evento"
      />
      <Input
        type="date"
        label={"Data de início: "}
        name={"dt_inicio"}
        placeholder="Digite a data de início do evento"
      />
      <Input
        type="date"
        label={"Data de termino:"}
        name={"dt_termino"}
        placeholder="Digite a data de termino do evento"
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

export default FormCreateEvent;
