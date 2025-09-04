//createTicketForm

"use client";

import Button from "@/components/Button";
import DropDown from "@/components/DropDown";
import Input from "@/components/Input";
import React, { useActionState, useState } from "react";
import { EventListItem } from "@/types/event";
import { SectorListItem } from "@/types/sector";
import { createTicket } from "../action/createTicket";

interface TicketFormProps {
  events: EventListItem[];
  sectors: SectorListItem[];
}

function FormCreateTicket({ events, sectors }: TicketFormProps) {
  const initialState = { message: "", success: false };
  const [state, dispatch, isPending] = useActionState(
    createTicket,
    initialState
  );

  const [ selectedEvent, setSelectedEvent ] = useState<number | null>(null)

  const eventOptions = events.map((event) => (
    {label: event.titulo, value: event.id_evento}
  ))

  return (
    <form
      action={dispatch}
      className="flex flex-col border-4 border-custom-blue p-5 rounded-md md:w-100 gap-5"
    >
      <h1 className="text-center text-custom-blue text-5xl">
        Cadastro de Usuario
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
      <Input
        type="number"
        label={"CPF:"}
        name={"cpf"}
        placeholder="Digite o cpf"
      />
      <DropDown
        placeholder={"Selecione um evento "}
        name={"evento_id_evento"}
        label={"Evento: "}
        options={eventOptions}
        onChange={(e) =>setSelectedEvent(Number(e.target.value))}
      />
      <DropDown
        placeholder={"Selecione um setor "}
        name={"setor_id_setor"}
        label={"Setor: "}
        options={}
        disabled={!selectedEvent}
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

export default FormCreateTicket;
