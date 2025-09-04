"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useActionState } from "react";
import DropDown from "@/components/DropDown";
import { updateSector } from "../actions/updateSector";
import { FormState } from "@/types/formState";
import { EventListItemSector } from "@/types/event";
import { setor } from "@prisma/client";


interface SectorFormProps {
  events: EventListItemSector[];
  sector: setor;
}

function FormUpdateSector({ events, sector }: SectorFormProps) {
  const initialState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(
      async (previousState: FormState, formData: FormData) =>
        updateSector(sector.id_setor, formData),
    initialState
  );

  return (
    <form
      action={dispatch}
      className="flex flex-col border-4 border-custom-blue p-5 rounded-md md:w-100 gap-5"
    >
      <h1 className="text-center text-custom-blue text-5xl">
        Cadastro de setor
      </h1>
      <Input
        label={"Titulo:"}
        name={"titulo"}
        placeholder="Digite o titulo do setor"
        defaultValue={sector.titulo}
      />
      <Input
        type="number"
        label={"Capacidade:"}
        name={"capacidade_total"}
        placeholder="Digite a capacidade do setor"
        defaultValue={sector.capacidade_total}
      />
      <DropDown
        placeholder={"Selecione o evento"}
        name={"evento_id_evento"}
        label={"Evento: "}
        options={events.map((evento) => ({
          label: evento.titulo,
          value: evento.id_evento,
        }))}
        defaultValue={sector.evento_id_evento}
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

export default FormUpdateSector;
